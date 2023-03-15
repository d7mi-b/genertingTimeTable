const { getRandomItem } = require('./getRandomItem')

// initialTimetable function to generate initial timetable
module.exports.initialTimetable = (modules, groups, halls, days, times,) => {
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
                    const endTime = (times[((time.Time_ID - 1) + m.Credit_Theoretical) - 1] && times[((time.Time_ID - 1) + m.Credit_Theoretical) - 1].End_Time);
                    e.End_Time = endTime;
                }
                else if (m.Subject_Type_ID === 2) {
                    const endTime = (times[((time.Time_ID - 1) + m.Credit_Practical) - 1] && times[((time.Time_ID - 1) + m.Credit_Practical) - 1].End_Time);
                    e.End_Time = endTime;
                }
                else if (m.Subject_Type_ID === 3) {
                    const endTime = (times[((time.Time_ID - 1) + m.Credit_Tutorial) - 1] && times[((time.Time_ID - 1) + m.Credit_Tutorial) - 1].End_Time);
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