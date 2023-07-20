const db = require('../DB');

module.exports.getHallTypes = async (req, res) => {
    try {
        const [ types ] = await db.query(`
            select * from hall_type
        `);

        return res.status(200).json(types);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.addHallType = async (req, res) => {
    const { Type_Name } = req.body;

    try {
        const [ hall_type ] = await db.query(`
            insert into hall_type (Type_Name) values (?)
        `, [Type_Name]);

        return res.status(201).json(hall_type);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.deleteHallType = async (req, res) => {
    const { Hall_Type_ID } = req.body;

    try {
        const [ hall_type ] = await db.query(`
            delete from hall_type where Hall_type_ID = ?
        `, [Hall_Type_ID]);

        return res.status(202).json(hall_type);
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.updateHallType = async (req, res) => {
    const { Hall_Type_ID, Type_Name } = req.body;

    try {
        const [ hall_type ] = await db.query(`
            update hall_type set Type_Name = ? where Hall_type_ID = ?
        `, [Type_Name, Hall_Type_ID]);

        return res.status(202).json(hall_type);
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}