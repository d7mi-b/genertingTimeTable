const db = require('../DB');

module.exports.postRequest = async (req,res) => {
    const { Sender_ID, Reciver_ID, Subject_Type_ID, Module_ID } = req.body;

    try{
        const [request] = await db.query(`
        insert into lecturer_requsets ( Sender_ID, Reciver_ID, Subject_Type_ID, Module_ID,Reply)
        values(?,?,?,?,?)
        `,[Sender_ID,Reciver_ID,Subject_Type_ID,Module_ID,0]);

        const [department] = await db.query(`
            select Department_Name from department where Department_ID = ? 
        `, [Sender_ID]);

        const [modules] = await db.query(`
            select Subject_Name from module natural join subjects where Module_ID = ?
        `, [Module_ID]);

        await db.query(`
            insert into notification (Notification_Text, Department_ID, Notification_state)
            values (?, ?, 0)
        `, [`قام قسم ${department[0].Department_Name} بطلب محاضر لمادة ${modules[0].Subject_Name} `, Reciver_ID]);


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
            select Request_ID, Sender_ID, Reciver_ID, Subject_Name, Subject_Type_Name, Department_Name, Reply, Lecturer_Name, 
            lecturer_requsets.Module_ID from lecturer_requsets 
            join module on lecturer_requsets.Module_ID = module.Module_ID
            join subjects on module.Subject_ID = subjects.Subject_ID
            join department on department.Department_ID = lecturer_requsets.Sender_ID 
            join subject_type on lecturer_requsets.Subject_Type_ID = subject_type.Subject_Type_ID
            left outer join lecturer on lecturer.Lecturer_ID = lecturer_requsets.Lecturer_ID
            where Reciver_ID = ? 
            union 
            select Request_ID, Sender_ID, Reciver_ID, Subject_Name, Subject_Type_Name, Department_Name, Reply, Lecturer_Name, 
            lecturer_requsets.Module_ID from lecturer_requsets 
            join module on lecturer_requsets.Module_ID = module.Module_ID
            join subjects on module.Subject_ID = subjects.Subject_ID
            join department on department.Department_ID = lecturer_requsets.Reciver_ID 
            join subject_type on lecturer_requsets.Subject_Type_ID = subject_type.Subject_Type_ID
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
        const [requests] = await db.query(`
        update lecturer_requsets set Lecturer_ID = ? , Reply = ? 
        where Request_ID = ?
        `,[Lecturer_ID,Reply,Request_ID]);

        const [request] = await db.query(`
            select * from lecturer_requsets where Request_ID = ?
        `, [Request_ID]);

        const [department] = await db.query(`
            select Department_Name from department where Department_ID = ? 
        `, [request[0].Reciver_ID]);

        const [modules] = await db.query(`
            select Subject_Name from module natural join subjects where Module_ID = ?
        `, [request[0].Module_ID]);

        await db.query(`
            insert into notification (Notification_Text, Department_ID, Notification_state)
            values (?, ?, 0)
        `, [`قام قسم ${department[0].Department_Name} بالرد على طلبك محاضر لمادة ${modules[0].Subject_Name} ${Lecturer_Name ? 'بالقبول' : 'بالرفض'} `, request[0].Sender_ID]);

        return res.status(202).json(requests)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}