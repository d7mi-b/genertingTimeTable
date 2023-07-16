const db = require("../DB");
const { initialTimetable } = require("./initialTimetable");
const { getNeighbors } = require("./getNeighbors");
const { feasible } = require("./feasible");
const { fitness } = require("./fitness");
const { getDuration } = require("./getDuration");

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

    const [ weights ] = await db.query(`
      select * from 
      (select Weight as lecturerAvailabilty from fitnes_weight where Weight_Name = 'lecturerAvailabilty') as lecturerAvailabilty join
      (select Weight as timeGap from fitnes_weight where Weight_Name = 'timeGap') as timeGap join
      (select Weight as labsOnSameDay from fitnes_weight where Weight_Name = 'labsOnSameDay') as labsOnSameDay join 
      (select Weight as dayOFF from fitnes_weight where Weight_Name = 'dayOFF') as dayOFF join 
      (select Weight as lecturesOnDay from fitnes_weight where Weight_Name = 'lecturesOnDay') as lecturesOnDay join 
      (select Weight as groupsTimes from fitnes_weight where Weight_Name = 'groupsTimes') as groupsTimes
    `);

    const [ stateWeights ] = await db.query(`
      select Default_Weights from system_state
    `)

    // Initialize variables
    let bestTimetable = [];
    let candidateTimetable = initialTimetable(modules, groups, halls, days, times, lecturers);
    let tabuList = [];

    // Print some initial information for debugging
    console.log(
      "the number of confilcts in initial timetable: ",
      feasible(candidateTimetable, lecturers)
    );
    console.log(
      "the fitness of initial timetable: ",
      fitness(candidateTimetable, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights)
    );

    // Start the search loop
    let i = 0;

    while (i < 500) {
      
      // Generate the neighborhood of the current candidate timetable
      const neighborhood = getNeighbors(candidateTimetable, modules, groups, halls, days, times, lecturers);

      let bestCandidate = null;

      // Evaluate each candidate in the neighborhood
      neighborhood.forEach((candidate) => {
        // Check if the move is in the tabu list
        const move = [candidateTimetable, candidate];
        if (
          !tabuList.some(([t1, t2]) => t1 === move[1] && t2 === move[0]) &&
          // If the move is not in the tabu list and the resulting timetable is better than the current candidate timetable,
          fitness(candidate, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights) >
          fitness(candidateTimetable, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights) &&
          feasible(candidate, lecturers) < feasible(candidateTimetable, lecturers)
        ) {
          // Update the best candidate found so far
          if (
            !bestCandidate ||
            fitness(candidate, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights) >
            fitness(bestCandidate, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights) &&
            feasible(candidate, lecturers) < feasible(bestCandidate, lecturers)
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
        fitness(candidateTimetable, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights) >
        fitness(bestTimetable, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights) &&
        feasible(candidateTimetable, lecturers) < feasible(bestTimetable, lecturers)
      )
        bestTimetable = candidateTimetable;
      i++;
    }
    bestTimetable = candidateTimetable;

    // Print information about the best timetable found
    console.log("done from main function");
    console.log(
      "the number of confilcts in best timetable: ",
      feasible(bestTimetable, lecturers, modules)
    );
    console.log(
      "the fitness of best timetable: ",
      fitness(bestTimetable, modules, lecturers, groups, days, weights[0], stateWeights[0].Default_Weights)
    );

    // Return the best timetable found
    return res.status(200).json(bestTimetable);
  } 
  catch (err) {
    res.status(400).json({ err: err.message });
  }

}


const timetableForTest = [
  {
    "Module_ID": 1,
    "Lecturer_ID": 17,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 2,
    "Lecturer_ID": 19,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 5,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 3,
    "Lecturer_ID": 35,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 4,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 4,
    "Lecturer_ID": 23,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 5,
    "Lecturer_ID": 20,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 6,
    "Lecturer_ID": 18,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 3,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 7,
    "Lecturer_ID": 21,
    "Group_ID": 1,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "11:00:00"
  },
  {
    "Module_ID": 8,
    "Lecturer_ID": 17,
    "Group_ID": 1,
    "Subject_Type_ID": 3,
    "Hall_ID": 5,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 9,
    "Lecturer_ID": 22,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 4,
    "Day_ID": 2,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 9,
    "Lecturer_ID": 22,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 4,
    "Day_ID": 2,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 9,
    "Lecturer_ID": 22,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 4,
    "Day_ID": 2,
    "Start_Time": "16:00:00",
    "End_Time": "18:00:00"
  },
  {
    "Module_ID": 10,
    "Lecturer_ID": 37,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 16,
    "Day_ID": 1,
    "Start_Time": "11:00:00",
    "End_Time": "13:00:00"
  },
  {
    "Module_ID": 10,
    "Lecturer_ID": 37,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 16,
    "Day_ID": 1,
    "Start_Time": "13:00:00",
    "End_Time": "15:00:00"
  },
  {
    "Module_ID": 10,
    "Lecturer_ID": 37,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 16,
    "Day_ID": 1,
    "Start_Time": "15:00:00",
    "End_Time": "17:00:00"
  },
  {
    "Module_ID": 11,
    "Lecturer_ID": 21,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 7,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 11,
    "Lecturer_ID": 21,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 7,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 11,
    "Lecturer_ID": 21,
    "Group_ID": 1,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 5,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 12,
    "Lecturer_ID": 3,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 4,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 13,
    "Lecturer_ID": 1,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 5,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "11:00:00"
  },
  {
    "Module_ID": 14,
    "Lecturer_ID": 26,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 15,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 14,
    "Lecturer_ID": 26,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 15,
    "Day_ID": 4,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 14,
    "Lecturer_ID": 26,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 15,
    "Day_ID": 4,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 15,
    "Lecturer_ID": 25,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 15,
    "Lecturer_ID": 25,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 4,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 15,
    "Lecturer_ID": 25,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 4,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 16,
    "Lecturer_ID": 34,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 7,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 16,
    "Lecturer_ID": 34,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 7,
    "Day_ID": 4,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 16,
    "Lecturer_ID": 34,
    "Group_ID": 2,
    "Subject_Type_ID": 2,
    "Hall_ID": 7,
    "Day_ID": 4,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 17,
    "Lecturer_ID": 24,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 18,
    "Lecturer_ID": 24,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 19,
    "Lecturer_ID": 17,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 1,
    "Start_Time": "11:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 20,
    "Lecturer_ID": 16,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 1,
    "Start_Time": "14:00:00",
    "End_Time": "17:00:00"
  },
  {
    "Module_ID": 21,
    "Lecturer_ID": 20,
    "Group_ID": 2,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 22,
    "Lecturer_ID": 8,
    "Group_ID": 3,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 23,
    "Lecturer_ID": 26,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 15,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 23,
    "Lecturer_ID": 26,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 15,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 23,
    "Lecturer_ID": 26,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 15,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 24,
    "Lecturer_ID": 5,
    "Group_ID": 3,
    "Subject_Type_ID": 1,
    "Hall_ID": 3,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 25,
    "Lecturer_ID": 2,
    "Group_ID": 3,
    "Subject_Type_ID": 1,
    "Hall_ID": 5,
    "Day_ID": 4,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 26,
    "Lecturer_ID": 1,
    "Group_ID": 3,
    "Subject_Type_ID": 1,
    "Hall_ID": 5,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 27,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 8,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 27,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 8,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 27,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 8,
    "Day_ID": 2,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 28,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 14,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 28,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 14,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 28,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 14,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 29,
    "Lecturer_ID": 7,
    "Group_ID": 3,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 1,
    "Start_Time": "14:00:00",
    "End_Time": "17:00:00"
  },
  {
    "Module_ID": 30,
    "Lecturer_ID": 36,
    "Group_ID": 3,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 3,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 31,
    "Lecturer_ID": 29,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 31,
    "Lecturer_ID": 29,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 31,
    "Lecturer_ID": 29,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 2,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 32,
    "Lecturer_ID": 31,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 17,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 32,
    "Lecturer_ID": 31,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 17,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 32,
    "Lecturer_ID": 31,
    "Group_ID": 3,
    "Subject_Type_ID": 2,
    "Hall_ID": 17,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 33,
    "Lecturer_ID": 36,
    "Group_ID": 3,
    "Subject_Type_ID": 3,
    "Hall_ID": 9,
    "Day_ID": 5,
    "Start_Time": "15:00:00",
    "End_Time": "NaN:00:00"
  },
  {
    "Module_ID": 34,
    "Lecturer_ID": 5,
    "Group_ID": 4,
    "Subject_Type_ID": 1,
    "Hall_ID": 3,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 35,
    "Lecturer_ID": 2,
    "Group_ID": 4,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 36,
    "Lecturer_ID": 2,
    "Group_ID": 4,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 37,
    "Lecturer_ID": 32,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 2,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 37,
    "Lecturer_ID": 32,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 2,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 37,
    "Lecturer_ID": 32,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 2,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 38,
    "Lecturer_ID": 29,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 38,
    "Lecturer_ID": 29,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 38,
    "Lecturer_ID": 29,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 39,
    "Lecturer_ID": 34,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 39,
    "Lecturer_ID": 34,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 3,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 39,
    "Lecturer_ID": 34,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 3,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 40,
    "Lecturer_ID": 1,
    "Group_ID": 4,
    "Subject_Type_ID": 1,
    "Hall_ID": 9,
    "Day_ID": 4,
    "Start_Time": "12:00:00",
    "End_Time": "15:00:00"
  },
  {
    "Module_ID": 41,
    "Lecturer_ID": 25,
    "Group_ID": 4,
    "Subject_Type_ID": 1,
    "Hall_ID": 10,
    "Day_ID": 2,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 42,
    "Lecturer_ID": 25,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 42,
    "Lecturer_ID": 25,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 42,
    "Lecturer_ID": 25,
    "Group_ID": 4,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 5,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 43,
    "Lecturer_ID": 4,
    "Group_ID": 4,
    "Subject_Type_ID": 1,
    "Hall_ID": 3,
    "Day_ID": 1,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 44,
    "Lecturer_ID": 1,
    "Group_ID": 5,
    "Subject_Type_ID": 1,
    "Hall_ID": 6,
    "Day_ID": 3,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 45,
    "Lecturer_ID": 4,
    "Group_ID": 5,
    "Subject_Type_ID": 1,
    "Hall_ID": 3,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 46,
    "Lecturer_ID": 16,
    "Group_ID": 5,
    "Subject_Type_ID": 1,
    "Hall_ID": 9,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 47,
    "Lecturer_ID": 21,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 47,
    "Lecturer_ID": 21,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 4,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 47,
    "Lecturer_ID": 21,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 4,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 48,
    "Lecturer_ID": 32,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
  },
  {
    "Module_ID": 48,
    "Lecturer_ID": 32,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 1,
    "Day_ID": 1,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 48,
    "Lecturer_ID": 32,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 7,
    "Day_ID": 1,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  },
  {
    "Module_ID": 49,
    "Lecturer_ID": 21,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
  },
  {
    "Module_ID": 49,
    "Lecturer_ID": 21,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 1,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
  },
  {
    "Module_ID": 49,
    "Lecturer_ID": 21,
    "Group_ID": 5,
    "Subject_Type_ID": 2,
    "Hall_ID": 11,
    "Day_ID": 1,
    "Start_Time": "14:00:00",
    "End_Time": "16:00:00"
  }
]