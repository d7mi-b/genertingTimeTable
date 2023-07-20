const db = require('../DB');

module.exports.getAllSchedules = async (req,res) => {

    try{
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

        res.status(200).json(Schedules)
    }
    catch (err) {
        res.status(400).json({err:err.message})
    }
}

module.exports.getDepSchedules = async (req,res) => {
    const { Department_ID } = req.params;

    try{
        const [ Schedules ] = await db.query(`
        SELECT ETT_ID, Subject_Name, Lecturer_Name, Semester_Name, Group_, Hall_Name, Day_Name, Start_Time, End_Time, FROM e_t_t
        join module on e_t_t.Module_ID = module.Module_ID
        join subjects on module.Subject_ID = subjects.Subject_ID
        join lecturer on lecturer.Lecturer_ID = e_t_t.Lecturer_ID
        join batch_groups on e_t_t.Group_ID = batch_groups.Group_ID
        join batches on batch_groups.Batch_ID = batches.Batch_ID
        join semester on batches.Semester_ID = semester.Semester_ID
        join halls on e_t_t.Hall_ID = halls.Hall_ID
        join day on e_t_t.Day_ID = day.Day_ID
        where module.Department_ID = ?
        `,[Department_ID])

        res.status(200).json(Schedules)
    }
    catch (err) {
        res.status(400).json({err:err.message})
    }
}


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
            SELECT ETT_ID, Subject_Name, Lecturer_Name, Hall_Name, Day_Name, Start_Time, End_Time, Semester_Name, Department_Name FROM e_t_t 
            join module on e_t_t.Module_ID = module.Module_ID
            join subjects on module.Subject_ID = subjects.Subject_ID
            join lecturer on e_t_t.Lecturer_ID = lecturer.Lecturer_Id
            join halls on e_t_t.Hall_ID = halls.Hall_ID
            join day on e_t_t.Day_ID = day.Day_ID
            join semester on module.Semester_ID = semester.Semester_ID
            join department on module.Department_ID = department.Department_ID
            where Subject_Name like ? or
            Lecturer_Name like ? or 
            Hall_Name like ? or
            Day_Name like ? or
            Semester_Name like ? or
            Department_Name like ?;
        `, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);

        return res.status(200).json(timetable[0]);
    } catch (err) {
        return res.status(400).json(err)
    }
}