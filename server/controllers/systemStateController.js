const db = require('../DB');

module.exports.getSystemState = async (req, res) => {
    try {
        const [ system ] = await db.query(`
            select * from system_state
        `);

        return res.status(200).json(system[0])
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.updateSystemstate = async (req, res) => {
    const { System_State_ID, System_Year, System_Semester } = req.body;

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

        const [ [ systemYear ] ] = await db.query(`
            select System_Year from system_state where System_State_ID = ?
        `, [System_State_ID]);

        Schedules.forEach(async s => {
            await db.query(`
                insert into  archive 
                (Subject_Name, Lecturer_Name, Group_, Hall_Name, Day_Name, Start_Time, End_Time, Semester_ID, Department_Name, Year)
                values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `, [s.Subject_Name, s.Lecturer_Name, s.Group_, s.Hall_Name, s.Day_Name, s.Start_Time, s.End_Time, s.Semester_ID, s.Department_Name, systemYear.System_Year])
        })

        await db.query(`
            DELETE FROM e_t_t;
        `)

        const [ system ] = await db.query(`
            update system_state set System_Year = ?, System_Semester = ?
            where System_State_ID = ?
        `, [System_Year, System_Semester, System_State_ID]);

        await db.query(`
            update batches set Semester_ID = Semester_ID+1
            where Semester_ID<11
        `)

        await db.query(`
            delete from batches where Semester_ID = 11;
        `)

        return res.status(202).json(system)
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.changeDefaultWeights = async (req, res) => {
    const { System_State_ID, Default_Weights } = req.body;

    try {
        const [ system ] = await db.query(`
            update system_state set Default_Weights = ?
            where System_State_ID = ?
        `, [Default_Weights, System_State_ID]);

        return res.status(202).json(system)
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.weights = async (req, res) => {
    try {
        const [ weights ] = await db.query(`
            select * from 
            (select Weight as lecturerAvailabilty from fitnes_weight where Weight_Name = 'lecturerAvailabilty') as lecturerAvailabilty join
            (select Weight as timeGap from fitnes_weight where Weight_Name = 'timeGap') as timeGap join
            (select Weight as labsOnSameDay from fitnes_weight where Weight_Name = 'labsOnSameDay') as labsOnSameDay join 
            (select Weight as dayOFF from fitnes_weight where Weight_Name = 'dayOFF') as dayOFF join 
            (select Weight as lecturesOnDay from fitnes_weight where Weight_Name = 'lecturesOnDay') as lecturesOnDay join 
            (select Weight as groupsTimes from fitnes_weight where Weight_Name = 'groupsTimes') as groupsTimes
        `);

        return res.status(200).json(weights[0]);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.updateNumbersOfConstraints = async (req, res) => {
    const { System_State_ID, Maximum_Lecturers_Student, Minimum_Lecturers_Student } = req.body;

    try {
        const [ system ] = await db.query(`
            update system_state set Maximum_Lecturers_Student = ?, Minimum_Lecturers_Student = ?
            where System_State_ID = ?
        `, [Maximum_Lecturers_Student, Minimum_Lecturers_Student, System_State_ID]);

        return res.status(202).json(system)
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module,exports.updateWeights = async (req, res) => {

    try {
        
        for (const weight in req.body) {
            const [ weights ] = await db.query(`
                update fitnes_weight set Weight = ? where Weight_Name = "${weight}"
            `, [req.body[weight]]);
        };

        return res.status(202).json({});
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getYearsOfSystemState = async (req, res) => {
    try {
        const [ system ] = await db.query(`
            select System_Year from system_state
        `);

        return res.status(200).json(system)
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}