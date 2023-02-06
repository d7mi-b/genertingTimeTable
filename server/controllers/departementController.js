const db = require('../DB');

module.exports.getDepartements = async (req, res) => {
    try {
        const [ row ] = await db.query('select * from department')
        return res.status(200).json(row)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.addDepartment = async (req, res) => {
    const { Department_Name, College_ID } = req.body;

    try {
        if (!Department_Name || !College_ID)
            throw Error('يجب ملء جميع الحقول');

        const [ department ] = await db.query(`
            insert into department (Department_Name, College_ID) values (?, ?)
        `, [Department_Name, College_ID]);

        return res.status(200).json(department);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}