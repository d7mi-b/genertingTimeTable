module.exports.lecturerAvailabilty = (timetable, lecturers) => {
    let scores = 0;

    if (timetable) {
        lecturers.forEach(l => {
            timetable.filter(e => e.Lecturer_ID === l.Lecturer_ID).forEach(ele => {
                if (l.Sunday === 1 && ele.Day_ID === 1)
                    scores += 1;
                else if (l.Monday === 1 && ele.Day_ID === 2)
                    scores += 1;
                else if (l.Tuesday === 1 && ele.Day_ID === 3)
                    scores += 1;
                else if (l.Wednesday === 1 && ele.Day_ID === 4)
                    scores += 1;
                else if (l.Thursday === 1 && ele.Day_ID === 5)
                    scores += 1;
            })
        })
    }

    return scores;
}