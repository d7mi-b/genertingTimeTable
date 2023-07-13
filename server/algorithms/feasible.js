const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// feasible function check for hard constraints in generated timetable
module.exports.feasible = (neighborhood, lecturers) => {
    const timetable = JSON.parse(JSON.stringify(neighborhood))

    let conflicts = 0;

    for (let i = 0; i < timetable.length; i++) {

        // To check if the day its available to lecturer or not
        const lecturerDay = lecturers.filter(l => l.Lecturer_ID === timetable[i].Lecturer_ID);
        if (!lecturerDays(lecturerDay, timetable[i].Day_ID))
            conflicts = conflicts + 1;

        //if The end time is out of limit it's not acceptable
        if(timetable[i].End_Time > "18:00:00"){
            conflicts = conflicts + 1;
        }

        for (let j = i + 1; j < timetable.length; j++) {
            
            // if the same lecturer is assigned to different subjects in same day at same time it's a conflect
            if (
                timetable[i].Lecturer_ID === timetable[j].Lecturer_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID 
                && isOverLapping(timetable[i], timetable[j])
            ){
                // if((timetable[i].Subject_Type_ID === 2 || timetable[j].Subject_Type_ID === 2)) {
                    // console.log('Module 1: ', timetable[i].Module_ID, ' - ', timetable[i].Lecturer_ID, ", Module 2:", timetable[j].Module_ID, ' - ', timetable[j].Lecturer_ID)
                // }
                conflicts = conflicts + 1;
            }

            // if the same group is assigned to two lecturs in same day at same time it's a conflect
            if (
                (timetable[i].Subject_Type_ID !== 2 || timetable[j].Subject_Type_ID !== 2)
                && timetable[i].Group_ID === timetable[j].Group_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID 
                && isOverLapping(timetable[i], timetable[j])
            ){
                // if (timetable[i].Group_ID === 3 || timetable[j].Group_ID === 3)
                //     console.log('Group: ', timetable[i].Group_ID, ': Modules: ', timetable[i].Module_ID, ' - ', timetable[j].Module_ID)
                conflicts = conflicts + 1;
            }

            // if the same hall is assigned to two groups in same day at same time it's a conflect
            if (
                timetable[i].Hall_ID === timetable[j].Hall_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID
                && isOverLapping(timetable[i], timetable[j])
            ){
                // if (timetable[i].Subject_Type_ID === 2 && timetable[j].Subject_Type_ID === 2)
                //     console.log('Group: ', timetable[i].Group_ID, ' - Hall: ', timetable[i].Hall_ID, ', Group: ', timetable[j].Group_ID, ' - Hall: ', timetable[j].Hall_ID)
                conflicts = conflicts + 1;
            }

        }
    }
    
    return conflicts;
}