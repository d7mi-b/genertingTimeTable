const express = require('express');
const usersControllers = require('../controllers/usersController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', usersControllers.login);

router.use(requireAuth);

router.get('/', usersControllers.getUsers);
router.post('/addUsers', usersControllers.addUser);
router.get('/getUsersType', usersControllers.getUsersTypes);
router.delete('/deleteUser', usersControllers.deleteUser);
router.put('/updateUser', usersControllers.updateUser);


module.exports = router;