module.exports.lecturesOnDay = (timetable, groups, days) => {
    let scores = 0;

    if (timetable) {
        groups.forEach(g => {
            days.forEach(d => {
                let lectures = timetable.filter(e => e.Day_ID === d.Day_ID && e.Group_ID == g.Group_ID).length;

                if (lectures < 3) {
                    scores += 20;
                }
                else if (lectures < 4) {
                    scores += 10;
                }
            })
        })
    }

    return scores;
}