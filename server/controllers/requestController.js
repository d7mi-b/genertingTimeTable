const db = require('../DB');

module.exports.postRequest = async (req,res) => {
    const { Sender_ID, Reciver_ID, Subject_ID, Subject_Type } = req.body;

    
    try{
        const [request] = await db.query(`
        insert into lecturer_requsets ( Sender_ID, Reciver_ID, Subject_ID, Subject_Type)
        values(?,?,?,?)
        `,[Sender_ID,Reciver_ID,Subject_ID,Subject_Type])

        return res.status(201).json(request)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

module.exports.exportRequests = async (req,res) => {
    const { Deparetment_ID } = req.params;
    
    try{
        const [requests] = await db.query(`
            select Request_ID, Sender_ID, Reciver_ID, Subject_Name, Subject_Type, Department_Name, Lecturer_Name from lecturer_requsets 
            natural join subjects
            join department on department.Department_ID = lecturer_requsets.Reciver_ID 
            left outer join Lecturer on lecturer.Lecturer_ID = lecturer_requsets.Lecturer_ID
            where Sender_ID = ?
        `,[Deparetment_ID])

        return res.status(200).json(requests)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

module.exports.importRequests = async (req,res) => {
    const { Deparetment_ID } = req.params;
    
    try{
        const [requests] = await db.query(`
            select Request_ID, Sender_ID, Reciver_ID, Subject_Name, Subject_Type, Department_Name from lecturer_requsets 
            natural join subjects
            join department on department.Department_ID = lecturer_requsets.Sender_ID 
            where Reciver_ID = ?
        `,[Deparetment_ID])

        return res.status(200).json(requests)
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}