const db = require('../DB');

module.exports.getAllBuilding = async (req, res) => {
    try {
        const [ buildings ] = await db.query(`select * from building`);
        res.status(200).json(buildings);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.addBuilding = async (req, res) => {
    const { Building_Name } = req.body;

    try {
        if (!Building_Name)
            throw Error('يجب ملء جميع الحقول');

        const [ building ] = await db.query(`
            insert into building (Building_Name) values (?)
        `, [Building_Name]);

        return res.status(201).json(building);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getOneBuilding = async (req, res) => {
    const { Building_ID } = req.params;

    try {
        const [ building ] = await db.query(`
            select Building_Name from building where Building_ID = ?
        `, [Building_ID])

        return res.status(200).json(building[0]);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.updateBuilding = async (req, res) => {
    const { Building_ID, Building_Name } = req.body;

    try {
        const [ building ] = await db.query(`
            update building set Building_Name = ? where Building_ID = ?
        `, [Building_Name, Building_ID])

        return res.status(202).json(building);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.deleteBuilding = async (req, res) => {
    const { Building_ID } = req.body;
    
    try {
        const [ building ] = await db.query(`
            delete from building where Building_ID = ?;
        `, [Building_ID]);

        return res.status(202).json(building);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}