const { getRandomItem } = require('./getRandomItem');
const { feasible } = require('./feasible');
const isOverLapping = require('./isOverLapping');

// getNeighbors function to create new timetable randomly
module.exports.getNeighbors = (candidateTimetable, modules, groups, halls, days, times) => {
    let neighbors = [];
    var timetable = JSON.parse(JSON.stringify(candidateTimetable));

    
    while (neighbors.length < 10) {

        timetable.forEach((e, i) => {
            modules.forEach(m => {
                groups.forEach(g => {
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

                if (e.Module_ID === m.Module_ID) {
                    // Loop for check if there is conflict 
                    // if there conflict assign new day and time
                    for (let j = 0; j < timetable.length; j++) {
                        if (i === j)
                            continue;
                            
                        if (timetable[i].Start_Time && timetable[j].Start_Time) {
                            if (
                                isOverLapping(timetable[i], timetable[j]) 
                                && timetable[i].Day_ID === timetable[j].Day_ID
                            ) {
                                if (
                                    timetable[i].Hall_ID === timetable[j].Hall_ID 
                                    || timetable[i].Lecturer_ID === timetable[j].Lecturer_ID 
                                    ||  timetable[i].Group_ID === timetable[j].Group_ID
                                ) {

                                    const day = getRandomItem(days);
                                    e.Day_ID = day.Day_ID;

                                for(let k=0;k<times.length;k++){    


                                    const time = times[k];
                                    e.Start_Time = time.Start_Time;

                                    if (m.Subject_Type_ID === 1) {
                                        const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Theoretical < 10 ? `0${+e.Start_Time.slice(0,2) + m.Credit_Theoretical}` : +e.Start_Time.slice(0,2) + m.Credit_Theoretical}:00:00`;
                                        e.End_Time = endTime;
                                    }
                                    else if (m.Subject_Type_ID === 2) {
                                        const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Practical < 10 ? `0${+e.Start_Time.slice(0,2) + m.Credit_Practical}` : +e.Start_Time.slice(0,2) + m.Credit_Practical}:00:00`;
                                        e.End_Time = endTime;
                                    }
                                    else if (m.Subject_Type_ID === 3) {
                                        const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Tutorial < 10 ? `0${+e.Start_Time.slice(0,2) + m.Credit_Tutorial}` : +e.Start_Time.slice(0,2) + m.Credit_Tutorial}:00:00`;;
                                        e.End_Time = endTime;
                                    }

                                    if(!isOverLapping(timetable[i], timetable[j])) {
                                        
                                        break;
                                    }

                                }
                                }
                            }
                        }
                    }
                }
            })
        })

        // don't add the neighbor if it has conflicts
        if(feasible(timetable)){
            neighbors.push(JSON.parse(JSON.stringify(timetable)));
        }   
        
    }
    
    return neighbors;
}