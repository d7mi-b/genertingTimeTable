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

    if (feasible(timetable, lecturers, modules) === 0) {
      console.log("number of iteration to get initial timetable:", i)
      return timetable;
    }
    i++;
  }

  console.log('Not found timetable')
};

const generate = (modules, groups, halls, days, times, lecturers) => {
  let timetable = [];

  lecturers.sort((x, y) => {
    let daysX = 0;
    let daysY = 0;
    if (x.Sunday === 1) {
      daysX++;
    }
    if (x.Monday === 1) {
        daysX++;
    }
    if (x.Tuesday === 1) {
        daysX++;
    }
    if (x.Wednesday === 1) {
        daysX++;
    }
    if (x.Thursday === 1) {
        daysX++;
    }

    if (y.Sunday === 1) {
      daysY++;
    }
    if (y.Monday === 1) {
        daysY++;
    }
    if (y.Tuesday === 1) {
        daysY++;
    }
    if (y.Wednesday === 1) {
        daysY++;
    }
    if (y.Thursday === 1) {
        daysY++;
    }

    return daysX - daysY;
  })

  // Assign modules, lecturer and groubs to timetable.
  for (let l = 0; l < lecturers.length; l++) {
    for (let g = 0; g < groups.length; g++) {
      for (let m = 0; m < modules.length; m++) {
        if (
          groups[g].Semester_ID === modules[m].Semester_ID &&
          groups[g].Department_ID === modules[m].Department_ID &&
          lecturers[l].Lecturer_ID === modules[m].Lecturer_ID &&
          modules[m].Group_ID === groups[g].Group_ID
        ) {
          for (let i = 0; i < +modules[m].practical_Groups_No; i++) {
            timetable.push({
              id: `${groups[g].Group_ID}-${modules[m].Module_ID}-${i}`,
              Module_ID: modules[m].Module_ID,
              Lecturer_ID: modules[m].Lecturer_ID,
              Group_ID: groups[g].Group_ID,
              Subject_Type_ID: modules[m].Subject_Type_ID,
            });
          }
        }
      }
    }
  }

  for (let i = 0; i < timetable.length; i++) {

    // if (timetable[i].Day_ID && timetable[i].Start_Time && timetable[i].End_Time && timetable.Hall_ID)
    //   continue;

    for (let g = 0; g < groups.length; g++) {
      for (let m = 0; m < modules.length; m++) {
        if (timetable[i].Group_ID === groups[g].Group_ID && timetable[i].Module_ID === modules[m].Module_ID) {

          // Assign hall to module
          const hallsAvailable = halls.filter((h) => {
              return h.Hall_Type_ID === modules[m].Hall_Type_ID;
          });
          
          timetable[i].Hall_ID = hallsAvailable[0].Hall_ID
          
          // Assign a day to module
          const lecturerDay = lecturers.filter(l => l.Lecturer_ID === timetable[i].Lecturer_ID);
          const daysAvailable = days.filter(d => lecturerDays(lecturerDay, d.Day_ID));

          timetable[i].Day_ID = daysAvailable[0].Day_ID;

          // Assign a time to module
          let time = times[0];

          timetable[i].Start_Time = time.Start_Time;

          timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), modules[m]);

          // if (timetable[i].Subject_Type_ID === 2) {

          //   timetable.filter(j => j.Module_ID === timetable[i].Module_ID).forEach((j, index) => {
          //     if (index > 0) {
          //       j.Hall_ID = timetable[i].Hall_ID;

          //       j.Day_ID = timetable[i].Day_ID;
        
          //       j.Start_Time =`${
          //         +timetable[i].Start_Time.slice(0, 2) + modules[m].Credit_Practical < 10
          //           ? `0${+timetable[i].Start_Time.slice(0, 2) + modules[m].Credit_Practical}`
          //           : +timetable[i].Start_Time.slice(0, 2) + modules[m].Credit_Practical
          //       }:00:00`;

          //       j.End_Time = `${
          //         +timetable[i].End_Time.slice(0, 2) + modules[m].Credit_Practical < 10
          //           ? `0${+timetable[i].End_Time.slice(0, 2) + modules[m].Credit_Practical}`
          //           : +timetable[i].End_Time.slice(0, 2) + modules[m].Credit_Practical
          //       }:00:00`;
          //     }
          //   })
          // }

          while (
            searchConflictsLecturer(timetable, timetable[i]) || 
            searchConflictsGroup(timetable, timetable[i]) ||
            searchConflictsHall(timetable, timetable[i]) ||
            endTimeConficts(timetable[i])
          ) {
            for (let h = 0; h < hallsAvailable.length; h++) {
              for (let d = 0; d < daysAvailable.length; d++) {
                for (let t = 0; t < times.length; t++) {
                  let time = times[t];

                  timetable[i].Start_Time = time.Start_Time;
      
                  timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), modules[m])

                  if (
                    !searchConflictsGroup(timetable, timetable[i]) && 
                    !searchConflictsLecturer(timetable, timetable[i]) &&
                    !endTimeConficts(timetable[i]) &&
                    !searchConflictsHall(timetable, timetable[i])
                  )
                    break;
                }
    
                if (
                  !searchConflictsGroup(timetable, timetable[i]) && 
                  !searchConflictsLecturer(timetable, timetable[i]) &&
                  !endTimeConficts(timetable[i]) &&
                  !searchConflictsHall(timetable, timetable[i])
                )
                  break;
      
                let day = daysAvailable[d];
      
                timetable[i].Day_ID = day.Day_ID;
              }

              if (
                !searchConflictsGroup(timetable, timetable[i]) && 
                !searchConflictsLecturer(timetable, timetable[i]) &&
                !endTimeConficts(timetable[i]) &&
                !searchConflictsHall(timetable, timetable[i])
              )
                break;

              let hall = hallsAvailable[h];

              timetable[i].Hall_ID = hall.Hall_ID;
            }
          }
        }
      }
    }
  }

  return timetable;
};


const searchConflictsLecturer = (timetable, module) => {
  for (let i = 0; i < timetable.length; i++) {
    if (!timetable[i].Start_Time) continue;
    
    if (
      timetable[i].id !== module.id &&
      (
        timetable[i].Lecturer_ID === module.Lecturer_ID
      ) &&
      timetable[i].Day_ID === module.Day_ID &&
      isOverLapping(timetable[i], module)
    ) {
      return true;
    }
  }

  return false;
}

const searchConflictsGroup = (timetable, module) => {
  for (let i = 0; i < timetable.length; i++) {
    if (timetable[i].id === module.id) continue;

    if (!timetable[i].Start_Time) continue;

    if (
      ( timetable[i].Subject_Type_ID !== 2 || module.Subject_Type_ID !== 2 )
      && timetable[i].Group_ID === module.Group_ID 
      && timetable[i].Day_ID === module.Day_ID 
      && isOverLapping(timetable[i], module)
    ) {
      return true;
    }
  }

  return false;
}

const searchConflictsHall = (timetable, module) => {
  for (let i = 0; i < timetable.length; i++) {
    if (timetable[i].id === module.id) continue;

    if (!timetable[i].Hall_ID) continue;

    if (
      timetable[i].Hall_ID === module.Hall_ID &&
      timetable[i].Day_ID === module.Day_ID &&
      isOverLapping(timetable[i], module)
    ) {
      return true;
    }
  }

  return false;
}

const endTimeConficts = (module) => {
  //if The end time is out of limit it's not acceptable
  if(module.End_Time > "17:00:00"){
    return true;
  }
  return false;
}