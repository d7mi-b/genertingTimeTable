const { getDuration } = require("./getDuration");
const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const { getCredit } = require("./getCredit");
const { calculateEndTime } = require("./calculateEndTime");
const { getEndTime } = require("./getEndTime");
const { getDay } = require("./getDay");
const { getHall } = require("./getHall");

module.exports.getNeighbors = (
  candidateTimetable,
  modules,
  groups,
  halls,
  days,
  times,
  lecturers
) => {
  const MAX_ITERATIONS = 500; // maximum number of iterations
  let neighbors = [];
  let type = getRandomItem([1, 2, 3, 4, 5]);
  let i = 0;

  while (i < MAX_ITERATIONS) {
    let newTimetable = JSON.parse(JSON.stringify(candidateTimetable));

    switch (type) {
      case 1: { // Swap time and day
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
          }
        }
        break;
      }

      case 2: { // assaign new hall
        // randomly select two classes from the timetable
        const randomIndex1 = Math.floor(Math.random() * newTimetable.length);
        
        groups.forEach((g) => {
          modules.filter(m => newTimetable[randomIndex1].Group_ID === g.Group_ID && newTimetable[randomIndex1].Module_ID === m.Module_ID)
          .forEach((m) => {
            newTimetable[randomIndex1].Hall_ID = getHall(halls, g.Group_Count, m.Hall_Type_ID)
          });
        });

        if (newTimetable[randomIndex1].Subject_Type_ID === 2) {
          newTimetable.filter((m) => m.Module_ID === newTimetable[randomIndex1].Module_ID)
            .forEach(e => e.Hall_ID = newTimetable[randomIndex1].Hall_ID);
        }

        break;
      };

      case 3: { // swap hall
        const moduleIndex1 = Math.floor(Math.random() * newTimetable.length);
        const moduleIndex2 = Math.floor(Math.random() * newTimetable.length);
        
        const hallType1 = modules.filter(m => newTimetable[moduleIndex1].Module_ID === m.Module_ID)[0].Hall_Type_ID;
        const hallType2 = modules.filter(m => newTimetable[moduleIndex2].Module_ID === m.Module_ID)[0].Hall_Type_ID;
        
        if (hallType1 === hallType2) {
          [newTimetable[moduleIndex1].Hall_ID, newTimetable[moduleIndex2].Hall_ID] = [newTimetable[moduleIndex2].Hall_ID, newTimetable[moduleIndex1].Hall_ID]
        }

        break;
      };
      
      case 4: { // assaign new day
        const moduleIndex1 = Math.floor(Math.random() * newTimetable.length);

        newTimetable[moduleIndex1].Day_ID = getDay(days, lecturers, newTimetable[moduleIndex1]);

        if (newTimetable[moduleIndex1].Subject_Type_ID === 2) {
          newTimetable.filter(m => m.Module_ID === newTimetable[moduleIndex1].Module_ID)
            .forEach(m => m.Day_ID = newTimetable[moduleIndex1].Day_ID);
        }
      };

      case 5: { // assaign new time
        const moduleIndex1 = Math.floor(Math.random() * newTimetable.length);
        const moduleData = modules.filter(m => m.Module_ID === newTimetable[moduleIndex1].Module_ID)[0]
        
        const time = getRandomItem(times);

        newTimetable[moduleIndex1].Start_Time = time.Start_Time;

        newTimetable[moduleIndex1].End_Time = getEndTime(+time.Start_Time.slice(0, 2), moduleData);

        if (newTimetable[moduleIndex1].Subject_Type_ID === 2) {
          newTimetable.filter(m => m.Module_ID === newTimetable[moduleIndex1].Module_ID)
            .forEach((m, i) => {

              m.Start_Time = `${
                +newTimetable[moduleIndex1].Start_Time.slice(0, 2) + moduleData.Credit_Practical < 10
                  ? `0${+newTimetable[moduleIndex1].Start_Time.slice(0, 2) + moduleData.Credit_Practical}`
                  : +newTimetable[moduleIndex1].Start_Time.slice(0, 2) + moduleData.Credit_Practical
              }:00:00`;

              m.End_Time = `${
                +newTimetable[moduleIndex1].End_Time.slice(0, 2) + moduleData.Credit_Practical < 10
                  ? `0${+newTimetable[moduleIndex1].End_Time.slice(0, 2) + moduleData.Credit_Practical}`
                  : +newTimetable[moduleIndex1].End_Time.slice(0, 2) + moduleData.Credit_Practical
              }:00:00`;
            })
        }

      };

      default:
        break;
    }

    if (feasible(newTimetable, lecturers) === 0)
      neighbors.push(newTimetable);

    i++;
  }


  return neighbors;
};
