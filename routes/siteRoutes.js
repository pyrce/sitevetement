const express = require('express');
const router=express();
const siteController = require('../controller/siteController.js');

router.get("/",siteController.liste);
module.exports = router;