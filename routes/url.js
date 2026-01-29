const express = require('express');
const { handleGenerateNewShortURL, handleGetAnalytics, handleGetById, } = require('../controller/url');

const router = express.Router();

 
router.get('/:shortId', handleGetById)

router.post('/', handleGenerateNewShortURL)
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router