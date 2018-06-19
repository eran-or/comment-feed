const express = require("express");
const router = express.Router();

const CommentsController = require('../controllers/comments');

router.get("/", CommentsController.get_all_comments);
router.post("/", CommentsController.create_comment);
router.get("/:commentId", CommentsController.get_comment);
router.delete("/:commentId", CommentsController.delete_comment);

module.exports = router;
