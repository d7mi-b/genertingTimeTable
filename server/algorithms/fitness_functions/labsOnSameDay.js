module.exports.labsOnSameDay = (timetable, modules, groups, days) => {

    let score = 0;
    
    if(timetable) {

        // check each group timetable
        for (let i = 0; i < groups.length; i++) {
            const groupModules = timetable.filter(t => t.Group_ID === groups[i].Group_ID);

            for (let j = 0; j < days.length; j++) {
                const modulesOnDay = groupModules.filter(m => m.Day_ID === days[j].Day_ID);

                if (modulesOnDay.every(e => e.Subject_Type_ID === 2)) {
                    score = score + 1;
                }
            }
        }
    }
    
    return score;
}