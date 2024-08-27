
const express = require('express');
const router = express.Router();
const { getUsers, getServices } = require('../controllers/adminController');

router.get('/users', getUsers);
router.get('/services', getServices);

module.exports = router;