const isOverLapping = require("./isOverLapping");

// feasible function check for hard constraints in generated timetable
module.exports.feasible = (neighborhood) => {
    const timetable = JSON.parse(JSON.stringify(neighborhood))

    for (let i = 0; i < timetable.length; i++) {
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
    
    return true;
}