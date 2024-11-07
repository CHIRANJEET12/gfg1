const express = require('express');
const { getAuthenticatedImages } = require('../controllers/imageController');
const router = express.Router();

router.get('/', getAuthenticatedImages);

module.exports = router;

