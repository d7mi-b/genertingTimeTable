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
    const { System_State_ID, System_Year, System_Semester, Default_Weights } = req.body;

    try {
        const [ system ] = await db.query(`
            update system_state set System_Year = ?, System_Semester = ?, Default_Weights = ?
            where System_State_ID = ?
        `, [System_Year, System_Semester, Default_Weights, System_State_ID]);

        const [semester] = await db.query(`
        update batches set Semester_ID = Semester_ID+1
        where Semester_ID<10
        `)

        return res.status(200).json(semester)
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
        const [ weights ] = await db.query(`
            update fitnes_weight set Weight = case
                when Weight_Name = "lecturerAvailabilty" then Weight = ?
                when Weight_Name = "timeGap" then Weight = ?
                when Weight_Name = "labsOnSameDay" then Weight = ?
                when Weight_Name = "dayOFF" then Weight = ?
                when Weight_Name = "lecturesOnDay" then Weight = ?
                when Weight_Name = "groupsTimes" then Weight = ?
            end
        `, [lecturerAvailabilty, timeGap, labsOnSameDay, dayOFF, lecturesOnDay, groupsTimes]);

        return res.status(200).json(weights);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}