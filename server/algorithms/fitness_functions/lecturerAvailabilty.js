module.exports.lecturerAvailabilty = (timetable, lecturers) => {
    let scores = 0;

    if (timetable) {
        lecturers.forEach(l => {
            let numberDays = [];
            timetable.filter(e => e.Lecturer_ID === l.Lecturer_ID).forEach(ele => {
                if (l.Sunday === 1 && ele.Day_ID === 1)
                    scores += 10;
                else if (l.Monday === 1 && ele.Day_ID === 2)
                    scores += 10;
                else if (l.Tuesday === 1 && ele.Day_ID === 3)
                    scores += 10;
                else if (l.Wednesday === 1 && ele.Day_ID === 4)
                    scores += 10;
                else if (l.Thursday === 1 && ele.Day_ID === 5)
                    scores += 10;
                
                if (!numberDays.includes(ele.Day_ID))
                    numberDays.push(ele.Day_ID);
            })
            if (l.NO_Available_Days !== null) {
                if (l.NO_Available_Days >= numberDays.length) {
                    scores += 20;
                }
            }
        })
    }

    return scores;
}