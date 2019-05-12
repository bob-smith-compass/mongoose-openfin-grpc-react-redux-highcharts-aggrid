const express = require('express');
const router = express.Router();


require('./routes/standup')();
require('./routes/projects')();
require('./routes/teams')();

module.exports = router;