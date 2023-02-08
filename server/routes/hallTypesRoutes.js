const exprees = require('express');
const requireAuth = require('../middleware/requireAuth');
const hallTypesControoler = require('../controllers/hallTypeController');

const router = exprees.Router();

router.use(requireAuth);

router.get('/', hallTypesControoler.getHallTypes);
router.post('/addHallType', hallTypesControoler.addHallType);
router.delete('/deleteHallType', hallTypesControoler.deleteHallType);
router.put('/updateHallType', hallTypesControoler.updateHallType);

module.exports = router;