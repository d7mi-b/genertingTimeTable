const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// initialTimetable function to generate initial timetable
module.exports.initialTimetable = (modules, groups, halls, days, times, lecturers) => {
  let i = 0;
  while (true) {
    let timetable = generate(modules, groups, halls, days, times, lecturers);

    if (feasible(timetable, lecturers, modules) < 10) {
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
        // && ( g.Group_ID === 2 || g.Group_ID === 3  || g.Group_ID === 4 || g.Group_ID === 5)
      ) {
        if (m.Subject_Type_ID === 2) {
          for (let i = 0; i < g.Group_Count / 25; i++) {
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
          timetable[i].Hall_ID = getHall(halls, g.Group_Count, m.Hall_Type_ID)
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

        timetable[i].End_Time = getEndTime(time.Start_Time, modules[m])
      }

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
  
              timetable[i].End_Time = getEndTime(time.Start_Time, modules[m])
  
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

  return timetable;
};

const getHall = (halls, groupCount, hallTypeID) => {
  const hallsAvailable = halls.filter((h) => {
    return (
      h.Hall_Capacity >= groupCount &&
      h.Hall_Type_ID === hallTypeID
    );
  });

  const hall = getRandomItem(hallsAvailable);

  return hall.Hall_ID;
}

const getDay = (days, lecturers, module) => {
  let day = getRandomItem(days);
  const lecturerDay = lecturers.filter(l => l.Lecturer_ID === module.Lecturer_ID);

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

  return day.Day_ID
}

const getEndTime = (startTime, module) => {
  if (module.Subject_Type_ID === 1) {

    const endTime = `${
      +startTime.slice(0, 2) + module.Credit_Theoretical < 10
        ? `0${+startTime.slice(0, 2) + module.Credit_Theoretical}`
        : +startTime.slice(0, 2) + module.Credit_Theoretical
    }:00:00`;

    return endTime;

  } else if (module.Subject_Type_ID === 2) {

    const endTime = `${
      +startTime.slice(0, 2) + module.Credit_Practical < 10
        ? `0${+startTime.slice(0, 2) + module.Credit_Practical}`
        : +startTime.slice(0, 2) + module.Credit_Practical
    }:00:00`;

    return endTime;

  } else if (module.Subject_Type_ID === 3) {

    const endTime = `${
      +startTime.slice(0, 2) + module.Credit_Tutorial < 10
        ? `0${+startTime.slice(0, 2) + module.Credit_Tutorial}`
        : +startTime.slice(0, 2) + module.Credit_Tutorial
    }:00:00`;

    return endTime;

  }
}
