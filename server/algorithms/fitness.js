const { lecturerAvailabilty } = require('./fitness_functions/lecturerAvailabilty');
const { timeGap } = require('./fitness_functions/timeGap');
const { labsOnSameDay } = require('./fitness_functions/labsOnSameDay');
const { dayOFF } = require('./fitness_functions/dayOFF');

module.exports.fitness = (timetable, modules, lecturers, groups, days) => {
    let fitness = 0;

    fitness += lecturerAvailabilty(timetable, lecturers);
    fitness += timeGap(timetable, groups, days);
    fitness += labsOnSameDay(timetable, modules, groups);
    fitness += dayOFF(timetable, groups);

    return fitness


}