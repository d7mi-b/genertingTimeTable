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
  while (i < 1) {
    let timetable = generate(modules, groups, halls, days, times, lecturers);
    return timetable;
    // if (feasible(timetable, lecturers, modules) === 0) {
    //   console.log("number of iteration to get initial timetable:", i)
    //   return timetable;
    // }
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
              id: `${groups[g].Group_ID}-${modules[m].Module_ID}-${i}`,
              Module_ID: modules[m].Module_ID,
              Lecturer_ID: modules[m].Lecturer_ID,
              Group_ID: groups[g].Group_ID,
              Subject_Type_ID: modules[m].Subject_Type_ID,
            });
          }
        } else {
          timetable.push({
            id: `${groups[g].Group_ID}-${modules[m].Module_ID}-0`,
            Module_ID: modules[m].Module_ID,
            Lecturer_ID: modules[m].Lecturer_ID,
            Group_ID: groups[g].Group_ID,
            Subject_Type_ID: modules[m].Subject_Type_ID,
          });
        }
      }
    }
  }

  for (let i = 0; i < timetable.length; i++) {

    // if (i !== 0 &&  timetable[i].Module_ID === timetable[i - 1].Module_ID) {
    //   timetable[i].Day_ID = timetable[i - 1].Day_ID;
      
    //   timetable[i].Start_Time =`${
    //     +timetable[i - 1].Start_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical < 10
    //       ? `0${+timetable[i - 1].Start_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical}`
    //       : +timetable[i - 1].Start_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical
    //   }:00:00`;

    //   timetable[i].End_Time = `${
    //     +timetable[i - 1].End_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical < 10
    //       ? `0${+timetable[i - 1].End_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical}`
    //       : +timetable[i - 1].End_Time.slice(0, 2) + modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0].Credit_Practical
    //   }:00:00`;

    //   timetable[i].Hall_ID = timetable[i - 1].Hall_ID;

    //   continue;
    // }

    const module = modules.filter(m => m.Module_ID === timetable[i].Module_ID)[0];

    for (let g = 0; g < groups.length; g++) {
      for (let m = 0; m < modules.length; m++) {
        if (timetable[i].Group_ID === groups[g].Group_ID && timetable[i].Module_ID === modules[m].Module_ID) {
          
          // Assign a day to module
          const lecturerDay = lecturers.filter(l => l.Lecturer_ID === timetable[i].Lecturer_ID);
          const daysAvailable = days.filter(d => lecturerDays(lecturerDay, d.Day_ID));

          timetable[i].Day_ID = daysAvailable[0].Day_ID;

          // Assign a time to module
          let time = times[0];

          timetable[i].Start_Time = time.Start_Time;

          timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), modules[m]);
          console.log(timetable[i].Module_ID, ' - ', timetable[i].Lecturer_ID)
          while (
            searchConflictsLecturer(timetable, timetable[i]) || 
            searchConflictsGroup(timetable, timetable[i]) ||
            endTimeConficts(timetable[i])
            ) {
            if (daysAvailable.length > 2) {
              for (let d = 0; d < daysAvailable.length; d++) {
                for (let t = 0; t < times.length; t++) {
                  let time = times[t];
      
                  timetable[i].Start_Time = time.Start_Time;
      
                  timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), module)
      
                  if (
                    !searchConflictsGroup(timetable, timetable[i]) && 
                    !searchConflictsLecturer(timetable, timetable[i]) &&
                    !endTimeConficts(timetable[i])
                  )
                    break;
                }
    
                if (
                  !searchConflictsGroup(timetable, timetable[i]) && 
                  !searchConflictsLecturer(timetable, timetable[i]) &&
                  !endTimeConficts(timetable[i])
                )
                  break;
      
                let day = daysAvailable[d];
      
                timetable[i].Day_ID = day.Day_ID;
              }
            } else {
              changeConflictsGroup(timetable, timetable[i], days, times, lecturers)
            }
          }

          if (!searchConflictsLecturer(timetable, timetable[i]))
            console.log('no conflicts lecturer')

          if (!searchConflictsGroup(timetable, timetable[i])) {
            console.log('no conflicts group')
          }

          // Assign hall to module
          const hallsAvailable = halls.filter((h) => {
              return h.Hall_Capacity >= groups[g].Group_Count && h.Hall_Type_ID === modules[m].Hall_Type_ID;
          });
          
          timetable[i].Hall_ID = hallsAvailable[0].Hall_ID;

          while (
            searchConflictsLecturer(timetable, timetable[i]) || 
            searchConflictsGroup(timetable, timetable[i]) ||
            searchConflictsHall(timetable, timetable[i]) ||
            endTimeConficts(timetable[i])
          ) {
            for (let h = 1; h < hallsAvailable.length; h++) {
              for (let d = 0; d < daysAvailable.length; d++) {
                for (let t = 0; t < times.length; t++) {
                  let time = times[t];
      
                  timetable[i].Start_Time = time.Start_Time;
      
                  timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), module)
      
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

          if (!searchConflictsLecturer(timetable, timetable[i]))
            console.log('no conflicts lecturer')

          if (!searchConflictsGroup(timetable, timetable[i])) {
            console.log('no conflicts group')
          }

          if (!searchConflictsHall(timetable, timetable[i])) {
            console.log('no conflicts hall')
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
      (
        ( timetable[i].Module_ID === module.Module_ID && timetable[i].id !== module.id) ||
        ( timetable[i].Subject_Type_ID !== 2 || module.Subject_Type_ID !== 2 )
      )
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
      console.log(timetable[i].Module_ID, ' -__- ', module.Module_ID)
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

const changeConflictsGroup = (timetable, module, days, times, lecturers) => {
  for (let i = 0; i < timetable.length; i++) {
    if (timetable[i].id === module.id) continue;

    const lecturerDay = lecturers.filter(l => l.Lecturer_ID === timetable[i].Lecturer_ID);
    const daysAvailable = days.filter(d => lecturerDays(lecturerDay, d.Day_ID));

    while (
      searchConflictsLecturer(timetable, timetable[i]) || 
      searchConflictsGroup(timetable, timetable[i]) ||
      endTimeConficts(timetable[i])
      ) {
      for (let d = 0; d < daysAvailable.length; d++) {
        for (let t = 0; t < times.length; t++) {
          let time = times[t];

          timetable[i].Start_Time = time.Start_Time;

          timetable[i].End_Time = getEndTime(+time.Start_Time.slice(0, 2), timetable[i])

          if (
            !searchConflictsGroup(timetable, timetable[i]) && 
            !searchConflictsLecturer(timetable, timetable[i]) &&
            !endTimeConficts(timetable[i])
          )
            break;
        }

        if (
          !searchConflictsGroup(timetable, timetable[i]) && 
          !searchConflictsLecturer(timetable, timetable[i]) &&
          !endTimeConficts(timetable[i])
        )
          break;

        let day = daysAvailable[d];

        timetable[i].Day_ID = day.Day_ID;
      }
    }
    console.log(timetable[i].Module_ID, ' -_- ', module.Module_ID)
  }
  console.log('out')
}