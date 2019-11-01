const express = require('express');
const router = express.Router();
const articleController = require("../controller/ArticleController");

// Matches with "/api/articles"
router.route("/")
  .get(articleController.findAllArticles)
  .post(articleController.create);

// Matches with "/api/articles/:search"
router
  .route("/:search")
  .put(articleController.update)
  .delete(articleController.remove);

module.exports = router;