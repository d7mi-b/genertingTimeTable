const { query } = require('express');
const db = require('../DB');

module.exports.updateLecturer = async (req,res) => {
    const { Lecturer_ID, Module_ID } = req.body;

    try{
        await db.query(`
            update module set Lecturer_ID = ? 
            where Module_ID = ?;
        `, [Lecturer_ID, Module_ID])

        return res.status(202).json("update Success")
    }
    catch(err){ 
        res.status(400).json({err:err.message})
    }
}

module.exports.updateHall = async (req,res) => {
    const { Hall_Type_ID, Module_ID } = req.body;

    try{
        await db.query(`
            update module set Hall_Type_ID = ? 
            where Module_ID = ?;
        `, [Hall_Type_ID, Module_ID])

        return res.status(202).json("update Success")
    }
    catch(err){ 
        res.status(400).json({err:err.message})
    }
}

module.exports.updatePracticalNo = async (req,res) => {
    const { practical_Groups_No, Module_ID } = req.body;

    try{
        const [update] = await db.query(`
            update module set practical_Groups_No = ? 
            where Module_ID = ?;
        `, [practical_Groups_No, Module_ID])

        return res.status(202).json(update)
    }
    catch(err){ 
        res.status(400).json({err:err.message})
    }
}

module.exports.updateGroup = async (req,res) => {
    const { Group_ID, Module_ID, Semester_ID, Subject_ID, Department_ID, Subject_Type_ID} = req.query;
    
    try{
        const [[isGroup_ID]] = await db.query(`
        select Group_ID from module 
        where Module_ID = ?
        `,[Module_ID])

        console.log(isGroup_ID)
        if(isGroup_ID.Group_ID == null){
            const [update] = await db.query(`
            update module set Group_ID = ? 
            where Module_ID = ?;
            `, [Group_ID, Module_ID])

            console.log(update)

           

        }else {
            const [add] = await db.query(`
            insert into module ( Semester_ID, Subject_ID, Department_ID, Subject_Type_ID, Group_ID )
            values (?,?,?,?,?)
            `,[Semester_ID, Subject_ID, Department_ID, Subject_Type_ID, Group_ID])

            console.log(add)
            
        }

        return res.status(202).json(isGroup_ID)
    }catch(err){ 
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
        subject_type.Subject_Type_Name, subject_type.Subject_Type_ID, Group_ID, practical_Groups_No from module 
        natural join subjects
        left outer join lecturer on lecturer.Lecturer_ID = module.Lecturer_ID
        join subject_type on module.Subject_Type_ID = subject_type.Subject_Type_ID
        where module.Department_ID = ? and (module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ? or module.Semester_ID = ?)
        `,[Department_ID,1,3,5,7,9])
    }
    else{
        [modules] = await db.query(`
        
        select Module_ID, Hall_Type_ID, module.Semester_ID, module.Subject_ID, Subject_Name, module.Lecturer_ID,Lecturer_Name,
        subject_type.Subject_Type_Name, subject_type.Subject_Type_ID, Group_ID, practical_Groups_No from module 
        natural join subjects
        left outer join lecturer on lecturer.Lecturer_ID = module.Lecturer_ID
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