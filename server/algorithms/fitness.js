const db = require("../DB");
const { lecturerAvailabilty } = require("./fitness_functions/lecturerAvailabilty");
const { timeGap } = require("./fitness_functions/timeGap");
const { labsOnSameDay } = require("./fitness_functions/labsOnSameDay");
const { dayOFF } = require("./fitness_functions/dayOFF");
const { lecturesOnDay } = require("./fitness_functions/lecturesOnDay");
const { groupsTime } = require("./fitness_functions/groupsTime");

module.exports.fitness = (timetable, modules, lecturers, groups, days, weights, stateWeights) => {

  if (stateWeights) {
    weights = defaultWeights;
  }

  let fitness = 0;

  fitness += lecturerAvailabilty(timetable, lecturers) * weights.lecturerAvailabilty;
  fitness += timeGap(timetable, groups, days) * weights.timeGap;
  fitness += labsOnSameDay(timetable, modules, groups) * weights.labsOnSameDay;
  fitness += dayOFF(timetable, groups) * weights.dayOFF;
  fitness += lecturesOnDay(timetable, groups, days) * weights.lecturesOnDay;
  fitness += groupsTime(timetable, modules, groups) * weights.groupsTimes;

  return fitness;
};

const defaultWeights = {
  lecturerAvailabilty: 1000,
  timeGap: 1000,
  labsOnSameDay: 10000,
  dayOFF: 100,
  lecturesOnDay: 100,
  groupsTimes: 10
}