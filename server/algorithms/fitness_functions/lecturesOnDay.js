module.exports.lecturesOnDay = (timetable, groups, days, system) => {
    let score = 0;

    if (timetable) {
        for (let i = 0; i < groups.length; i++) {
            const groupModules = timetable.filter(t => t.Group_ID === groups[i].Group_ID);

            for (let j = 0; j < days.length; j++) {
                const modulesOnDay = groupModules.filter(m => m.Day_ID === days[j].Day_ID);

                if (modulesOnDay.length < system.Maximum_Lecturers_Student + 1 && modulesOnDay.length > system.Minimum_Lecturers_Student - 1) {
                    score = score + 1;
                }
            }
        }
    }

    return score;
}