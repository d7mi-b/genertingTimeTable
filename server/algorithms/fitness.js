const {
  lecturerAvailabilty,
} = require("./fitness_functions/lecturerAvailabilty");
const { timeGap } = require("./fitness_functions/timeGap");
const { labsOnSameDay } = require("./fitness_functions/labsOnSameDay");
const { dayOFF } = require("./fitness_functions/dayOFF");
const { lecturesOnDay } = require("./fitness_functions/lecturesOnDay");
const { groupsTime } = require("./fitness_functions/groupsTime");

module.exports.fitness = (timetable, modules, lecturers, groups, days) => {
  let fitness = 0;

  fitness += lecturerAvailabilty(timetable, lecturers);
  fitness += timeGap(timetable, groups, days);
  fitness += labsOnSameDay(timetable, modules, groups);
  fitness += dayOFF(timetable, groups);
  fitness += lecturesOnDay(timetable, groups, days);
  fitness += groupsTime(timetable, modules, groups);

  return fitness;
};
