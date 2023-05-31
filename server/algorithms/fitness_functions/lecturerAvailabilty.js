module.exports.lecturerAvailabilty = (timetable, lecturers) => {
    let scores = 0;

    if (timetable) {
        lecturers.forEach(l => {
            let days = [];
            timetable.filter(e => e.Lecturer_ID === l.Lecturer_ID).forEach(ele => {
                if (!days.includes(ele.Day_ID))
                    days.push(ele.Day_ID);
            })

            // Check the number of days in timetable if it's ok with the number of available days of lecturer
            if (l.NO_Available_Days !== null && l.Not_Available === 0) {
                if (l.NO_Available_Days >= days.length) {
                    scores += 1;
                }
            }
        })
    }

    return scores;
}