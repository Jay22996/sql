// routes/index.js

const express = require('express');
const router = express.Router();
const dataController = require('../controller/main');

router.get('/data', dataController.getData);
router.get('/', dataController.chart);


module.exports = router;
