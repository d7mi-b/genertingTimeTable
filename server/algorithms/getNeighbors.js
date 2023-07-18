const { getDuration } = require("./getDuration");
const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const { getHall } = require("./getHall");
const { getDay } = require("./getDay");
const { getEndTime } = require("./getEndTime");

module.exports.getNeighbors = (candidateTimetable, modules, groups, halls, days, times, lecturers) => {
  const MAX_ITERATIONS = 1000; // maximum number of iterations
  let neighbors = [];
  let type = getRandomItem([1, 2, 3, 4, 5])
  let i = 0;

  while (i < MAX_ITERATIONS) {
    let newTimetable = JSON.parse(JSON.stringify(candidateTimetable));

    switch (type) {
      case 1: { // Swap time and day
        // randomly select two classes from the timetable
        const moduleIndex1 = Math.floor(Math.random() * newTimetable.length);
        const moduleIndex2 = Math.floor(Math.random() * newTimetable.length);

        const moduleData1 = modules.filter(m => m.Module_ID === newTimetable[moduleIndex1].Module_ID)[0]
        const moduleData2 = modules.filter(m => m.Module_ID === newTimetable[moduleIndex2].Module_ID)[0]

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
        }

        if (newTimetable[moduleIndex1].Subject_Type_ID === 2) {
          newTimetable.filter(m => m.Module_ID === newTimetable[moduleIndex1].Module_ID)
            .forEach(m => {
              m.Day_ID = newTimetable[moduleIndex1].Day_ID;

              m.Start_Time = `${
                +newTimetable[moduleIndex1].Start_Time.slice(0, 2) + moduleData1.Credit_Practical < 10
                  ? `0${+newTimetable[moduleIndex1].Start_Time.slice(0, 2) + moduleData1.Credit_Practical}`
                  : +newTimetable[moduleIndex1].Start_Time.slice(0, 2) + moduleData1.Credit_Practical
              }:00:00`;

              m.End_Time = `${
                +newTimetable[moduleIndex1].End_Time.slice(0, 2) + moduleData1.Credit_Practical < 10
                  ? `0${+newTimetable[moduleIndex1].End_Time.slice(0, 2) + moduleData1.Credit_Practical}`
                  : +newTimetable[moduleIndex1].End_Time.slice(0, 2) + moduleData1.Credit_Practical
              }:00:00`;
            })

            newTimetable.filter(m => m.Module_ID === newTimetable[moduleIndex2].Module_ID)
            .forEach(m => {
              m.Day_ID = newTimetable[moduleIndex2].Day_ID;

              m.Start_Time = `${
                +newTimetable[moduleIndex2].Start_Time.slice(0, 2) + moduleData2.Credit_Practical < 10
                  ? `0${+newTimetable[moduleIndex2].Start_Time.slice(0, 2) + moduleData2.Credit_Practical}`
                  : +newTimetable[moduleIndex2].Start_Time.slice(0, 2) + moduleData2.Credit_Practical
              }:00:00`;

              m.End_Time = `${
                +newTimetable[moduleIndex2].End_Time.slice(0, 2) + moduleData2.Credit_Practical < 10
                  ? `0${+newTimetable[moduleIndex2].End_Time.slice(0, 2) + moduleData2.Credit_Practical}`
                  : +newTimetable[moduleIndex2].End_Time.slice(0, 2) + moduleData2.Credit_Practical
              }:00:00`;
            })
        }

        break;
      };

      case 2: { // assaign new hall
        // randomly select two classes from the timetable
        const moduleIndex1 = Math.floor(Math.random() * newTimetable.length);
        
        groups.forEach((g) => {
          modules.filter(m => newTimetable[moduleIndex1].Group_ID === g.Group_ID && newTimetable[moduleIndex1].Module_ID === m.Module_ID)
          .forEach((m) => {
            newTimetable[moduleIndex1].Hall_ID = getHall(halls, g.Group_Count, m.Hall_Type_ID)
          });
        });
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


    if (feasible(newTimetable, lecturers) === 0) {
      neighbors.push(newTimetable);
    } else if (feasible(newTimetable, lecturers) < feasible(candidateTimetable, lecturers)) {
      neighbors.push(newTimetable);
    }
    i++;
  }

  return neighbors;
};
