module.exports.labsOnSameDay = (timetable, modules, groups, days) => {

    let score = 0;
    
    if(timetable) {

        // check each group timetable
        for (let i = 0; i < groups.length; i++) {
            const groupLabModules = timetable.filter(t => t.Group_ID === groups[i].Group_ID && t.Subject_Type_ID === 2);

            for (let j = 0; j < days.length; j++) {
                const labsOnDay = groupLabModules.filter(m => m.Day_ID === days[j].Day_ID);

                if (labsOnDay.length === 9) {
                    score = score + 2;
                } else if (labsOnDay.length === 6) {
                    score = score + 1;
                }
            }
        }

        // groups.forEach(group => {
        //     let groupModule = [];

        //     modules.forEach(module => {
        //         timetable.filter(
        //             table => table.Group_ID === group.Group_ID &&   // check if table is for specific group
        //             table.Module_ID === module.Module_ID &&         // check if it's same module
        //             module.Subject_Type_ID === 2                    // check if it's a lab subject
        //         ).forEach(one => {
        //             groupModule.push(one);
        //         })
        //     });

            // for (let i = 0; i < days.length; i++) {
            //     const labsOnDay = groupModule.filter(m => m.Day_ID === days[i].Day_ID);

            //     if (labsOnDay === 9 || labsOnDay === 4) {
            //         score = score + 1;
            //     }
            // }
    

        //     // Check if two lab subjects in the same day And give score if true
        //     if(groupModule.length > 1){
        //         for (let i=0; i < groupModule.length; i++){
        //             for(let j = i + 1; j< groupModule.length; j++){
        //                 if(groupModule[i].Day_ID === groupModule[j].Day_ID){
        //                 score+=1;
        //             }
        //         }
        //         }
        //     }
    
        // });
    }
    
    return score;
    }
    
    