const { lecturerAvailabilty } = require('./fitness functions/lecturerAvailabilty');
const { timeGap } = require('./fitness functions/timeGap')

module.exports.fitness = (timeTable, modules, lecturers, groups, days) => {
    let fitness = 0;

    fitness += lecturerAvailabilty(timeTable, lecturers);
    fitness += timeGap(timeTable, groups, days)
    
    return fitness


}