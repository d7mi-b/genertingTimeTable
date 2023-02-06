const db = require('../DB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.SECRET, {expiresIn: "3d"})
}

module.exports.login = async (req, res) => {
    const { User_Name, Password } = req.body;

    if (!User_Name || !Password)
        throw Error('يجب ملء جميع الحقول');

    try {
        const [ user ] = await db.query(`
            select * from users where User_Name = ?
        `, [User_Name]);

        if (user.length === 0) {
            throw Error('إسم المستخدم غير صحيح');
        }

        const match = await bcrypt.compare(Password, user[0].Password);

        if (!match) {
            throw Error('كلمة المرور غير صحيحة');
        }

        const token = createToken(user[0].User_ID);

        return res.status(200).json({token, name: user[0].Name, type: user[0].User_Type_ID});
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}

module.exports.getUsers = async (req, res) => {
    try {
        const [ row ] = await db.query('select * from users');
        return res.status(200).json(row);
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.getUsersTypes = async (req, res) => {
    try {
        const [ row ] = await db.query('select * from user_type');
        return res.status(200).json(row);
    }
    catch(err) {
        return res.status(400).json({err: err.message})
    }
}

module.exports.addUser = async (req, res) => {
    const {  User_Name, Password, Name, Department_ID, User_Type_ID } = req.body;

    if (!User_Name || !Password || !Name || !Department_ID || !User_Type_ID)
        throw Error('يجب ملء جميع الحقول');

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(Password, salt);

    try {
        const [ result ] = await db.query(`
            insert into users ( Name, User_Name, Password, Department_ID, User_Type_ID) 
            values(?, ?, ?, ?, ?)
        `, [ Name, User_Name, hash, Department_ID, User_Type_ID]);
        
        return res.status(200).json(result);
    }
    catch(err) {
        res.status(400).json({err: err.message});
    }
}