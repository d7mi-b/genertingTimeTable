const { getRandomItem } = require('./getRandomItem');
const { feasible } = require('./feasible');

// getNeighbors function to create new timetable randomly
module.exports.getNeighbors = (candidateTimetable, modules, groups, halls, days, times) => {
    let neighbors = [];
    var timetable = JSON.parse(JSON.stringify(candidateTimetable));

    while (neighbors.length < 2) {
        timetable.forEach(e => {
            const newDay = getRandomItem(days);
            e.Day_ID = newDay.Day_ID;

            const newTime = getRandomItem(times);
            e.Start_Time = newTime.Start_Time;

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

                    if (m.Subject_Type_ID === 1) {
                        const endTime = (times[((newTime.Time_ID - 1) + m.Credit_Theoretical) - 1] && times[((newTime.Time_ID - 1) + m.Credit_Theoretical) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    else if (m.Subject_Type_ID === 2) {
                        const endTime = (times[((newTime.Time_ID - 1) + m.Credit_Practical) - 1] && times[((newTime.Time_ID - 1) + m.Credit_Practical) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    else if (m.Subject_Type_ID === 3) {
                        const endTime = (times[((newTime.Time_ID - 1) + m.Credit_Tutorial) - 1] && times[((newTime.Time_ID - 1) + m.Credit_Tutorial) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    
                    if (e.Start_Time === '15') {
                        e.End_Time = '17';
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