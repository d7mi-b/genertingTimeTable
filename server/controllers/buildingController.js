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

        return res.status(200).json(building);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}