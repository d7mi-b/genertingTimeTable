const db = require('../DB');

module.exports.generatingTimetable = async (req, res) => {
    try {

        const [ modules ] = await db.query(`
            select Module_ID, module.Semester_ID, module.Subject_ID, Lecturer_ID, 
            module.Department_ID, Hall_Type_ID, Subject_Type_ID, Credit_Theoretical, Credit_Practical, Credit_Tutorial 
            from module join subjects on subjects.Subject_ID = module.Subject_ID;
        `);

        const [ groups ] = await db.query(`
            select Group_ID, Group_Count, batches.Semester_ID, batches.Department_ID from batch_groups 
            join batches on batch_groups.Batch_ID = batches.Batch_ID;
        `)

        const [ halls ] = await db.query(`
            select Hall_ID, Hall_Type_ID, Hall_Capacity from halls
        `);

        const [ days ] = await db.query(`
            select * from day
        `);

        const [ times ] = await db.query(`
            select * from time
        `);

        let bestTimetable = 0;
        let candidateTimetable = await initialTimetable(modules, groups, halls, days, times);
        let tabuList = [];

        let i = 0;

        while (i < 2) {
            const neighborhood = getNeighbors(candidateTimetable, modules, groups, halls, days, times);
            candidateTimetable = neighborhood[0];
            i++;
        }

        return res.status(200).json(candidateTimetable);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

function getRandomItem(arr) {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

const initialTimetable = (modules, groups, halls, days, times,) => {
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
    timetable.forEach(e => {
        modules.forEach(m => {
            if (e.Module_ID === m.Module_ID) {

                const time = getRandomItem(times);
                e.Start_Time = time.Start_Time;

                if (m.Subject_Type_ID === 1) {
                    const endTime = (times[time.Start_Time, ((time.Time_ID - 1) + m.Credit_Theoretical) - 1] && times[time.Start_Time, ((time.Time_ID - 1) + m.Credit_Theoretical) - 1].End_Time);
                    e.End_Time = endTime;
                }
                else if (m.Subject_Type_ID === 2) {
                    const endTime = (times[time.Start_Time, ((time.Time_ID - 1) + m.Credit_Practical) - 1] && times[time.Start_Time, ((time.Time_ID - 1) + m.Credit_Practical) - 1].End_Time);
                    e.End_Time = endTime;
                }
                else if (m.Subject_Type_ID === 3) {
                    const endTime = (times[time.Start_Time, ((time.Time_ID - 1) + m.Credit_Tutorial) - 1] && times[time.Start_Time, ((time.Time_ID - 1) + m.Credit_Tutorial) - 1].End_Time);
                    e.End_Time = endTime;
                }

                if (e.Start_Time === '3') {
                    e.End_Time = '5';
                }
            }
        })
    })

    return timetable;
}

const getNeighbors = (candidateTimetable, modules, groups, halls, days, times) => {
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
                        const endTime = (times[newTime.Start_Time, ((newTime.Time_ID - 1) + m.Credit_Theoretical) - 1] && times[newTime.Start_Time, ((newTime.Time_ID - 1) + m.Credit_Theoretical) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    else if (m.Subject_Type_ID === 2) {
                        const endTime = (times[newTime.Start_Time, ((newTime.Time_ID - 1) + m.Credit_Practical) - 1] && times[newTime.Start_Time, ((newTime.Time_ID - 1) + m.Credit_Practical) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    else if (m.Subject_Type_ID === 3) {
                        const endTime = (times[newTime.Start_Time, ((newTime.Time_ID - 1) + m.Credit_Tutorial) - 1] && times[newTime.Start_Time, ((newTime.Time_ID - 1) + m.Credit_Tutorial) - 1].End_Time);
                        e.End_Time = endTime;
                    }
                    
                    if (e.Start_Time === '3') {
                        e.End_Time = '5';
                    }

                })
            })

        })

        neighbors.push(JSON.parse(JSON.stringify(timetable)));
    }

    return neighbors;
}