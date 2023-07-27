const db = require('../DB');

module.exports.notificationOfDepartment = async (req, res) => {
    const { Department_ID } = req.params;

    try {
        const [notification] = await db.query(`
            select * from notification where Department_ID = ?
        `, [Department_ID]);

        return res.status(200).json(notification);
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports.sendNotification = async (req, res) => {
    const { Notification_Text, Department_ID } = req.body;

    try {
        const [notification] = await db.query(`
            insert into notification (Notification_Text, Department_ID, Notification_state)
            values (?, ?, 0)
        `, [Notification_Text, Department_ID]);


        return res.status(201).json(notification);
    } catch (err) {
        return res.status(400).json(err)
    }
}

module.exports.updateNotificationState = async (req, res) => {
    const { Notification_ID } = req.body;

    try {
        const [notification] = await db.query(`
            update notification set Notification_state = 1
            where Notification_ID = ?
        `, [Notification_ID]);


        return res.status(201).json(notification);
    } catch (err) {
        return res.status(400).json(err)
    }
}