const router = require("express").Router();
const articleController = require("../controller/ArticleController");

// Matches with "/api/nyt"
router
  .route("/")
  .get(articleController.findAllGoogle);

module.exports = router;