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
    const { Department_ID, Semester } = req.params;

    try{
        let modules;
        if(Semester == 1)
      {
        [modules] = await db.query(`
        
        select Module_ID, Hall_Type_ID, module.Semester_ID, module.Subject_ID, Subject_Name, module.Lecturer_ID, Lecturer_Name,
        subject_type.Subject_Type_Name, subject_type.Subject_Type_ID from module 
        natural join subjects
        join lecturer on lecturer.Lecturer_ID = module.Lecturer_ID
        join subject_type on module.Subject_Type_ID = subject_type.Subject_Type_ID
        where module.Department_ID = ? and (module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ?)
        `,[Department_ID,1,3,5,7,9])
    }
    else{
        [modules] = await db.query(`
        
        select Module_ID, Hall_Type_ID, module.Semester_ID, module.Subject_ID, Subject_Name, module.Lecturer_ID,Lecturer_Name,
        subject_type.Subject_Type_Name, subject_type.Subject_Type_ID from module 
        natural join subjects
        join lecturer on lecturer.Lecturer_ID = module.Lecturer_ID
        join subject_type on module.Subject_Type_ID = subject_type.Subject_Type_ID
        where module.Department_ID = ? and (module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ?)
        `,[Department_ID,2,4,6,8,10])
    }

        return res.status(200).json(modules);
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}