const db = require('../DB');

module.exports.getColleges = async (req, res) => {
    try {
        const [ colleges ] = await db.query('select * from college where College_Name != "رئاسة الجامعة"')
        return res.status(200).json(colleges)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.getCollege = async (req, res) => {
    const { College_ID } = req.params;

    try {
        const [ college ] = await db.query('select * from college where College_ID = ?', [College_ID])

        return res.status(200).json(college[0])
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.addCollege = async (req, res) => {
    const { College_Name } = req.body;

    try {
        const [ college ] = await db.query('insert into college (College_Name) values (?) ', [College_Name])

        return res.status(201).json(college)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.updateCollege = async (req, res) => {
    const { College_ID, College_Name } = req.body;

    try {
        const [ college ] = await db.query(`
            update college set College_Name = ? where College_ID = ? 
        `, [College_Name, College_ID])

        return res.status(202).json(college)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.deleteCollege = async (req, res) => {
    const { College_ID } = req.body;

    try {
        const [ college ] = await db.query(`
            delete from college where College_ID = ? 
        `, [College_ID])

        return res.status(202).json(college)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}