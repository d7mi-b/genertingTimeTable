const { getDuration } = require("./getDuration");
const { feasible } = require("./feasible");

module.exports.getNeighbors = (candidateTimetable, lecturers) => {
  const MAX_ITERATIONS = 100; // maximum number of iterations
  let neighbors = [];
  let i = 0;
  while (i < MAX_ITERATIONS) {
    let newTimetable = JSON.parse(JSON.stringify(candidateTimetable));

    // randomly select two classes from the timetable
    const moduleIndex1 = Math.floor(Math.random() * newTimetable.length);
    const moduleIndex2 = Math.floor(Math.random() * newTimetable.length);
    const module1Duration = getDuration(newTimetable[moduleIndex1]);
    const module2Duration = getDuration(newTimetable[moduleIndex2]);
    if (
      newTimetable[moduleIndex1].Subject_Type_ID ===
        newTimetable[moduleIndex2].Subject_Type_ID &&
      module1Duration === module2Duration
    ) {
      // swap their day and time
      const tempDay = newTimetable[moduleIndex1].Day_ID;
      newTimetable[moduleIndex1].Day_ID = newTimetable[moduleIndex2].Day_ID;
      newTimetable[moduleIndex2].Day_ID = tempDay;

      const tempStartTime = newTimetable[moduleIndex1].Start_Time;
      newTimetable[moduleIndex1].Start_Time =
        newTimetable[moduleIndex2].Start_Time;
      newTimetable[moduleIndex2].Start_Time = tempStartTime;

      const tempEndTime = newTimetable[moduleIndex1].End_Time;
      newTimetable[moduleIndex1].End_Time = newTimetable[moduleIndex2].End_Time;
      newTimetable[moduleIndex2].End_Time = tempEndTime;

      // check if the new timetable is feasible
      if (feasible(newTimetable, lecturers)) {
        neighbors.push(newTimetable);
      }
      i++;
    }
  }

  return neighbors;
};
