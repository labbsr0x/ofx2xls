const express = require('express');
const router = express.Router();
const conversion = require('../modules/conversion')

router.post('/upload', async function(request, response) {
    conversion.convertOfx2xls(request, response);
});

module.exports = router;
