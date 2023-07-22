const db = require("../DB");

module.exports.saveTimeTable = async (bestTimetable) => {
    const result = []

    bestTimetable.map(i => {
    result.push([i.Module_ID, i.Lecturer_ID, i.Group_ID, i.Hall_ID, i.Day_ID, i.Start_Time, i.End_Time])
    })

    await db.query(`
    Delete from e_t_t;
    `)

    await db.query(`
    insert into e_t_t (Module_ID, Lecturer_ID, Group_ID, Hall_ID, Day_ID, Start_Time, End_Time)
    values ?
    `,[result])

    console.log("TimeTable saved in DB")
}
