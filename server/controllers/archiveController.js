const db = require('../DB');

module.exports.archiveTimetable = async (req, res) => {
    try {
        const [ Schedules ] = await db.query(`
        SELECT ETT_ID, module.Module_ID, Subject_Name, Lecturer_Name, module.Semester_ID, Group_, Hall_Name, day.Day_ID, Day_Name, Start_Time, End_Time, module.Department_ID, 
        Department_Name FROM e_t_t
        join module on e_t_t.Module_ID = module.Module_ID
        join subjects on module.Subject_ID = subjects.Subject_ID
        join lecturer on lecturer.Lecturer_ID = e_t_t.Lecturer_ID
        join batch_groups on e_t_t.Group_ID = batch_groups.Group_ID
        join batches on batch_groups.Batch_ID = batches.Batch_ID
        join halls on e_t_t.Hall_ID = halls.Hall_ID
        join day on e_t_t.Day_ID = day.Day_ID
        join department on module.Department_ID = department.Department_ID
        `)

        const [ system ] = await db.query(`
            select System_Year from system_state
        `);

        Schedules.forEach(async s => {
            await db.query(`
                insert into  archive 
                (Subject_Name, Lecturer_Name, Group_, Hall_Name, Day_Name, Start_Time, End_Time, Semester_ID, Department_Name, Year)
                values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [s.Subject_Name, s.Lecturer_Name, s.Group_, s.Hall_Name, s.Day_Name, s.Start_Time, s.End_Time, s.Semester_ID, s.Department_Name, system[0].System_Year])
        })

        await db.query(`
            Delete from e_t_t;
        `)

        return res.status(201).json(Schedules);
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports.getTimetable = async (req, res) => {
    try {
        const [timetable] = await db.query(`
            select * from archive
        `);

        return res.status(200).json(timetable);
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports.getTimetableOf = async (req, res) => {
    const { Department_Name, Year } = req.params;
    console.log(req.params)
    try {
        const [timetable] = await db.query(`
            SELECT * FROM timetable.archive where Department_Name = ? and Year = ?;
        `, [Department_Name, Year]);

        return res.status(200).json(timetable);
    } catch (err) {
        return res.status(400).json(err)
    }
}