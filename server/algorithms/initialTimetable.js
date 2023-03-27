const { feasible } = require('./feasible');
const { getRandomItem } = require('./getRandomItem');
const isOverLapping = require('./isOverLapping');

// initialTimetable function to generate initial timetable
module.exports.initialTimetable = (modules, groups, halls, days, times,) => {;
    let i = 0;

    while (i < 1000) {
        let timetable = generate(modules, groups, halls, days, times);

        if (feasible(timetable)) {
            return timetable;
        }

        i++;
    }
    
    
}

const generate = (modules, groups, halls, days, times) => {
    let timetable = [];
    // Assign modules, lecturer and groubs to timetable.
    groups.forEach(g => {
        modules.forEach(m => {
            if (g.Semester_ID === m.Semester_ID && g.Department_ID === m.Department_ID) {
                timetable.push({
                    Module_ID: m.Module_ID,
                    Lecturer_ID: m.Lecturer_ID,
                    Group_ID: g.Group_ID
                })
            }
        })
    })

    // Assign Hall to timetable
    timetable.forEach(e => {
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

    // Assign Days to timeTable
    timetable.forEach(e => {
        const day = getRandomItem(days);

        e.Day_ID = day.Day_ID;
    })

    // Assign Times to timetable
    timetable.forEach((e, i) => {
        modules.forEach(m => {
            if (e.Module_ID === m.Module_ID) {

                const time = getRandomItem(times);
                e.Start_Time = time.Start_Time;

                if (m.Subject_Type_ID === 1) {
                    const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Theoretical}:00:00`;
                    e.End_Time = endTime;
                }
                else if (m.Subject_Type_ID === 2) {
                    const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Practical}:00:00`;
                    e.End_Time = endTime;
                }
                else if (m.Subject_Type_ID === 3) {
                    const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Tutorial}:00:00`;
                    e.End_Time = endTime;
                }

                // if (e.Start_Time === '15:00:00') {
                //     e.End_Time = '17:00:00';
                // }

                for (let j = 0; j < timetable.length; j++) {
                    if (i === j)
                        continue;
                        
                    if (timetable[i].Start_Time && timetable[j].Start_Time) {
                        if (isOverLapping(timetable[i], timetable[j]) && timetable[i].Day_ID === timetable[j].Day_ID) {
                            if (timetable[i].Hall_ID === timetable[j].Hall_ID || timetable[i].Lecturer_ID === timetable[j].Lecturer_ID ||  timetable[i].Group_ID === timetable[j].Group_ID) {

                                const day = getRandomItem(days);
                                e.Day_ID = day.Day_ID;

                                const time = getRandomItem(times);
                                e.Start_Time = time.Start_Time;

                                if (m.Subject_Type_ID === 1) {
                                    const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Theoretical}:00:00`;
                                    e.End_Time = endTime;
                                }
                                else if (m.Subject_Type_ID === 2) {
                                    const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Practical}:00:00`;
                                    e.End_Time = endTime;
                                }
                                else if (m.Subject_Type_ID === 3) {
                                    const endTime = `${+e.Start_Time.slice(0,2) + m.Credit_Tutorial}:00:00`;
                                    e.End_Time = endTime;
                                }

                                // if (e.Start_Time === '15:00:00') {
                                //     e.End_Time = '17:00:00';
                                // }
                            }
                        }
                    }
                }
                
            }
        })
    })

    return timetable;
}