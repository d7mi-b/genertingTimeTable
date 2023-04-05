const { timeGap } = require('./timeGap')

module.exports.fitness = (timeTable, modules, groups, halls, days, times) => {
    let fitness = 0;
    fitness += timeGap(timeTable, groups, days)
    
    return fitness

}