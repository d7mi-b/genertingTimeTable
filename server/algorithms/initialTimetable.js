const { feasible } = require("./feasible");
const { getRandomItem } = require("./getRandomItem");
const isNotOccupied = require("./isNotOccupied");

module.exports.initialTimetable = (
  modules,
  groups,
  halls,
  days,
  times,
  lecturers
) => {
  let timetable;
  let i = 0;
  while (i < 100) {
    timetable = generate(modules, groups, halls, days, times, lecturers);
    if (feasible(timetable, lecturers, modules)) {
      return timetable;
    }
    i++;
  }
};
// this function get the suitable time credit for each module
function getCredit(module) {
  if (module.Subject_Type_ID === 1) {
    const credit = module.Credit_Theoretical;
    return credit;
  } else if (module.Subject_Type_ID === 2) {
    const credit = module.Credit_Practical;
    return credit;
  } else if (module.Subject_Type_ID === 3) {
    const credit = module.Credit_Tutorial;
    return credit;
  }
}
// this function calculate the end time for a module
function calculateEndTime(startTime, credit) {
  let endTime;
  const endHour = parseInt(startTime.slice(0, 2)) + credit;
  endTime = `${endHour}${startTime.slice(2)}`;
  return endTime;
}
const generate = (modules, groups, halls, days, times, lecturers) => {
  let timetable = [];
  //* initiate timetable = groups + module + lecturers

  // Sort the arrays by Semester_ID and Department_ID
  groups.sort((a, b) => {
    if (a.Semester_ID !== b.Semester_ID) {
      return a.Semester_ID - b.Semester_ID;
    } else {
      return a.Department_ID - b.Department_ID;
    }
  });

  modules.sort((a, b) => {
    if (a.Semester_ID !== b.Semester_ID) {
      return a.Semester_ID - b.Semester_ID;
    } else {
      return a.Department_ID - b.Department_ID;
    }
  });

  // Initialize the pointers
  let i = 0;
  let j = 0;

  // Iterate over the arrays using the two-pointer approach
  while (i < groups.length && j < modules.length) {
    if (
      groups[i].Semester_ID === modules[j].Semester_ID &&
      groups[i].Department_ID === modules[j].Department_ID
    ) {
      if (modules[j].Subject_Type_ID === 2) {
        const subGroupsName = ["a", "b", "c"];
        for (let k = 0; k < groups[i].Group_Count / 25; k++) {
          timetable.push({
            Module_ID: modules[j].Module_ID,
            Lecturer_ID: modules[j].Lecturer_ID,
            Group_ID: groups[i].Group_ID.toString() + subGroupsName[k],
            Subject_Type_ID: modules[j].Subject_Type_ID,
          });
        }
        j++;
      } else {
        timetable.push({
          Module_ID: modules[j].Module_ID,
          Lecturer_ID: modules[j].Lecturer_ID,
          Group_ID: groups[i].Group_ID.toString(),
          Subject_Type_ID: modules[j].Subject_Type_ID,
        });
        j++;
      }
    } else if (
      groups[i].Semester_ID < modules[j].Semester_ID ||
      (groups[i].Semester_ID === modules[j].Semester_ID &&
        groups[i].Department_ID < modules[j].Department_ID)
    ) {
      i++;
    } else {
      j++;
    }
  }

  //* assign halls to each module in timetable
  // Create a map to store the group objects by ID
  const groupMap = new Map(groups.map((g) => [g.Group_ID, g]));

  // Create a map to store the module objects by ID
  const moduleMap = new Map(modules.map((m) => [m.Module_ID, m]));

  // Iterate over the timetable and assign halls to each element
  timetable.forEach((e) => {
    const group = groupMap.get(parseInt(e.Group_ID));
    const module = moduleMap.get(e.Module_ID);
    if (group && module) {
      const hallsAvailable = halls.filter((h) => {
        return (
          h.Hall_Capacity >= group.Group_Count &&
          h.Hall_Type_ID === module.Hall_Type_ID
        );
      });
      const hall = getRandomItem(hallsAvailable);
      if (hall) {
        e.Hall_ID = hall.Hall_ID;
      }
    }
  });

  //* assign days to each module in timetable
  // Pre-process the availability of each lecturer for each day of the week
  const lecturerAvailability = lecturers.reduce((acc, l) => {
    acc[l.Lecturer_ID] = {
      1: l.Sunday,
      2: l.Monday,
      3: l.Tuesday,
      4: l.Wednesday,
      5: l.Thursday,
    };
    return acc;
  }, {});

  // Iterate over the timetable and assign days to each element
  timetable.forEach((e) => {
    let day = getRandomItem(days);

    // If the day not available to lecturer then change the day
    while (!lecturerAvailability[e.Lecturer_ID][day.Day_ID]) {
      day = getRandomItem(days);
    }

    e.Day_ID = day.Day_ID;
  });

  //* assign times to each module in timetable
  //  Initialize Map of unavailable times for each day of the week
  const unavailableTimes = new Map(days.map((d) => [d.Day_ID, new Map()]));

  timetable.forEach((e) => {
    modules.forEach((m) => {
      if (e.Module_ID === m.Module_ID) {
        for (let time of times) {
          let occupy = {
            module: e.Module_ID,
            group: parseInt(e.Group_ID),
            hall: e.Hall_ID,
            SubjectType: e.Subject_Type_ID,
            day: e.Day_ID,
            start: time.Start_Time,
            end: calculateEndTime(time.Start_Time, getCredit(m)),
          };
          //? check if the new time slot is already taken or it is overlapping with another time slot
          if (!unavailableTimes.get(e.Day_ID).has(JSON.stringify(occupy))) {
            //* when there is not time conflicts assign the start time and the end time to the module
            if (isNotOccupied(timetable, occupy)) {
              e.Start_Time = occupy.start;
              e.End_Time = occupy.end;
              unavailableTimes
                .get(e.Day_ID)
                .set(JSON.stringify(occupy), occupy);
              break;
            }
          }
        }
      }
    });
  });

  return timetable;
};
