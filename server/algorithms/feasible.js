const isOverLapping = require("./isOverLapping");
const { lecturerDays } = require("./lecturerDays");

// feasible function check for hard constraints in generated timetable
module.exports.feasible = (neighborhood, lecturers) => {
    const timetable = JSON.parse(JSON.stringify(neighborhood))

    for (let i = 0; i < timetable.length; i++) {
        //if The end time is out of limit it's not acceptable
        if(timetable[i].End_Time > "17:00:00"){
            return false;
        }
        for (let j = i + 1; j < timetable.length; j++) {

            // if the same lecturer is assigned to different subjects in same day at same time it's a conflect
            if (
                timetable[i].Lecturer_ID === timetable[j].Lecturer_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID 
                && isOverLapping(timetable[i], timetable[j])
            )
                return false;

            // if the same group is assigned to two lecturs in same day at same time it's a conflect
            if (
                timetable[i].Group_ID === timetable[j].Group_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID 
                && isOverLapping(timetable[i], timetable[j])
            )
                return false;

            // if the same hall is assigned to two groups in same day at same time it's a conflect
            if (
                timetable[i].Hall_ID === timetable[j].Hall_ID 
                && timetable[i].Day_ID === timetable[j].Day_ID
                && isOverLapping(timetable[i], timetable[j])
            )
                return false;
        }
    }

    if (lecturerDays(timetable, lecturers))
        return true;
    
    return false;
}