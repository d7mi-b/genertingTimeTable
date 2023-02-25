const db = require('../DB');

module.exports.getHalls = async (req, res) => {
    try {
        const [ halls ] = await db.query(`
            select * from halls
        `);
        
        return res.status(200).json(halls);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getHallsInfo = async (req,res) => {
    try {
        const [ hallsInfo ] = await db.query(`
            select Hall_ID, Hall_Name, Hall_Capacity, Department_Name,
            Building_Name, Type_Name, Is_Available 
            from halls h inner join building b on h.Building_ID = b.Building_ID
            inner join department d on h.Department_ID = d.Department_ID
            inner join hall_type ht on h.Hall_Type_ID = ht.Hall_Type_ID;
        `);

        return res.status(200).json(hallsInfo);
    }
    catch(err){
        res.status(400).json({err: err.message});
    }
}

module.exports.addHall = async (req, res) => {
    const { Hall_Name, Hall_Capacity, Department_ID, Building_ID, Hall_Type_ID } = req.body;

    try {
        const [ hall ] = await db.query(`
            insert into halls (Hall_Name, Hall_Capacity, Department_ID, Building_ID, Hall_Type_ID)
            values (?, ?, ?, ?, ?)
        `, [Hall_Name, Hall_Capacity, Department_ID, Building_ID, Hall_Type_ID]);

        return res.status(200).json(hall);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.updateHall = async (req, res) => {
    const { Hall_ID, Hall_Name, Hall_Capacity, Department_ID, Hall_Type_ID } = req.body;
    
    try {
        const [ hall ] = await db.query(`
            update halls set Hall_Name = ?, Hall_Capacity = ?, Department_ID = ?, Hall_Type_ID = ?
            where Hall_ID = ?
        `, [Hall_Name, Hall_Capacity, Department_ID, Hall_Type_ID, Hall_ID]);

        return res.status(200).json(hall);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.deleteHall = async (req, res) => {
    const { Hall_ID } = req.body;

    try {
        const [ hall ] = await db.query(`
            delete from halls where Hall_ID = ?
        `, [Hall_ID]);

        return res.status(200).json(hall);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.hallsOfBuilding = async (req, res) => {
    const { Building_ID } = req.params;

    try {
        const [ halls ] = await db.query(`
            select Hall_ID, Hall_Name, Hall_Capacity, Type_Name, halls.Hall_Type_ID,
            Department_Name, halls.Department_ID, College_Name from halls 
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

module.exports.hallsOfDepartment = async (req, res) => {
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