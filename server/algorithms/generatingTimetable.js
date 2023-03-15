const db = require('../DB');
const { initialTimetable } = require('./initialTimetable');
const { getNeighbors } = require('./getNeighbors');

module.exports.generatingTimetable = async (req, res) => {
    try {

        const [ modules ] = await db.query(`
            select Module_ID, module.Semester_ID, module.Subject_ID, Lecturer_ID, 
            module.Department_ID, Hall_Type_ID, Subject_Type_ID, Credit_Theoretical, Credit_Practical, Credit_Tutorial 
            from module join subjects on subjects.Subject_ID = module.Subject_ID;
        `);

        const [ groups ] = await db.query(`
            select Group_ID, Group_Count, batches.Semester_ID, batches.Department_ID from batch_groups 
            join batches on batch_groups.Batch_ID = batches.Batch_ID;
        `)

        const [ halls ] = await db.query(`
            select Hall_ID, Hall_Type_ID, Hall_Capacity from halls
        `);

        const [ days ] = await db.query(`
            select * from day
        `);

        const [ times ] = await db.query(`
            select * from time
        `);

        let bestTimetable = 0;
        let candidateTimetable = await initialTimetable(modules, groups, halls, days, times);
        let tabuList = [];

        let i = 0;

        while (i < 1) {
            const neighborhood = getNeighbors(candidateTimetable, modules, groups, halls, days, times);
            candidateTimetable = neighborhood[0];
            i++;
        }

        console.log('done from main function')

        return res.status(200).json(candidateTimetable);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}