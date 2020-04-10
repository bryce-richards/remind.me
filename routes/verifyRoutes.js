const express = require('express');
const verifyController = require('../controllers/verifyController');

const router = express.Router();

router.post('/phone/new', verifyController.requestCode);

router.post('/phone/', verifyController.checkCode);

module.exports = router;