const { getRandomItem } = require('./getRandomItem');
const { feasible } = require('./feasible');

// getNeighbors function to create new timetable randomly
module.exports.getNeighbors = (candidateTimetable, modules, groups, halls, days, times) => {
    let neighbors = [];
    var timetable = JSON.parse(JSON.stringify(candidateTimetable));

    while (neighbors.length < 1) {
        timetable.forEach(e => {
            const newDay = getRandomItem(days);
            e.Day_ID = newDay.Day_ID;

            modules.forEach(m => {
                if (e.Module_ID === m.Module_ID) {
    
                    const time = getRandomItem(times);
                    e.Start_Time = time.Start_Time;
    
                    if (m.Subject_Type_ID === 1) {
                        const endTime = (times[((time.Time_ID - 1) + m.Credit_Theoretical) - 1] && times[((time.Time_ID - 1) + m.Credit_Theoretical) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    else if (m.Subject_Type_ID === 2) {
                        const endTime = (times[((time.Time_ID - 1) + m.Credit_Practical) - 1] && times[((time.Time_ID - 1) + m.Credit_Practical) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    else if (m.Subject_Type_ID === 3) {
                        const endTime = (times[((time.Time_ID - 1) + m.Credit_Tutorial)] && times[((time.Time_ID - 1) + m.Credit_Tutorial)].End_Time);
                        e.End_Time = endTime;
                    }
    
                    if (e.Start_Time === '15:00:00') {
                        e.End_Time = '17:00:00';
                    }
                }
            })

            groups.forEach(g => {
                modules.forEach(async m => {
                    if (e.Group_ID === g.Group_ID && e.Module_ID === m.Module_ID) {
                        const hallsAvailable = halls.filter(h => {
                            return h.Hall_Capacity >= g.Group_Count && h.Hall_Type_ID === m.Hall_Type_ID;
                        })
    
                        const hall = getRandomItem(hallsAvailable);
    
                        if (hall) {
                            e.Hall_ID = hall.Hall_ID;
                        }
                    }
                })
            })

        })

        // don't add the neighbor if it has conflicts
        if(feasible(timetable)){
            neighbors.push(JSON.parse(JSON.stringify(timetable)));
        }         
    }
    console.log('done from getNeighbors')

    return neighbors;
}