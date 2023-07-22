const db = require('../DB');

module.exports.postRequest = async (req,res) => {
    const { Sender_ID, Reciver_ID, Subject_ID, Subject_Type_ID, Module_ID } = req.body;

    console.log(Sender_ID,Reciver_ID,Subject_ID,Subject_Type_ID,Module_ID)
    try{
        const [request] = await db.query(`
        insert into lecturer_requsets ( Sender_ID, Reciver_ID, Subject_ID, Subject_Type_ID, Module_ID,Reply)
        values(?,?,?,?,?,?)
        `,[Sender_ID,Reciver_ID,Subject_ID,Subject_Type_ID,Module_ID,0])

        return res.status(201).json(request)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}



module.exports.getRequests = async (req,res) => {
    const { Deparetment_ID } = req.params;
    
    try{
        const [requests] = await db.query(`
            select Request_ID, Sender_ID, Reciver_ID, Subject_Name, Subject_Type_Name, Department_Name, Reply, Lecturer_Name, Module_ID
            from lecturer_requsets 
            natural join subjects
            join department on department.Department_ID = lecturer_requsets.Sender_ID 
            natural join subject_type 
            left outer join lecturer on lecturer.Lecturer_ID = lecturer_requsets.Lecturer_ID
            where Reciver_ID = ? 
            union 
            select Request_ID, Sender_ID, Reciver_ID, Subject_Name, Subject_Type_Name, Department_Name, Reply, Lecturer_Name, Module_ID
            from lecturer_requsets 
            natural join subjects
            join department on department.Department_ID = lecturer_requsets.Reciver_ID 
            natural join subject_type 
            left outer join lecturer on lecturer.Lecturer_ID = lecturer_requsets.Lecturer_ID
            where Sender_ID = ? 
        `,[Deparetment_ID,Deparetment_ID])

        return res.status(200).json(requests)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

module.exports.updateRequest = async (req,res) => {
    const { Request_ID, Lecturer_ID, Reply} = req.body;

    try{
        const [request] = await db.query(`
        update lecturer_requsets set Lecturer_ID = ? , Reply = ? 
        where Request_ID = ?
        `,[Lecturer_ID,Reply,Request_ID])

        return res.status(202).json(request)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}