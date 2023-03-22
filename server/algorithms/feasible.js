
// feasible function check for hard constraints in generated timetable
module.exports.feasible = (timetable) => {
   
    for(var i = 0; i < timetable.length; i++){
        console.log(i)
        for(var j = i+1 ; j < timetable.length; j++){
            
            // if the same lecturer is assigned to different subjects in same day at same time it's a conflect
            if(timetable[i].Lecturer_ID === timetable[j].Lecturer_ID && timetable[i].Day_ID === timetable[j].Day_ID && timetable[i].Start_time === timetable[j].Start_time)//&& isoverlapping(+timetable[i].Start_Time,+timetable[i].End_Time,+timetable[j].Start_Time,+timetable[j].End_Time))
                return false;

            // if the same group is assigned to two lecturs in same day at same time it's a conflect
            if(timetable[i].Group_ID === timetable[j].Group_ID && timetable[i].Day_ID === timetable[j].Day_ID && timetable[i].Start_time === timetable[j].Start_time)//&& isoverlapping(+timetable[i].Start_Time,+timetable[i].End_Time,+timetable[j].Start_Time,+timetable[j].End_Time))
                return false;

            // if the same hall is assigned to two groups in same day at same time it's a conflect
            if(timetable[i].Hall_ID === timetable[j].Hall_ID && timetable[i].Day_ID === timetable[j].Day_ID && timetable[i].Start_time === timetable[j].Start_time)//&& isoverlapping(+timetable[i].Start_Time,+timetable[i].End_Time,+timetable[j].Start_Time,+timetable[j].End_Time))
                return false;
        }
    }
    
    return true;
}

//This function check is to time sets are overlapping
function isoverlapping (StartA, EndA, StartB, endB){
    if(!(EndA <= StartB || StartA >= endB))
        return true;
    return false;
}