const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// feasible function check for hard constraints in generated timetable
module.exports.feasible = (neighborhood, lecturers, modules) => {
    const timetable = JSON.parse(JSON.stringify(neighborhood))

    for (let i = 0; i < timetable.length; i++) {
        const moduleOne = modules.filter(m => m.Module_ID === timetable[i].Module_ID)

        // To check if the day its available to lecturer or not
        const lecturerDay = lecturers.filter(l => l.Lecturer_ID === timetable[i].Lecturer_ID);
        if (!lecturerDays(lecturerDay, timetable[i].Day_ID))
            return false;

        //if The end time is out of limit it's not acceptable
        if(timetable[i].End_Time > "17:00:00"){
            return false;
        }

        for (let j = i + 1; j < timetable.length; j++) {
            const moduleTwo = modules.filter(m => m.Module_ID === timetable[j].Module_ID)

            // if the same group is assigned to two lecturs in same day at same time it's a conflect
            // if (
            //     (moduleOne[0].Subject_Type_ID === 2 && moduleTwo[0].Subject_Type_ID === 2)
            //     && timetable[i].Group_ID === timetable[j].Group_ID 
            //     && timetable[i].Day_ID === timetable[j].Day_ID
            //     && timetable[i].Lecturer_ID !== timetable[j].Lecturer_ID
            //     && timetable[i].Hall_ID !== timetable[j].Hall_ID 
            //     && isOverLapping(timetable[i], timetable[j])
            // ) {
            //     // console.log(moduleOne[0].Module_ID, ": ", moduleTwo[0].Module_ID)
            //     // console.log(timetable[i].Module_ID, ": ", timetable[j].Module_ID)
            //     continue;
            // }
            
            
            // if the same lecturer is assigned to different subjects in same day at same time it's a conflect
            if (
                timetable[i].Lecturer_ID === timetable[j].Lecturer_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID 
                && isOverLapping(timetable[i], timetable[j])
            )
                return false;

            // if the same group is assigned to two lecturs in same day at same time it's a conflect
            if (
                //(moduleOne[0].Subject_Type_ID !== 2 || moduleTwo[0].Subject_Type_ID !== 2)
                timetable[i].Group_ID === timetable[j].Group_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID 
                && isOverLapping(timetable[i], timetable[j])
            ) {
                // if (moduleOne[0].Subject_Type_ID === 2 && moduleTwo[0].Subject_Type_ID === 2)
                //     console.log(moduleOne[0].Module_ID, ": ", moduleTwo[0].Module_ID)
                // console.log(timetable[i].Module_ID, ": ", timetable[j].Module_ID)
                return false;
            }

            // if the same hall is assigned to two groups in same day at same time it's a conflect
            if (
                timetable[i].Hall_ID === timetable[j].Hall_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID
                && isOverLapping(timetable[i], timetable[j])
            ) {
                return false;
            }
        }
    }
    
    return true;
}