const express = require('express');
const router = express.Router();
const scope = require('./../sockets/scope');

router.get('/api/scope', function(req, res, next) {
  res.send(scope);
});



module.exports = router;
