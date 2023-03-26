const db = require('../DB');
const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token require" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SECRET)

        User_ID = await db.query(`
            select user_id from users where user_id = ?
        `, [id])

        req.user = User_ID[0][0];
        next();
    }
    catch (err) {
        res.status(401).json({error: "Request is not authorized"});
    }
}

module.exports = requireAuth;