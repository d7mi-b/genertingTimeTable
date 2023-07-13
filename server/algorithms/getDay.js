const { getRandomItem } = require("./getRandomItem");
const { lecturerDays } = require("./lecturerDays");

module.exports.getDay = (days, lecturers, module) => {
    let day = getRandomItem(days);
    const lecturerDay = lecturers.filter(l => l.Lecturer_ID === module.Lecturer_ID);

    // If the day not available to lecturer then change the day
    while (!lecturerDays(lecturerDay, day.Day_ID)) {
        if (lecturerDay[0].Sunday === 0 && day.Day_ID === 1) {
            day = getRandomItem(days)
        }
        else if (lecturerDay[0].Monday === 0 && day.Day_ID === 2) {
            day = getRandomItem(days)
        }
        else if (lecturerDay[0].Tuesday === 0 && day.Day_ID === 3) {
            day = getRandomItem(days)
        }
        else if (lecturerDay[0].Wednesday === 0 && day.Day_ID === 4) {
            day = getRandomItem(days)
        }
        else if (lecturerDay[0].Thursday === 0 && day.Day_ID === 5) {
            day = getRandomItem(days)
        }
    }

    return day.Day_ID
}