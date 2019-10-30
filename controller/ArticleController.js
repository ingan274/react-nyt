const db = require("../models");
const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config({ path: '../env' });

// Defining methods for the booksController
module.exports = {
    findAllGoogle: function (req, res) {
        var url = 'https://newsapi.org/v2/top-headlines?' +
            'country=us&' + process.env.APIKEY;
        const { query: params } = req;
        axios
            .get(url, {
                params
            })
            .then(results =>
                results.data.items.filter(
                    result =>
                        result.articles.title &&
                        result.articles.description &&
                        result.articles.url &&
                        result.articles.urlToImage
                )
            )
            .then(apiNews =>
                db.Book.find().then(dbArticles =>
                    apiNews.filter(apiNews =>
                        dbArticles.every(dbArticles => dbArticles._id.toString() !== apiNews.id)
                    )
                )
            )
            .then(articles => res.json(articles))
            .catch(err => res.status(422).json(err));
    },
    findAllArticles: function (req, res) {
        db.Article
            .find(req.query)
            .sort({ '_id': -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findSavedArticles: function (req, res) {
        db.Article
            .find(req.query)
            .sort({ date: -1 })
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    },
    findArticles: function (req, res) {
        db.Article
            .find({ $text: { $search: req.params.search } })
            .then(updatedArticle => {
                res.sendStatus(200);
                // console.log(updatedArticle)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    create: function (req, res) {
        const article = {
            _id: req.body._id,
            title: req.body.headline.main,
            url: req.body.web_url
        };
        db.Article
            .create(article)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Article
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Article
            .findById({ _id: req.params.id })
            .then(dbArticle => dbArticle.remove())
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    }
};