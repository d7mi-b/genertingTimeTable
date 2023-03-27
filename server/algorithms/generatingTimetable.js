const db = require('../DB');
const { initialTimetable } = require('./initialTimetable');
const { getNeighbors } = require('./getNeighbors');
const { feasible } = require('./feasible');


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

        console.log('timetable from initialTimetable without hard constraints: ', feasible(candidateTimetable));

        let i = 0;

        if (candidateTimetable) {
          while (i < 1) {
            const neighborhood = getNeighbors(candidateTimetable, modules, groups, halls, days, times);
            candidateTimetable = neighborhood[0];
            i++;
          }
        }

        console.log('done from main function');

        console.log('timetable from getNeighbors without hard constraints: ', feasible(candidateTimetable));

        return res.status(200).json(candidateTimetable);
    }
    catch (err) {
        res.status(400).json({err: err.message});
    }
}


const currentTimetable = [
    {
    "Module_ID": 5,
    "Lecturer_ID": 16,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 6,
    "Lecturer_ID": 17,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 7,
    "Lecturer_ID": 18,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 1,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
    },
    {
    "Module_ID": 8,
    "Lecturer_ID": 3,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 9,
    "Lecturer_ID": 19,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 10,
    "Lecturer_ID": 20,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 2,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
    },
    {
    "Module_ID": 11,
    "Lecturer_ID": 21,
    "Group_ID": 1,
    "Hall_ID": 12,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 12,
    "Lecturer_ID": 22,
    "Group_ID": 1,
    "Hall_ID": 8,
    "Day_ID": 3,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 13,
    "Lecturer_ID": 21,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 3,
    "Start_Time": "12:00:00",
    "End_Time": "13:00:00"
    },
    {
    "Module_ID": 14,
    "Lecturer_ID": 23,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 15,
    "Lecturer_ID": 17,
    "Group_ID": 1,
    "Hall_ID": 11,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 16,
    "Lecturer_ID": 9,
    "Group_ID": 2,
    "Hall_ID": 10,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 17,
    "Lecturer_ID": 5,
    "Group_ID": 2,
    "Hall_ID": 10,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "13:00:00"
    },
    {
    "Module_ID": 18,
    "Lecturer_ID": 6,
    "Group_ID": 2,
    "Hall_ID": 10,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "11:00:00"
    },
    {
    "Module_ID": 19,
    // "Lecturer_ID": 20,
    "Group_ID": 2,
    "Hall_ID": 10,
    "Day_ID": 2,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00",
    },
    {
    "Module_ID": 20,
    "Lecturer_ID": 24,
    "Group_ID": 2,
    "Hall_ID": 10,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 21,
    "Lecturer_ID": 25,
    "Group_ID": 2,
    "Hall_ID": 10,
    "Day_ID": 4,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 22,
    "Lecturer_ID": 25,
    "Group_ID": 2,
    "Hall_ID": 12,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 23,
    "Lecturer_ID": 26,
    "Group_ID": 2,
    "Hall_ID": 19,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 24,
    "Lecturer_ID": 21,
    "Group_ID": 2,
    "Hall_ID": 13,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 25,
    "Lecturer_ID": 5,
    "Group_ID": 3,
    "Hall_ID": 14,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 26,
    "Lecturer_ID": 27,
    "Group_ID": 3,
    "Hall_ID": 14,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "14:00:00"
    },
    {
    "Module_ID": 27,
    "Lecturer_ID": 28,
    "Group_ID": 3,
    "Hall_ID": 15,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 28,
    "Lecturer_ID": 29,
    "Group_ID": 3,
    "Hall_ID": 16,
    "Day_ID": 2,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 29,
    "Lecturer_ID": 1,
    "Group_ID": 3,
    "Hall_ID": 14,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 30,
    "Lecturer_ID": 30,
    "Group_ID": 3,
    "Hall_ID": 14,
    "Day_ID": 3,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 31,
    "Lecturer_ID": 2,
    "Group_ID": 3,
    "Hall_ID": 14,
    "Day_ID": 4,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 32,
    "Lecturer_ID": 19,
    "Group_ID": 3,
    "Hall_ID": 14,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 33,
    "Lecturer_ID": 29,
    "Group_ID": 3,
    "Hall_ID": 12,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 34,
    "Lecturer_ID": 31,
    "Group_ID": 3,
    "Hall_ID": 2,
    "Day_ID": 5,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00",
    },
    {
    "Module_ID": 35,
    "Lecturer_ID": 32,
    "Group_ID": 4,
    "Hall_ID": 3,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 36,
    "Lecturer_ID": 4,
    "Group_ID": 4,
    "Hall_ID": 5,
    "Day_ID": 2,
    "Start_Time": "08:00:00",
    "End_Time": "11:00:00"
    },
    {
    "Module_ID": 37,
    "Lecturer_ID": 2,
    "Group_ID": 4,
    "Hall_ID": 5,
    "Day_ID": 2,
    "Start_Time": "11:00:00",
    "End_Time": "13:00:00"
    },
    {
    "Module_ID": 38,
    "Lecturer_ID": 29,
    "Group_ID": 4,
    "Hall_ID": 17,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 39,
    "Lecturer_ID": 28,
    "Group_ID": 4,
    "Hall_ID": 2,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 40,
    "Lecturer_ID": 32,
    "Group_ID": 4,
    "Hall_ID": 3,
    "Day_ID": 3,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 41,
    "Lecturer_ID": 1,
    "Group_ID": 4,
    "Hall_ID": 5,
    "Day_ID": 4,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 42,
    "Lecturer_ID": 4,
    "Group_ID": 4,
    "Hall_ID": 5,
    "Day_ID": 4,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 43,
    "Lecturer_ID": 33,
    "Group_ID": 4,
    "Hall_ID": 5,
    "Day_ID": 4,
    "Start_Time": "12:00:00",
    "End_Time": "14:00:00"
    },
    {
    "Module_ID": 44,
    "Lecturer_ID": 33,
    "Group_ID": 4,
    "Hall_ID": 18,
    "Day_ID": 5,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 45,
    "Lecturer_ID": 1,
    "Group_ID": 5,
    "Hall_ID": 5,
    "Day_ID": 1,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    },
    {
    "Module_ID": 46,
    "Lecturer_ID": 16,
    "Group_ID": 5,
    "Hall_ID": 5,
    "Day_ID": 1,
    "Start_Time": "10:00:00",
    "End_Time": "12:00:00"
    },
    {
    "Module_ID": 47,
    "Lecturer_ID": 34,
    "Group_ID": 5,
    "Hall_ID": 17,
    "Day_ID": 3,
    "Start_Time": "08:00:00",
    "End_Time": "10:00:00"
    }
]

