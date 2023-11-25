const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const batchesController = require('../controllers/batchesController');

const router = express.Router();

router.use(requireAuth);

router.get('/department/:Department_ID', batchesController.getBatchesOfDepartment);
router.get('/batchType',batchesController.batchType)
router.delete('/deleteGroup',batchesController.deleteGroup)
router.put('/updateBatch',batchesController.updateBatch)
router.put('/updateGroup',batchesController.updateGroup)
router.post('/addGroup',batchesController.addGroup)
router.get('/groups/:Department_ID', batchesController.getGroupsOfDepartment);

module.exports = router;