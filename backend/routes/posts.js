
const express = require("express");

const checkAuth = require("../middleware/check-auth")

const postController = require("../controllers/post")

const extractFile = require("../middleware/file")
const router = express.Router();


router.post("",checkAuth, extractFile, postController.postData);

router.get("", postController.getData);

router.get("/:id", postController.fatchDataById);

router.put("/:id", checkAuth, extractFile, postController.putData );

router.delete("/:id", checkAuth, postController.deleteData);

module.exports = router;
