const router = require("express").Router();
const articleController = require("../controller/ArticleController");

// Matches with "/api/google/:query"
router
  .route("/:query")
  .get(articleController.findAllGoogle);

module.exports = router;