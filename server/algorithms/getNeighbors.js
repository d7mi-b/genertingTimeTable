const { getRandomItem } = require("./getRandomItem");
const { feasible } = require("./feasible");
const isOverLapping = require("./isOverLapping");
module.exports.getNeighbors = (candidateTimetable) => {
  const MAX_ITERATIONS = 10; // maximum number of iterations
  let neighbors = [];

  for (let i = 0; i < MAX_ITERATIONS; i++) {
    let newTimetable = JSON.parse(JSON.stringify(candidateTimetable));

    // randomly select two classes from the timetable
    const classIndex1 = Math.floor(Math.random() * newTimetable.length);
    const classIndex2 = Math.floor(Math.random() * newTimetable.length);

    // swap their day and time
    const tempDay = newTimetable[classIndex1].Day_ID;
    newTimetable[classIndex1].Day_ID = newTimetable[classIndex2].Day_ID;
    newTimetable[classIndex2].Day_ID = tempDay;

    const tempStartTime = newTimetable[classIndex1].Start_Time;
    newTimetable[classIndex1].Start_Time = newTimetable[classIndex2].Start_Time;
    newTimetable[classIndex2].Start_Time = tempStartTime;

    const tempEndTime = newTimetable[classIndex1].End_Time;
    newTimetable[classIndex1].End_Time = newTimetable[classIndex2].End_Time;
    newTimetable[classIndex2].End_Time = tempEndTime;

    // check if the new timetable is feasible
    if (feasible(newTimetable)) {
      neighbors.push(newTimetable);
    }
  }

  return neighbors;
};
