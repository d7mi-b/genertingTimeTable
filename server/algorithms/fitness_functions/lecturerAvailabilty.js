module.exports.lecturerAvailabilty = (timetable, lecturers) => {
    let scores = 0;

    // Check the day of module if it's ok with the available days of lecturer
    if (timetable) {
        lecturers.forEach(l => {
            let days = [];
            timetable.filter(e => e.Lecturer_ID === l.Lecturer_ID).forEach(ele => {
                if (l.Sunday === 1 && ele.Day_ID === 1)
                    scores += 30;
                else if (l.Monday === 1 && ele.Day_ID === 2)
                    scores += 30;
                else if (l.Tuesday === 1 && ele.Day_ID === 3)
                    scores += 30;
                else if (l.Wednesday === 1 && ele.Day_ID === 4)
                    scores += 30;
                else if (l.Thursday === 1 && ele.Day_ID === 5)
                    scores += 30;
                
                if (!days.includes(ele.Day_ID))
                    days.push(ele.Day_ID);
            })

            // Check the number of days in timetable if it's ok with the number of available days of lecturer
            if (l.NO_Available_Days !== null && l.Not_Available === 0) {
                if (l.NO_Available_Days >= days.length) {
                    scores += 40;
                }
            }
        })
    }

    return scores;
}