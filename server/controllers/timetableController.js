const db = require('../DB');

module.exports.groupsNumberInTimetable = async (req, res) => {
    try {
        const groups = await db.query(`
            SELECT count(distinct Group_ID) as groupsNumber FROM timetable.e_t_t;
        `);

        return res.status(200).json(groups[0][0]);
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports.timetableSearch = async (req, res) => {
    const { search } = req.params;
    try {
        const timetable = await db.query(`
            SELECT ETT_ID, Subject_Name, Lecturer_Name, Hall_Name, Day_Name, Start_Time, End_Time FROM e_t_t 
            join module on e_t_t.Module_ID = module.Module_ID
            join subjects on module.Subject_ID = subjects.Subject_ID
            join lecturer on e_t_t.Lecturer_ID = lecturer.Lecturer_Id
            join halls on e_t_t.Hall_ID = halls.Hall_ID
            join day on e_t_t.Day_ID = day.Day_ID
            where Subject_Name like ? or
            Lecturer_Name like ? or 
            Hall_Name like ? or
            Day_Name like ? ;
        `, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);

        return res.status(200).json(timetable[0]);
    } catch (err) {
        return res.status(400).json(err)
    }
}