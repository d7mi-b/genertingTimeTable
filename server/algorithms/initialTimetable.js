const { feasible } = require("./feasible");
const { getDay } = require("./getDay");
const { getEndTime } = require("./getEndTime");
const { getHall } = require("./getHall");
const { getRandomItem } = require("./getRandomItem");
const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// initialTimetable function to generate initial timetable
module.exports.initialTimetable = (modules, groups, halls, days, times, lecturers) => {
  let i = 0;
  while (true) {
    let timetable = generate(modules, groups, halls, days, times, lecturers);

    if (feasible(timetable, lecturers, modules) < timetable.length -  0.85 * timetable.length) {
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
  for (let g = 0; g < groups.length; g++) {
    for (let m = 0; m < modules.length; m++) {
      if (
        groups[g].Semester_ID === modules[m].Semester_ID &&
        groups[g].Department_ID === modules[m].Department_ID
      ) {
        if (modules[m].Subject_Type_ID === 2) {
          for (let i = 0; i < 3; i++) {
            timetable.push({
              Module_ID: modules[m].Module_ID,
              Lecturer_ID: modules[m].Lecturer_ID,
              Group_ID: groups[g].Group_ID,
              Subject_Type_ID: modules[m].Subject_Type_ID
            });
          }
        } else {
          timetable.push({
            Module_ID: modules[m].Module_ID,
            Lecturer_ID: modules[m].Lecturer_ID,
            Group_ID: groups[g].Group_ID,
            Subject_Type_ID: modules[m].Subject_Type_ID
          });
        }
      }
    }
  }

  // Assign Hall to timetable
  for (let i = 0; i < timetable.length; i++) {
    if (i !== 0 && timetable[i].Module_ID === timetable[i - 1].Module_ID) {
      timetable[i].Hall_ID = timetable[i - 1].Hall_ID;
      continue;
    }

    for (let g = 0; g < groups.length; g++) {
      for (let m = 0; m < modules.length; m++) {
        if (timetable[i].Group_ID === groups[g].Group_ID && timetable[i].Module_ID === modules[m].Module_ID) {
          timetable[i].Hall_ID = getHall(halls, groups[g].Group_Count, modules[m].Hall_Type_ID)
        }
      }
    }
  }

  // Assign Days to timeTable
  for (let i = 0; i < timetable.length; i++) {
    if (i !== 0 && timetable[i].Module_ID === timetable[i - 1].Module_ID) {
      timetable[i].Day_ID = timetable[i - 1].Day_ID;
      continue;
    }

    timetable[i].Day_ID = getDay(days, lecturers, timetable[i]);
  }

  // Assign Times to timetable
  for (let i = 0; i < timetable.length; i++) {
    if (i !== 0 && timetable[i].Module_ID === timetable[i - 1].Module_ID) {
      timetable[i].Start_Time =`${
        +timetable[i - 1].Start_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical < 10
          ? `0${+timetable[i - 1].Start_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical}`
          : +timetable[i - 1].Start_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical
      }:00:00`;

      timetable[i].End_Time = `${
        +timetable[i - 1].End_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical < 10
          ? `0${+timetable[i - 1].End_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical}`
          : +timetable[i - 1].End_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical
      }:00:00`;

      continue;
    }

    for (let m = 0; m < modules.length; m++) {
      if (timetable[i].Module_ID === modules[m].Module_ID) {
        let time = times[0];

        timetable[i].Start_Time = time.Start_Time;

        timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), modules[m]);

        for (let j = 0; j < i; j++) {
          if (i === j) continue;
          
          if (
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
            while (isOverLapping(timetable[i], timetable[j])) {
              for (let k = 1; k < times.length; k++) {
                let time = times[k];
    
                timetable[i].Start_Time = time.Start_Time;
    
                timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), modules[m])
    
                if (!isOverLapping(timetable[i], timetable[j]))
                  break;
              }
  
              if (!isOverLapping(timetable[i], timetable[j]))
                break;
  
              timetable[i].Day_ID = getDay(days, lecturers, timetable[i])
            }
          }
        }
      }
    }
  }

  return timetable;
};
