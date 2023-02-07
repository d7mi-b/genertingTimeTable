const db = require('../DB');

module.exports.getLecturersOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ lecturers ] = await db.query(`
            select Lecturer_ID, Lecturer_Name from lecturer natural join department
            where department.Department_ID = ?;
        `, [Department_ID]);

        return res.status(200).json(lecturers);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}