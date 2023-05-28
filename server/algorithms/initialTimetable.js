const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// initialTimetable function to generate initial timetable
module.exports.initialTimetable = (modules, groups, halls, days, times, lecturers) => {
  let i = 0;
  while (true) {
    let timetable = generate(modules, groups, halls, days, times, lecturers);

    if (feasible(timetable, lecturers)) {
      console.log("number of iteration to get initial timetable:", i)
      return timetable;
    }
    i++;
  }
};

const generate = (modules, groups, halls, days, times, lecturers) => {
  let timetable = [];
  // Assign modules, lecturer and groubs to timetable.
  groups.forEach((g) => {
    modules.forEach((m) => {
      if (
        g.Semester_ID === m.Semester_ID &&
        g.Department_ID === m.Department_ID
      ) {
        timetable.push({
          Module_ID: m.Module_ID,
          Lecturer_ID: m.Lecturer_ID,
          Group_ID: g.Group_ID,
        });
      }
    });
  });

  // Assign Hall to timetable
  timetable.forEach((e) => {
    groups.forEach((g) => {
      modules.forEach((m) => {
        if (e.Group_ID === g.Group_ID && e.Module_ID === m.Module_ID) {
          const hallsAvailable = halls.filter((h) => {
            return (
              h.Hall_Capacity >= g.Group_Count &&
              h.Hall_Type_ID === m.Hall_Type_ID
            );
          });

          const hall = getRandomItem(hallsAvailable);

          if (hall) {
            e.Hall_ID = hall.Hall_ID;
          }
        }
      });
    });
  });

  // Assign Days to timeTable
  timetable.forEach((e) => {
    let day = getRandomItem(days);
    const lecturerDay = lecturers.filter(l => l.Lecturer_ID === e.Lecturer_ID);

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

    e.Day_ID = day.Day_ID;
  });

  // Assign Times to timetable
  timetable.forEach((e, i) => {
    modules.forEach((m) => {
      if (e.Module_ID === m.Module_ID) {
        let time = times[0];
        e.Start_Time = time.Start_Time;

        if (m.Subject_Type_ID === 1) {
          const endTime = `${
            +e.Start_Time.slice(0, 2) + m.Credit_Theoretical < 10
              ? `0${+e.Start_Time.slice(0, 2) + m.Credit_Theoretical}`
              : +e.Start_Time.slice(0, 2) + m.Credit_Theoretical
          }:00:00`;
          e.End_Time = endTime;
        } else if (m.Subject_Type_ID === 2) {
          const endTime = `${
            +e.Start_Time.slice(0, 2) + m.Credit_Practical < 10
              ? `0${+e.Start_Time.slice(0, 2) + m.Credit_Practical}`
              : +e.Start_Time.slice(0, 2) + m.Credit_Practical
          }:00:00`;
          e.End_Time = endTime;
        } else if (m.Subject_Type_ID === 3) {
          const endTime = `${
            +e.Start_Time.slice(0, 2) + m.Credit_Tutorial < 10
              ? `0${+e.Start_Time.slice(0, 2) + m.Credit_Tutorial}`
              : +e.Start_Time.slice(0, 2) + m.Credit_Tutorial
          }:00:00`;
          e.End_Time = endTime;
        }

        // Loop for check if there is conflict
        // if there conflict assign new day and time
        for (let j = 0; j < timetable.length; j++) {
          if (i === j) continue;

          if (timetable[i].Start_Time && timetable[j].Start_Time) {
            if (
              isOverLapping(timetable[i], timetable[j]) &&
              timetable[i].Day_ID === timetable[j].Day_ID
            ) {
              if (
                timetable[i].Hall_ID === timetable[j].Hall_ID ||
                timetable[i].Lecturer_ID === timetable[j].Lecturer_ID ||
                timetable[i].Group_ID === timetable[j].Group_ID
              ) {
                for (let k = 1; k < times.length; k++) {
                  time = times[k];

                  e.Start_Time = time.Start_Time;

                  if (m.Subject_Type_ID === 1) {
                    const endTime = `${
                      +e.Start_Time.slice(0, 2) + m.Credit_Theoretical < 10
                        ? `0${+e.Start_Time.slice(0, 2) + m.Credit_Theoretical}`
                        : +e.Start_Time.slice(0, 2) + m.Credit_Theoretical
                    }:00:00`;
                    e.End_Time = endTime;
                  } else if (m.Subject_Type_ID === 2) {
                    const endTime = `${
                      +e.Start_Time.slice(0, 2) + m.Credit_Practical < 10
                        ? `0${+e.Start_Time.slice(0, 2) + m.Credit_Practical}`
                        : +e.Start_Time.slice(0, 2) + m.Credit_Practical
                    }:00:00`;
                    e.End_Time = endTime;
                  } else if (m.Subject_Type_ID === 3) {
                    const endTime = `${
                      +e.Start_Time.slice(0, 2) + m.Credit_Tutorial < 10
                        ? `0${+e.Start_Time.slice(0, 2) + m.Credit_Tutorial}`
                        : +e.Start_Time.slice(0, 2) + m.Credit_Tutorial
                    }:00:00`;
                    e.End_Time = endTime;
                  }

                  if (!isOverLapping(timetable[i], timetable[j])) {
                    break;
                  }
                }
              }
            }
          }
        }
      }
    });
  });

  return timetable;
};
