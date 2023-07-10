const getSeconds = require("./getSeconds");
//This function check is to time sets are overlapping
function isNotOccupied(timetable, module) {
  for (let i = 0; i < timetable.length; i++) {
    const existingModule = timetable[i];
    if (!(existingModule.Start_Time && existingModule.End_Time)) {
      existingModule.Start_Time = "00:00:00";
      existingModule.End_Time = "00:00:00";
    }
    if (existingModule.Day_ID === module.day) {
      if (
        existingModule.Module_ID === module.module ||
        existingModule.Group_ID === module.group
      ) {
        const StartA = getSeconds(existingModule.Start_Time);
        const EndA = getSeconds(existingModule.End_Time);
        const StartB = getSeconds(module.start);
        const EndB = getSeconds(module.end);
        if (!(EndA <= StartB || StartA >= EndB)) return false;
      }
    }
  }
  return true;
}

module.exports = isNotOccupied;
