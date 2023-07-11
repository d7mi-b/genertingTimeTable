const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// initialTimetable function to generate initial timetable
module.exports.initialTimetable = (modules, groups, halls, days, times, lecturers) => {
  let i = 0;
  while (true) {
    let timetable = generate(modules, groups, halls, days, times, lecturers);

    if (feasible(timetable, lecturers, modules)) {
      console.log("number of iteration to get initial timetable:", i)
      return timetable;
    }
    i++;
  }

  console.log('Not found timetable')
};

const generate = (modules, groups, halls, days, times, lecturers) => {
  let timetable = [];
  // Assign modules, lecturer and groubs to timetable.
  groups.forEach((g) => {
    modules.forEach((m) => {
      if (
        g.Semester_ID === m.Semester_ID &&
        g.Department_ID === m.Department_ID
        // && ( g.Group_ID === 3 || g.Group_ID === 4  || g.Group_ID === 5)
      ) {
        if (m.Subject_Type_ID === 2 && g.Group_ID !== 5) {
          for (let i = 0; i < 3; i++) {
            timetable.push({
              Module_ID: m.Module_ID,
              Lecturer_ID: m.Lecturer_ID,
              Group_ID: g.Group_ID,
              Subject_Type_ID: m.Subject_Type_ID
            });
          }
        } else if (m.Subject_Type_ID === 2 && g.Group_ID === 5) {
          for (let i = 0; i < 2; i++) {
            timetable.push({
              Module_ID: m.Module_ID,
              Lecturer_ID: m.Lecturer_ID,
              Group_ID: g.Group_ID,
              Subject_Type_ID: m.Subject_Type_ID
            });
          }
        } else {
          timetable.push({
            Module_ID: m.Module_ID,
            Lecturer_ID: m.Lecturer_ID,
            Group_ID: g.Group_ID,
            Subject_Type_ID: m.Subject_Type_ID
          });
        }

        // timetable.push({
        //   Module_ID: m.Module_ID,
        //   Lecturer_ID: m.Lecturer_ID,
        //   Group_ID: g.Group_ID,
        //   Subject_Type_ID: m.Subject_Type_ID
        // });
      }
    });
  });

  // Assign Hall to timetable
  for (let i = 0; i < timetable.length; i++) {
    if (i !== 0 && timetable[i].Module_ID === timetable[i - 1].Module_ID) {
      timetable[i].Hall_ID = timetable[i - 1].Hall_ID;
      continue;
    }
    
    groups.forEach((g) => {
      modules.forEach((m) => {
        if (timetable[i].Group_ID === g.Group_ID && timetable[i].Module_ID === m.Module_ID) {
          const hallsAvailable = halls.filter((h) => {
            return (
              h.Hall_Capacity >= g.Group_Count &&
              h.Hall_Type_ID === m.Hall_Type_ID
            );
          });

          const hall = getRandomItem(hallsAvailable);

          if (hall) {
            timetable[i].Hall_ID = hall.Hall_ID;
          }
        }
      });
    });
  }

  // Assign Days to timeTable
  for (let i = 0; i < timetable.length; i++) {
    if (i !== 0 && timetable[i].Module_ID === timetable[i - 1].Module_ID) {
      timetable[i].Day_ID = timetable[i - 1].Day_ID;
      continue;
    }

    let day = getRandomItem(days);
    const lecturerDay = lecturers.filter(l => l.Lecturer_ID === timetable[i].Lecturer_ID);

    // If the day not available to lecturer then change the day
    while (!lecturerDays(lecturerDay, day.Day_ID)) {
      if (lecturerDay[0].Sunday === 0 && day.Day_ID === 1) {
        day = getRandomItem(days)
      }
      else if (lecturerDay[0].Monday === 0 && day.Day_ID === 2) {
        day = getRandomItem(days)
      }
      else if (lecturerDay[0].Tuesday === 0 && day.Day_ID === 3) {
        day = getRandomItem(days)
      }
      else if (lecturerDay[0].Wednesday === 0 && day.Day_ID === 4) {
        day = getRandomItem(days)
      }
      else if (lecturerDay[0].Thursday === 0 && day.Day_ID === 5) {
        day = getRandomItem(days)
      }
    }

    timetable[i].Day_ID = day.Day_ID;
  }

  // Assign Times to timetable
  for (let i = 0; i < timetable.length; i++) {
    if (i !== 0 && timetable[i].Module_ID === timetable[i - 1].Module_ID) {
      timetable[i].Start_Time =`${
        +timetable[i - 1].Start_Time.slice(0, 2) + 2 < 10
          ? `0${+timetable[i - 1].Start_Time.slice(0, 2) + 2}`
          : +timetable[i - 1].Start_Time.slice(0, 2) + 2
      }:00:00`;

      timetable[i].End_Time = `${
        +timetable[i - 1].End_Time.slice(0, 2) + 2 < 10
          ? `0${+timetable[i - 1].End_Time.slice(0, 2) + 2}`
          : +timetable[i - 1].End_Time.slice(0, 2) + 2
      }:00:00`;

      continue;
    }

    modules.forEach((m) => {
      if (timetable[i].Module_ID === m.Module_ID) {
        let time = times[0];
        timetable[i].Start_Time = time.Start_Time;

        if (m.Subject_Type_ID === 1) {
          const endTime = `${
            +timetable[i].Start_Time.slice(0, 2) + m.Credit_Theoretical < 10
              ? `0${+timetable[i].Start_Time.slice(0, 2) + m.Credit_Theoretical}`
              : +timetable[i].Start_Time.slice(0, 2) + m.Credit_Theoretical
          }:00:00`;
          timetable[i].End_Time = endTime;
        } else if (m.Subject_Type_ID === 2) {
          const endTime = `${
            +timetable[i].Start_Time.slice(0, 2) + m.Credit_Practical < 10
              ? `0${+timetable[i].Start_Time.slice(0, 2) + m.Credit_Practical}`
              : +timetable[i].Start_Time.slice(0, 2) + m.Credit_Practical
          }:00:00`;
          timetable[i].End_Time = endTime;
        } else if (m.Subject_Type_ID === 3) {
          const endTime = `${
            +timetable[i].Start_Time.slice(0, 2) + m.Credit_Tutorial < 10
              ? `0${+timetable[i].Start_Time.slice(0, 2) + m.Credit_Tutorial}`
              : +timetable[i].Start_Time.slice(0, 2) + m.Credit_Tutorial
          }:00:00`;
          timetable[i].End_Time = endTime;
        }

        // Loop for check if there is conflict
        // if there conflict assign new day and time
        for (let j = 0; j < timetable.length; j++) {
          if (i === j) continue;

          if (
            (timetable[i].Start_Time && timetable[j].Start_Time) &&
            (
              timetable[i].Hall_ID === timetable[j].Hall_ID ||
              timetable[i].Lecturer_ID === timetable[j].Lecturer_ID ||
              (
                timetable[i].Group_ID === timetable[j].Group_ID && 
                (timetable[i].Subject_Type_ID !== 2 || timetable[j].Subject_Type_ID !== 2)
              )
            ) && 
            timetable[i].Day_ID === timetable[j].Day_ID &&
            isOverLapping(timetable[i], timetable[j])
        ) {
            for (let k = 1; k < times.length; k++) {
              time = times[k];

              timetable[i].Start_Time = time.Start_Time;

              if (m.Subject_Type_ID === 1) {
                const endTime = `${
                  +timetable[i].Start_Time.slice(0, 2) + m.Credit_Theoretical < 10
                    ? `0${+timetable[i].Start_Time.slice(0, 2) + m.Credit_Theoretical}`
                    : +timetable[i].Start_Time.slice(0, 2) + m.Credit_Theoretical
                }:00:00`;
                timetable[i].End_Time = endTime;
              } else if (m.Subject_Type_ID === 2) {
                const endTime = `${
                  +timetable[i].Start_Time.slice(0, 2) + m.Credit_Practical < 10
                    ? `0${+timetable[i].Start_Time.slice(0, 2) + m.Credit_Practical}`
                    : +timetable[i].Start_Time.slice(0, 2) + m.Credit_Practical
                }:00:00`;
                timetable[i].End_Time = endTime;
              } else if (m.Subject_Type_ID === 3) {
                const endTime = `${
                  +timetable[i].Start_Time.slice(0, 2) + m.Credit_Tutorial < 10
                    ? `0${+timetable[i].Start_Time.slice(0, 2) + m.Credit_Tutorial}`
                    : +timetable[i].Start_Time.slice(0, 2) + m.Credit_Tutorial
                }:00:00`;
                timetable[i].End_Time = endTime;
              }

              if (!isOverLapping(timetable[i], timetable[j])) {
                break;
              }
            }
          }
        }
      }
    });
  }

  return timetable;
};
