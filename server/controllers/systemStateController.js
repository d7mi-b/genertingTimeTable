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

module,exports.updateWeights = async (req, res) => {
    const { lecturerAvailabilty, timeGap, labsOnSameDay, dayOFF, lecturesOnDay, groupsTimes } = req.body;
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