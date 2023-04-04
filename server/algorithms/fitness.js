const { lecturerAvailabilty } = require('./fitness functions/lecturerAvailabilty');

module.exports.fitness = (timetable, modules, lecturers, groups) => {
    let fitness = 0;

    fitness += lecturerAvailabilty(timetable, lecturers);

    return fitness;
}