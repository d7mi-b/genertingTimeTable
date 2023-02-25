const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const hallsController = require('../controllers/hallsController');

const router = express.Router();

router.use(requireAuth);

router.get('/', hallsController.getHalls);
router.get('/Info', hallsController.getHallsInfo);
router.post('/addHall', hallsController.addHall);
router.put('/updateHall', hallsController.updateHall);
router.delete('/deleteHall', hallsController.deleteHall);
router.get('/building/:Building_ID', hallsController.hallsOfBuilding);
router.get('/department/:Department_ID', hallsController.hallsOfDepartment);

module.exports = router;