const fackTimetable = [
    {
      "Module_ID": 5,
      "Lecturer_ID": 16,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 5,
      "Start_Time": "08:00:00",
      "End_Time": "10:00:00"
    },
    {
      "Module_ID": 6,
      "Lecturer_ID": 17,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 4,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 7,
      "Lecturer_ID": 18,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 3,
      "Start_Time": "08:00:00",
      "End_Time": "10:00:00"
    },
    {
      "Module_ID": 8,
      "Lecturer_ID": 3,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 5,
      "Start_Time": "13:00:00",
      "End_Time": "15:00:00"
    },
    {
      "Module_ID": 9,
      "Lecturer_ID": 19,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 4,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 10,
      "Lecturer_ID": 20,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 1,
      "Start_Time": "10:00:00",
      "End_Time": "12:00:00"
    },
    {
      "Module_ID": 11,
      "Lecturer_ID": 21,
      "Group_ID": 1,
      "Hall_ID": 12,
      "Day_ID": 3,
      "Start_Time": "11:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 12,
      "Lecturer_ID": 22,
      "Group_ID": 1,
      "Hall_ID": 8,
      "Day_ID": 2,
      "Start_Time": "13:00:00",
      "End_Time": "15:00:00"
    },
    {
      "Module_ID": 13,
      "Lecturer_ID": 21,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 5,
      "Start_Time": "11:00:00",
      "End_Time": "12:00:00"
    },
    {
      "Module_ID": 14,
      "Lecturer_ID": 23,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 1,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 15,
      "Lecturer_ID": 17,
      "Group_ID": 1,
      "Hall_ID": 1,
      "Day_ID": 4,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 16,
      "Lecturer_ID": 9,
      "Group_ID": 2,
      "Hall_ID": 11,
      "Day_ID": 1,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 17,
      "Lecturer_ID": 5,
      "Group_ID": 2,
      "Hall_ID": 11,
      "Day_ID": 5,
      "Start_Time": "15:00:00"
    },
    {
      "Module_ID": 18,
      "Lecturer_ID": 6,
      "Group_ID": 2,
      "Hall_ID": 1,
      "Day_ID": 5,
      "Start_Time": "13:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 19,
      "Lecturer_ID": 20,
      "Group_ID": 2,
      "Hall_ID": 11,
      "Day_ID": 3,
      "Start_Time": "09:00:00",
      "End_Time": "11:00:00"
    },
    {
      "Module_ID": 20,
      "Lecturer_ID": 24,
      "Group_ID": 2,
      "Hall_ID": 10,
      "Day_ID": 5,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 21,
      "Lecturer_ID": 25,
      "Group_ID": 2,
      "Hall_ID": 10,
      "Day_ID": 3,
      "Start_Time": "10:00:00",
      "End_Time": "12:00:00"
    },
    {
      "Module_ID": 22,
      "Lecturer_ID": 25,
      "Group_ID": 2,
      "Hall_ID": 17,
      "Day_ID": 1,
      "Start_Time": "11:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 23,
      "Lecturer_ID": 26,
      "Group_ID": 2,
      "Hall_ID": 19,
      "Day_ID": 2,
      "Start_Time": "09:00:00",
      "End_Time": "11:00:00"
    },
    {
      "Module_ID": 24,
      "Lecturer_ID": 21,
      "Group_ID": 2,
      "Hall_ID": 13,
      "Day_ID": 3,
      "Start_Time": "12:00:00",
      "End_Time": "14:00:00"
    },
    {
      "Module_ID": 25,
      "Lecturer_ID": 5,
      "Group_ID": 3,
      "Hall_ID": 9,
      "Day_ID": 3,
      "Start_Time": "08:00:00",
      "End_Time": "10:00:00"
    },
    {
      "Module_ID": 26,
      "Lecturer_ID": 27,
      "Group_ID": 3,
      "Hall_ID": 11,
      "Day_ID": 3,
      "Start_Time": "10:00:00",
      "End_Time": "14:00:00"
    },
    {
      "Module_ID": 27,
      "Lecturer_ID": 28,
      "Group_ID": 3,
      "Hall_ID": 17,
      "Day_ID": 5,
      "Start_Time": "08:00:00",
      "End_Time": "10:00:00"
    },
    {
      "Module_ID": 28,
      "Lecturer_ID": 29,
      "Group_ID": 3,
      "Hall_ID": 17,
      "Day_ID": 3,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 29,
      "Lecturer_ID": 1,
      "Group_ID": 3,
      "Hall_ID": 9,
      "Day_ID": 1,
      "Start_Time": "09:00:00",
      "End_Time": "11:00:00"
    },
    {
      "Module_ID": 30,
      "Lecturer_ID": 30,
      "Group_ID": 3,
      "Hall_ID": 10,
      "Day_ID": 5,
      "Start_Time": "15:00:00"
    },
    {
      "Module_ID": 31,
      "Lecturer_ID": 2,
      "Group_ID": 3,
      "Hall_ID": 10,
      "Day_ID": 1,
      "Start_Time": "13:00:00",
      "End_Time": "15:00:00"
    },
    {
      "Module_ID": 32,
      "Lecturer_ID": 19,
      "Group_ID": 3,
      "Hall_ID": 11,
      "Day_ID": 1,
      "Start_Time": "08:00:00",
      "End_Time": "10:00:00"
    },
    {
      "Module_ID": 33,
      "Lecturer_ID": 29,
      "Group_ID": 3,
      "Hall_ID": 17,
      "Day_ID": 3,
      "Start_Time": "15:00:00"
    },
    {
      "Module_ID": 34,
      "Lecturer_ID": 31,
      "Group_ID": 3,
      "Hall_ID": 19,
      "Day_ID": 4,
      "Start_Time": "08:00:00",
      "End_Time": "10:00:00"
    },
    {
      "Module_ID": 35,
      "Lecturer_ID": 32,
      "Group_ID": 4,
      "Hall_ID": 3,
      "Day_ID": 5,
      "Start_Time": "11:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 36,
      "Lecturer_ID": 4,
      "Group_ID": 4,
      "Hall_ID": 14,
      "Day_ID": 4,
      "Start_Time": "10:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 37,
      "Lecturer_ID": 2,
      "Group_ID": 4,
      "Hall_ID": 4,
      "Day_ID": 5,
      "Start_Time": "11:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 38,
      "Lecturer_ID": 29,
      "Group_ID": 4,
      "Hall_ID": 15,
      "Day_ID": 3,
      "Start_Time": "11:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 39,
      "Lecturer_ID": 28,
      "Group_ID": 4,
      "Hall_ID": 19,
      "Day_ID": 1,
      "Start_Time": "09:00:00",
      "End_Time": "11:00:00"
    },
    {
      "Module_ID": 40,
      "Lecturer_ID": 32,
      "Group_ID": 4,
      "Hall_ID": 3,
      "Day_ID": 4,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 41,
      "Lecturer_ID": 1,
      "Group_ID": 4,
      "Hall_ID": 11,
      "Day_ID": 2,
      "Start_Time": "12:00:00",
      "End_Time": "14:00:00"
    },
    {
      "Module_ID": 42,
      "Lecturer_ID": 4,
      "Group_ID": 4,
      "Hall_ID": 4,
      "Day_ID": 5,
      "Start_Time": "12:00:00",
      "End_Time": "14:00:00"
    },
    {
      "Module_ID": 43,
      "Lecturer_ID": 33,
      "Group_ID": 4,
      "Hall_ID": 5,
      "Day_ID": 2,
      "Start_Time": "11:00:00",
      "End_Time": "13:00:00"
    },
    {
      "Module_ID": 44,
      "Lecturer_ID": 33,
      "Group_ID": 4,
      "Hall_ID": 18,
      "Day_ID": 4,
      "Start_Time": "10:00:00",
      "End_Time": "12:00:00"
    },
    {
      "Module_ID": 45,
      "Lecturer_ID": 1,
      "Group_ID": 5,
      "Hall_ID": 4,
      "Day_ID": 1,
      "Start_Time": "09:00:00",
      "End_Time": "11:00:00"
    },
    {
      "Module_ID": 46,
      "Lecturer_ID": 16,
      "Group_ID": 5,
      "Hall_ID": 14,
      "Day_ID": 3,
      "Start_Time": "14:00:00",
      "End_Time": "16:00:00"
    },
    {
      "Module_ID": 47,
      "Lecturer_ID": 34,
      "Group_ID": 5,
      "Hall_ID": 2,
      "Day_ID": 5,
      "Start_Time": "10:00:00",
      "End_Time": "12:00:00"
    }
  ]