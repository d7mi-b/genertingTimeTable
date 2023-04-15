module.exports.groupTime1 = (timetable, modules, groups) => {
  // This function check if the morning groups is taking their lectures ing the morning and the evening groups is taking their lectures in the evening

  let score = 0;

  if (timetable) {
    // check each group timetable
    groups.forEach((group) => {
      // Obtain each group timetable
      let groupTimetable = [];
      modules.forEach((module) => {
        timetable
          .filter(
            (table) =>
              table.Group_ID === group.Group_ID && // check if table is for specific group
              table.Module_ID === module.Module_ID
          )
          .forEach((one) => {
            groupTimetable.push(one);
          });
      });

      // check if each module is in the preferred time range
      if (group.Batch_Type_ID === 1 || group.Batch_Type_ID === 3) {
        for (let i = 0; i < groupTimetable.length; i++) {
          score += checkTime(groupTimetable[i], "08:00:00", "13:00:00");
        }
      } else if (group.Batch_Type_ID === 2) {
        for (let i = 0; i < groupTimetable.length; i++) {
          score += checkTime(groupTimetable[i], "12:00:00", "17:00:00");
        }
      }
    });
  }

  return score;
};

// This function is used to reduce the code size and stop redundancy
function checkTime(table, startT, endT) {
  if (
    table.Start_Time >= startT &&
    table.Start_Time <= endT &&
    table.End_Time <= endT
  ) {
    return 10;
  }
}
