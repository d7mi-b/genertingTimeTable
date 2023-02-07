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

module.exports.getHallsOfBuilding = async (req, res) => {
    const { Building_ID } = req.params;

    try {
        const [ halls ] = await db.query(`
            select Hall_ID, Hall_Name, Hall_Capacity, Type_Name, Department_Name, College_Name from halls 
            join hall_type on halls.Hall_Type_ID = hall_type.Hall_Type_ID
            join building on halls.Building_ID = building.Building_ID 
            join department on halls.Department_ID = department.Department_ID
            join college on department.College_ID = college.College_ID
            where halls.Building_ID = ?
        `, [Building_ID]);

        return res.status(200).json(halls);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getHallsOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ halls ] = await db.query(`
            select Hall_ID, Hall_Name, Hall_Capacity, Type_Name, Building_Name from halls 
            natural join department 
            join hall_type on hall_type.Hall_Type_ID = halls.Hall_Type_ID
            join building on halls.Building_ID = building.Building_ID
            where department.Department_ID = ?;
        `, [Department_ID]);

        return res.status(200).json(halls);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}