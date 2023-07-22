const db = require('../DB');

module.exports.getLecturersOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ lecturers ] = await db.query(`
            select Lecturer_ID, Lecturer_Name, Department_ID, Department_Name, Rank_,Not_Available,
            NO_Available_Days, Sunday, Monday, Tuesday, Wednesday, Thursday from lecturer natural join department
            where department.Department_ID = ?;
        `, [Department_ID]);

        return res.status(200).json(lecturers);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.getLecturersOfDepartment_short = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [ lecturers ] = await db.query(`
            select Lecturer_ID, Lecturer_Name, Department_ID, Department_Name from lecturer natural join department
            where department.Department_ID = ? and Not_Available = 0;
        `, [Department_ID]);

        return res.status(200).json(lecturers);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.postLecturersOfDepartment = async (req,res) => {
    const { Lecturer_Name, Department_ID, Rank_, Not_Available, NO_Available_Days,
        Sunday, Monday, Tuesday, Wednesday, Thursday } = req.body;

    try{
        const [Lecturer] = await db.query(`
        insert into lecturer ( Lecturer_Name ,Department_ID, Rank_, Not_Available, NO_Available_Days,
            Sunday, Monday, Tuesday, Wednesday, Thursday )
        values (?,?,?,?,?,?,?,?,?,?)`
        ,[ Lecturer_Name, Department_ID, Rank_, Not_Available, NO_Available_Days,
            Sunday, Monday, Tuesday, Wednesday, Thursday ]);
        
        return res.status(201).json(Lecturer)
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}

module.exports.updateLecturer = async (req,res) => {
    const {Lecturer_ID, Not_Available, NO_Available_Days,Sunday, 
        Monday, Tuesday, Wednesday, Thursday } = req.body;
            let Lecturer1,Lecturer2,Lecturer3,Lecturer4,Lecturer5,Lecturer6,Lecturer7;
        
         
            try{
                if(NO_Available_Days)
                {
                    [Lecturer1] = await db.query(`
                    update lecturer set NO_Available_Days=? 
                    where Lecturer_ID= ?`
                    ,[NO_Available_Days, Lecturer_ID]);
                }
                if(Sunday){
                    [Lecturer2] = await db.query(`
                    update lecturer set Sunday=? 
                    where Lecturer_ID= ?`
                ,[Sunday, Lecturer_ID]);
                }
                if(Monday){
                    [Lecturer3] = await db.query(`
                    update lecturer set Monday=? 
                    where Lecturer_ID= ?`
                ,[Monday, Lecturer_ID]);
                }
                if(Tuesday){
                    [Lecturer4] = await db.query(`
                    update lecturer set Tuesday=?
                    where Lecturer_ID= ?`
                ,[Tuesday,  Lecturer_ID]);
                }
                if(Wednesday){
                    [Lecturer5] = await db.query(`
                    update lecturer set Wednesday=?
                    where Lecturer_ID= ?`
                ,[Wednesday, Lecturer_ID]);
                }
                if(Thursday){
                    [Lecturer6] = await db.query(`
                    update lecturer set Thursday=? 
                    where Lecturer_ID= ?`
                ,[ Thursday, Lecturer_ID]);
                }
                if(Not_Available){
                    [Lecturer7] = await db.query(`
                    update lecturer set Not_Available= ? 
                    where Lecturer_ID= ?`
                ,[Not_Available, Lecturer_ID]);
                }
            return res.status(202).json(Lecturer1+Lecturer2+Lecturer3+Lecturer4+Lecturer5+Lecturer6+Lecturer7)
            }
            catch (err) {
                res.status(400).json({err: err.message});
            }
        
}


module.exports.deleteLecturer = async (req,res) => {
    const {Lecturer_ID} = req.body;

    try{
        const [Lecturer] = await db.query(`
        delete from lecturer where Lecturer_ID = ?`,
        [Lecturer_ID]);

        return res.status(202).json(Lecturer);
    }
    catch(err){
        res.status(400).json({err: err.message});
    }
}

module.exports.totalHores = async (req, res) => {
    const { Lecturer_ID } = req.params;

    try {
        const lecturer = await db.query(`
            select Lecturer_ID, 
            sum(if(Subject_Type_ID = 1, Credit_Theoretical, 0) + if(Subject_Type_ID = 2, Credit_Practical * 3, 0) + if(Subject_Type_ID = 3, Credit_Tutorial, 0)) as Total_Hours
            from module natural join subjects
            where module.Lecturer_ID = ?
            group by module.Lecturer_ID
        `, [Lecturer_ID])

        return res.status(200).json(lecturer[0]);
    }
    catch(err){
        res.status(400).json({err: err.message});
    }
}


module.exports.checkLecturersNumber = async (req, res) => {
    try {
        const lecturers = await db.query(`
            SELECT count(distinct  ifnull(e_t_t.Lecturer_ID, null)) as lecturer, 
            count(*) - count(ifnull(e_t_t.Lecturer_ID, null)) as lecturerNull 
            FROM lecturer left outer join e_t_t on e_t_t.Lecturer_ID = lecturer.Lecturer_ID;
        `)

        return res.status(200).json(lecturers[0][0]);
    }
    catch(err){
        res.status(400).json({err: err.message});
    }
}