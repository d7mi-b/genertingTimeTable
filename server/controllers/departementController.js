const db = require('../DB');

module.exports.getDepartements = async (req, res) => {
    try {
        const [ row ] = await db.query('select * from department where Department_Name != "مركز المعلومات"')
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

        return res.status(201).json(department);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getOneDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ department ] = await db.query(`
            select Department_Name, College_Name, department.College_ID, Name, 
            sum(Batch_General_Count) + sum(Batch_Payment_Count) + sum(Batch_Parallel_Count) as countOfStudent
            from department 
            left outer join college on department.College_ID = college.College_ID
            left outer join users on users.Department_ID = department.Department_ID
            left outer join batches on batches.Department_ID = department.Department_ID
            where department.Department_ID = ?
            group by Department_Name, College_Name, Name;
        `, [Department_ID]);

        return res.status(200).json(department[0]);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.updateDepartment = async (req, res) => {
    const { Department_ID, Department_Name, College_ID } = req.body;

    try {
        const [ department ] = await db.query(`
            update department set Department_Name = ?, College_ID = ? where Department_ID = ?
        `, [Department_Name, College_ID, Department_ID]);

        return res.status(202).json(department);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.deleteDepartment = async (req, res) => {
    const { Department_ID } = req.body;
    
    try {
        const [ department ] = await db.query(`
            delete from department where Department_ID = ?;
        `, [Department_ID]);

        return res.status(202).json(department);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getDepartementsCollege = async (req, res) => {
    const { College_ID } = req.params;
    try { 
        const [ departments ] = await db.query(`
            select Department_ID, Department_Name from department join college on department.College_ID = college.College_ID
            where department.College_ID = ?
        `, [College_ID]);

        return res.status(200).json(departments)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}
