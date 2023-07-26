const express = require('express');
const pdfController = require('../controllers/pdfController');

const router = express.Router();

router.get('/Scheduels', pdfController.getScheduels);


module.exports = router;