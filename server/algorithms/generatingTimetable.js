const db = require("../DB");
const { initialTimetable } = require("./initialTimeTable");
const { getNeighbors } = require("./getNeighbors");
const { feasible } = require("./feasible");
const { fitness } = require("./fitness");

module.exports.generatingTimetable = async (req, res) => {
  try {
    // Fetch data from the database
    const [modules] = await db.query(`
        select Module_ID, module.Semester_ID, module.Subject_ID, Lecturer_ID, 
        module.Department_ID, Hall_Type_ID, Subject_Type_ID, Credit_Theoretical, Credit_Practical, Credit_Tutorial 
        from module join subjects on subjects.Subject_ID = module.Subject_ID;
    `);

    const [lecturers] = await db.query(`
        select Lecturer_ID, Not_Available, NO_Available_Days, Sunday, Monday, Tuesday, Wednesday, Thursday from lecturer
    `);

    const [groups] = await db.query(`
        select Group_ID, Group_Count, Batch_Type_ID, batches.Semester_ID, batches.Department_ID from batch_groups 
        join batches on batch_groups.Batch_ID = batches.Batch_ID;
    `);

    const [halls] = await db.query(`
        select Hall_ID, Hall_Type_ID, Hall_Capacity from halls
    `);

    const [days] = await db.query(`
        select * from day
    `);

    const [times] = await db.query(`
        select * from time
    `);

    // Initialize variables
    let bestTimetable = 0;
    let candidateTimetable = await initialTimetable(modules, groups, halls, days, times, lecturers);
    let tabuList = [];

    // Print some initial information for debugging
    console.log(
      "timetable from initial timetable without hard constraints: ",
      feasible(candidateTimetable, lecturers)
    );
    console.log(
      "the fitness of initial timetable: ",
      fitness(candidateTimetable, modules, lecturers, groups, days)
    );

    // Start the search loop
    let i = 0;

    while (i < 100) {
      // Generate the neighborhood of the current candidate timetable
      const neighborhood = getNeighbors(candidateTimetable, lecturers);

      let bestCandidate = null;

      // Evaluate each candidate in the neighborhood
      neighborhood.forEach((candidate) => {
        // Check if the move is in the tabu list
        const move = [candidateTimetable, candidate];
        if (
          !tabuList.some(([t1, t2]) => t1 === move[1] && t2 === move[0]) &&
          // If the move is not in the tabu list and the resulting timetable is better than the current candidate timetable,
          fitness(candidate, modules, lecturers, groups, days) >
            fitness(candidateTimetable, modules, lecturers, groups, days)
        ) {
          // Update the best candidate found so far
          if (
            !bestCandidate ||
            fitness(candidate, modules, lecturers, groups, days) >
              fitness(bestCandidate, modules, lecturers, groups, days)
          ) {
            bestCandidate = candidate;
          }
        }
      });

      // Update the candidate timetable and the tabu list
      if (bestCandidate) {
        candidateTimetable = bestCandidate;
        tabuList.push([
          candidateTimetable,
          neighborhood.find((t) => t === bestCandidate),
        ]);
      } else {
        tabuList.push([candidateTimetable, candidateTimetable]);
      }

      // Keep the tabu list within a certain length limit
      if (tabuList.length > 50) tabuList.shift();

      // Update the best timetable found so far
      if (
        fitness(candidateTimetable, modules, lecturers, groups, days) >
        fitness(bestTimetable, modules, lecturers, groups, days)
      )
        bestTimetable = candidateTimetable;

      i++;
    }
    bestTimetable = candidateTimetable;

    // Print information about the best timetable found
    console.log("done from main function");
    console.log(
      "the best timetable without hard constraints: ",
      feasible(bestTimetable, lecturers)
    );
    console.log(
      "the fitness of best timetable: ",
      fitness(bestTimetable, modules, lecturers, groups, days)
    );

    // Return the best timetable found
    return res.status(200).json(bestTimetable);
  } 
  catch (err) {
    res.status(400).json({ err: err.message });
  }

}
