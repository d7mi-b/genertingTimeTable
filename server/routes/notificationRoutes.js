const express = require('express');
const notificationController = require('../controllers/notificationController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.get('/:Department_ID', notificationController.notificationOfDepartment);
router.post('/send', notificationController.sendNotification);
router.put('/update/:Notification_ID', notificationController.updateNotificationState);

module.exports = router;