const router = require("express").Router();
const articleController = require("../controller/ArticleController");

// "/api/articles/scrape"
router
  .route("/scrape")
  .get(articleController.scrape);

// "/api/articles/"
router
  .route("/")
  .get(articleController.findAllArticles);

router
  .route("/saved/articles")
  .get(articleController.findSavedArticles);

router
  .route("/:id")
  .get(articleController.saveOneArticle);

// "/api/articles/:id"
router
  .route("/:id")
  .get(articleController.findOneArticle)
  .post(articleController.createNote)
  .delete(articleController.removeNote);

module.exports = router;