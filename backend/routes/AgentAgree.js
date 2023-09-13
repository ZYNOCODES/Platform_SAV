const express = require('express');
const {
    GetAgents
} = require('../controllers/AgentAgreeController');

const router = express.Router();

router.get('/', GetAgents);

module.exports = router;