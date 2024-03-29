const db = require('../DB');

module.exports.getBatchesOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ batches ] = await db.query(`
            select Batch_ID,Batch_NO, batches.Semester_ID, Semester_Name, Batch_General_Count, Batch_Payment_Count, Batch_Parallel_Count from batches
            join department on department.Department_ID = batches.Department_ID
            join semester on semester.Semester_ID = batches.Semester_ID
            where batches.Department_ID = ?;
        `, [Department_ID]);

        let oneGroup;
        let groups=[];

        batches.map(async i => {
            [oneGroup] = await db.query(`
            select Group_ID, Group_, Group_Count, Batch_Type, Batch_Type_ID, Batch_ID
            from batch_groups
            natural join batch_Type
            where Batch_ID = ?
            `,[i.Batch_ID])

            
            groups.push(...oneGroup)
            

        })

        const merge = () => {
             groups.map(i => {
                batches.map(j => {
                    if(i.Batch_ID == j.Batch_ID){
                        if(j.hasOwnProperty('Groups')){
                            j.Groups.push(i)
                        }
                        else{
                            j.Groups=[i]
                        }
                }
                })
           })
           return batches
           
        }
        
       setTimeout(()=>{
         return res.status(200).json(merge());
        },2000)
        
        

        
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.getGroupsOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [groups] = await db.query(`
            SELECT Group_ID, Group_, Group_Count, batch_groups.Batch_Type_ID, Batch_Type, Semester_ID FROM batch_groups 
            natural join batches
            natural join batch_type
            where batches.Department_ID = ?;
        `, [Department_ID]);

        return res.status(200).json(groups)
    } catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.batchType =async (req,res) => {
    try{
        const [batch_Type] = await db.query(`
            select * from batch_type
        `)

        res.status(200).json(batch_Type)
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.deleteGroup = async (req,res) => {
    const { Group_ID } = req.body;

    try{
        const [deleted] = await db.query(`
            delete from batch_groups where Group_ID = ?
        `,[Group_ID])

        res.status(202).json(deleted)
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.updateBatch = async (req,res) => {
    const { Batch_ID, Batch_NO, Batch_General_Count, Batch_Parallel_Count, Batch_Payment_Count } = req.body;

    try{
        const [batch] = await db.query(`
            update batches set Batch_General_Count = ?, Batch_Parallel_Count = ?, Batch_Payment_Count = ?, Batch_NO = ?
            where Batch_ID = ?
        `,[Batch_General_Count,Batch_Parallel_Count,Batch_Payment_Count,Batch_NO,Batch_ID])
        

        res.status(202).json(batch)
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.updateGroup = async (req,res) => {
    const { Group_ID, Group_Count, Batch_Type_ID } = req.body;

    try{
        const [group] = await db.query(`
            update batch_groups set Group_Count = ?, Batch_Type_ID = ? 
            where Group_ID = ? 
        `,[Group_Count,Batch_Type_ID,Group_ID])

        res.status(202).json(group)
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.addGroup = async (req,res) => {
    const { Group_, Group_Count, Batch_Type_ID, Batch_ID } = req.body;

    try{
        const [group] = await db.query(`
            insert into batch_groups (Group_, Group_Count, Batch_ID, Batch_Type_ID)
            values(?,?,?,?)
        `,[Group_,Group_Count,Batch_ID,Batch_Type_ID]);

        console.log(group)

        const [subjects] = await db.query(`
            select Subject_ID, Credit_Theoretical, Credit_Practical, Credit_Tutorial, subjects.Semester_ID, subjects.Department_ID from batches
            join subjects on batches.Semester_ID = subjects.Semester_ID
            where Batch_ID = ?;
        `, [Batch_ID]);

        subjects.forEach(async s => {
            if(s.Credit_Theoretical != 0){
                await db.query(`
                    insert into module (Subject_ID, Group_ID, Semester_ID, Department_ID, Subject_Type_ID) 
                    values(?,?,?,?,?)
                `,[s.Subject_ID, group.insertId, s.Semester_ID, s.Department_ID, 1])
            }
            if(s.Credit_Practical != 0){
                await db.query(`
                    insert into module (Subject_ID, Group_ID, Semester_ID, Department_ID, Subject_Type_ID) 
                    values(?,?,?,?,?)
                `,[s.Subject_ID, group.insertId, s.Semester_ID, s.Department_ID, 2])
            }
            if(s.Credit_Tutorial != 0){
                await db.query(`
                    insert into module (Subject_ID, Group_ID, Semester_ID, Department_ID, Subject_Type_ID) 
                    values(?,?,?,?,?)
                `,[s.Subject_ID, group.insertId, s.Semester_ID, s.Department_ID, 3])
            }
        })

        res.status(201).json(group)
    }
    catch (err) {
        res.status(400).json({err: err.message})
    }    
}