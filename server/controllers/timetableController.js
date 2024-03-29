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

// To get the number of timetables
module.exports.groupsNumberInTimetable = async (req, res) => {
    try {
        const [groups] = await db.query(`
            SELECT count(distinct Group_ID) as groupsNumber FROM timetable.e_t_t;
        `);

        return res.status(200).json(groups[0]);
    } catch (err) {
        return res.status(400).json(err)
    }

}

// handel search in timetable
module.exports.timetableSearch = async (req, res) => {
    const { search } = req.params;

    try {
        const [timetable] = await db.query(`
            SELECT ETT_ID, e_t_t.Module_ID, Subject_Name, Subject_Type_Name, Lecturer_Name, Rank_, Hall_Name, Day_Name, Start_Time, End_Time, Semester_Name, Department_Name FROM e_t_t 
            join module on e_t_t.Module_ID = module.Module_ID
            join subjects on module.Subject_ID = subjects.Subject_ID
            join subject_type on module.Subject_Type_ID = subject_type.Subject_Type_ID
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
            Department_Name like ? or 
            Subject_Type_Name like ?
        `, [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`]);

        return res.status(200).json(timetable);
    } catch (err) {
        return res.status(400).json(err)
    }
}

// Check if all modules of departments has lecturer and hall type for start generating timetable
module.exports.checkModulesForGenerating = async (req, res) => {
    const { College_ID } = req.params;

    try {
        const [modules] = await db.query(`
            select department.Department_ID, count(Module_ID) as modules, count(Lecturer_ID) as lecturers, count(Hall_Type_ID) as Hall_Type from module
            right outer join department on module.Department_ID = department.Department_ID
            where department.College_ID = ?
            group by department.Department_ID;
        `, [College_ID]);

        return res.status(200).json(modules);
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports.avilableHallsinTimetable = async (req, res) => {
    const { search } = req.params;
    
    try {
        const [halls] = await db.query(`
            SELECT halls.Hall_ID, halls.Hall_Name, Hall_Capacity, Building_Name, College_Name, day.Day_Name, time.Start_Time, time.End_Time
            FROM halls 
            natural join building
            natural join college
            CROSS JOIN time
            CROSS JOIN day
            WHERE (halls.Hall_ID, day.Day_ID, time.Start_Time) NOT IN (
                SELECT e_t_t.Hall_ID, e_t_t.Day_ID, e_t_t.Start_Time
                FROM e_t_t
                INNER JOIN time ON e_t_t.Start_Time = time.Start_Time
                WHERE time.Start_Time < '18:00:00' AND time.End_Time > '07:00:00'
            ) AND (halls.Hall_ID, day.Day_ID, time.End_Time) NOT IN (
                SELECT e_t_t.Hall_ID, e_t_t.Day_ID, e_t_t.End_Time
                FROM e_t_t
                INNER JOIN time ON e_t_t.End_Time = time.End_Time
                WHERE time.Start_Time < '18:00:00' AND time.End_Time > '07:00:00'
            ) AND (
                college.College_Name like ? OR building.Building_Name like ?
            )
            ORDER BY halls.Hall_ID, day.Day_ID, time.Start_Time;
        `, [`%${search}%`, `%${search}%`]);

        return res.status(200).json(halls);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.avilableHallsAllWeek = async (req, res) => {
    const { search } = req.params;

    try {
        const [halls] = await db.query(`
            SELECT halls.Hall_ID, Hall_Name, Hall_Capacity, Building_Name, College_Name
            FROM halls 
            natural join building
            natural join college
            where (halls.Hall_ID) NOT IN (
                select halls.Hall_ID from halls natural join e_t_t
            ) AND (
                College_Name like ? OR Building_Name like ?
            );
            `, [`%${search}%`, `%${search}%`]);

        return res.status(200).json(halls);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}