const { lecturerAvailabilty } = require('./fitness_functions/lecturerAvailabilty');
const { timeGap } = require('./fitness_functions/timeGap');
const { labsOnSameDay } = require('./fitness_functions/labsOnSameDay');

module.exports.fitness = (timeTable, modules, lecturers, groups, days) => {
    let fitness = 0;

    fitness += lecturerAvailabilty(timeTable, lecturers);
    fitness += timeGap(timeTable, groups, days);
    fitness += labsOnSameDay(timeTable, modules, groups);
    return fitness


}