module.exports.dayOFF = (timetable, groups) => {
    let score = 0;

    if (timetable) {
        groups.forEach(g => {
            let days = [];

            timetable.filter(e => e.Group_ID === g.Group_ID).forEach(ele => {
                if (!days.includes(ele.Day_ID))
                    days.push(ele.Day_ID);
            })

            if (days.length < 5)
                score += 1;

        })
    }

    return score;
}