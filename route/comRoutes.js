const express = require("express");
const router = express();
const comController=require("../controller/commentsController.js");

router.put("/commentaires", comController.ajout);
module.exports = router;
