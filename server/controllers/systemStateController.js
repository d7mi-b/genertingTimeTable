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

        return res.status(200).json(system)
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}