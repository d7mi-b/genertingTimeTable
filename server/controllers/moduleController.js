const db = require('../DB');

module.exports.updateLecturer = async (req,res) => {
    
    const data = req.body;
    let array = [];


    data.map(i => {
        array.push([i.Lecturer_ID, i.Module_ID])
    })

    try{
        array.map(i => {
            db.query(`
            update module set Lecturer_ID = ? 
            where Module_ID = ?;
        `,i)
        })

        
        return res.status(201).json("update Success")
    }
    catch(err){ 
        res.status(400).json({err:err.message})
    }
}

module.exports.updateHall = async (req,res) => {
    
    const data = req.body;
    let array = [];

    data.map(i => {
        array.push([i.Hall_Type_ID, i.Module_ID])
    })

    try{
        array.map(i => {
            db.query(`
            update module set Hall_Type_ID = ? 
            where Module_ID = ?;
        `,i)
        })

        
        return res.status(201).json("update Success")
    }
    catch(err){ 
        res.status(400).json({err:err.message})
    }
}

module.exports.getDepartmentModule = async (req,res) => {
    const { Department_ID } = req.params;

    
    try{
        const [modules] = await db.query(`
        
        select Module_ID, Hall_Type_ID, module.Semester_ID, module.Subject_ID, Subject_Name, Lecturer_ID,
        subject_types.Subject_Type, Subject_Type_ID from module 
        natural join subjects
        join subject_types on module.Subject_Type = subject_types.Subject_Type_ID
        where module.Department_ID = ? 
        `,[Department_ID])

        return res.status(200).json(modules);
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}