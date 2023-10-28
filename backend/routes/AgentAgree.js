const express = require('express');
const {
    GetAgents
} = require('../controllers/AgentAgreeController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.get('/', GetAgents);

module.exports = router;