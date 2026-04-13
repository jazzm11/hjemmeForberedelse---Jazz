const express = require('express');
const router = express.Router();
const foxController = require('../controllers/foxController');

// Hent to tilfeldige bilder fra API
router.get('/', foxController.getRandomFox);

// API-rute for å registrere stemme
router.post('/api/fox/vote', foxController.voteFox);
// API-rute for å hente nye bilder
router.get('/api/fox/new', foxController.getNewFox);

// Statistik side
router.get('/stats', foxController.getStats);

module.exports = router;