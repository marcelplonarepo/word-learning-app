const express = require('express');
const router = express.Router();

const wordsController = require('../controllers/words');

router.get('/read', wordsController.read);
router.get('/read/:category', wordsController.category);
router.post('/create', wordsController.create);
router.get('/words', wordsController.wordsList);

module.exports = router;