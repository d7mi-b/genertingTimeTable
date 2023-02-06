const db = require('../DB');

module.exports.getCollege = async (req, res) => {
    try {
        const [ row ] = await db.query('select * from college')
        return res.status(200).json(row)
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}