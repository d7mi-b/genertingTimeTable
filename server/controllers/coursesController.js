const db = require('../DB');

module.exports.getDepartmentCourses = async (req,res) => {
    const { Department_ID } = req.params;

    try{
        const [Courses] = await db.query(`
        select Subject_ID, Subject_Name, Subject_Code,
        Credit_Theoretical, Credit_Practical, Credit_Tutorial, Semester_ID 
        from subjects where Department_ID = ?
        `,[Department_ID]);

        res.status(200).json(Courses);
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}

module.exports.addCourse = async (req,res) => {
    const { Department_ID, Subject_Name, Subject_Code, Credit_Theoretical, 
        Credit_Practical, Credit_Tutorial, Semester_ID } = req.body;

        try{
            const [Course] = await db.query(`
            insert into subjects (Subject_Name, Subject_Code, Credit_Theoretical, 
            Credit_Practical, Credit_Tutorial, Department_ID, Semester_ID)
            values (?,?,?,?,?,?,?,?)
            `,[Subject_Name,Subject_Code,Credit_Theoretical,Credit_Practical,
            Credit_Tutorial,Department_ID,Semester_ID]);

            
            if(Course.insertId)
           {
                if(Credit_Theoretical != 0){
                    await db.query(`
                    insert into module (Subject_ID, Semester_ID, Department_ID, Subject_Type) 
                    values(?,?,?,?)
                    `,[Course.insertId,Semester_ID,Department_ID,1])
                }
                if(Credit_Practical != 0){
                    await db.query(`
                    insert into module (Subject_ID, Semester_ID, Department_ID, Subject_Type) 
                    values(?,?,?,?)
                    `,[Course.insertId,Semester_ID,Department_ID,2])
                }
                if(Credit_Tutorial != 0){
                    await db.query(`
                    insert into module (Subject_ID, Semester_ID, Department_ID, Subject_Type) 
                    values(?,?,?,?)
                    `,[Course.insertId,Semester_ID,Department_ID,3])
                }

                res.status(201).json(Course)
            }
            
        }
        catch(err){
            res.status(400).json({err: err.message})
        }
}

module.exports.deleteCourse = async (req,res) => {
    const { Subject_ID } = req.body;

    try{
        await db.query(`
        DELETE FROM module WHERE Subject_ID = ?
        `,[Subject_ID])

        const [Course] = await db.query(`
        DELETE FROM subjects WHERE Subject_ID = ?
        `,[Subject_ID]);

        return res.status(202).json(Course)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}
