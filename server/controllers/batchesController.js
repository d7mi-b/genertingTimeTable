const db = require('../DB');

module.exports.getBatchesOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ batches ] = await db.query(`
            select Batch_ID, Level_Name, Batch_General_Count, Batch_Payment_Count, Batch_Parallel_Count from batches
            natural join department
            natural join level
            where department.Department_ID = ?;
        `, [Department_ID]);

        return res.status(200).json(batches);
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}