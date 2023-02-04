const express = require('express');
const usersControllers = require('../controllers/usersController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.post('/login', usersControllers.login);

router.use(requireAuth);

router.post('/addUsers', usersControllers.addUser);
router.get('/', usersControllers.getUsers);
router.get('/getUsersType', usersControllers.getUsersTypes);


module.exports = router;