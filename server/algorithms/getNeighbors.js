const { getDuration } = require("./getDuration");
const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const { getCredit } = require("./getCredit");
const { calculateEndTime } = require("./calculateEndTime");

module.exports.getNeighbors = (
  candidateTimetable,
  modules,
  groups,
  halls,
  days,
  times,
  lecturers
) => {
  const MAX_ITERATIONS = 25; // maximum number of iterations
  let neighbors = [];
  let type = getRandomItem([1, 2, 3, 4, 5]);
  let i = 0;

  while (i < MAX_ITERATIONS) {
    let newTimetable = JSON.parse(JSON.stringify(candidateTimetable));

    // Swap time and day
    // randomly select two classes from the timetable
    const randomIndex1 = Math.floor(Math.random() * newTimetable.length);
    const randomIndex2 = Math.floor(Math.random() * newTimetable.length);

    // get the modules to swap them form the original timetable
    const module1copies = newTimetable.filter(
      (m) =>
        m.Module_ID === newTimetable[randomIndex1].Module_ID &&
        newTimetable[randomIndex1].Day_ID === m.Day_ID
    );
    const module2copies = newTimetable.filter(
      (m) =>
        m.Module_ID === newTimetable[randomIndex2].Module_ID &&
        newTimetable[randomIndex2].Day_ID === m.Day_ID
    );

    // get the index of the module you want to swap to be able to return them back
    const module1Index = module1copies.map((module) =>
      newTimetable.indexOf(module)
    );
    const module2Index = module2copies.map((module) =>
      newTimetable.indexOf(module)
    );
    // loop through all module to swap them
    for (let i = 0; i < module1copies.length; i++) {
      const module1Duration = getDuration(module1copies[i]);
      const module2Duration = getDuration(module2copies[i]);
      if (module1copies[i] && module2copies[i]) {
        if (
          module1copies[i].Subject_Type_ID ===
            module2copies[i].Subject_Type_ID &&
          module1Duration === module2Duration
        ) {
          // swap
          const tempDay = module1copies[i].Day_ID;
          module1copies[i].Day_ID = module2copies[i].Day_ID;
          module2copies[i].Day_ID = tempDay;

          const tempStartTime = module1copies[i].Start_Time;
          module1copies[i].Start_Time = module2copies[i].Start_Time;
          module2copies[i].Start_Time = tempStartTime;

          const tempEndTime = module1copies[i].End_Time;
          module1copies[i].End_Time = module2copies[i].End_Time;
          module2copies[i].End_Time = tempEndTime;

          // return the new module back to the timetable
          newTimetable[module1Index[i]] = module1copies[i];
          newTimetable[module2Index[i]] = module2copies[i];
        }
      } else {
        // assign new time
        const moduleData = modules.filter(
          (m) => m.Module_ID === newTimetable[randomIndex1].Module_ID
        )[0];
        const time = getRandomItem(times);

        newTimetable[randomIndex1].Start_Time = time.Start_Time;
        newTimetable[randomIndex1].End_Time = calculateEndTime(
          newTimetable[randomIndex1].Start_Time,
          getCredit(moduleData)
        );
      }
    }

    neighbors.push(newTimetable);

    i++;
  }

  return neighbors;
};
