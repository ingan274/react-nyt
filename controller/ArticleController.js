const db = require("../models");
const axios = require("axios")
const dotenv = require("dotenv");
dotenv.config({ path: '../env' });

// Defining methods for the articlsController
module.exports = {

    // findAllGoogle searches the NYT API and returns only the entries we haven't already saved
    findAllGoogle: function (req, res) {
        const search = req.params.query
        const url = `https://newsapi.org/v2/everything?q=${search}&` + process.env.APIKEY;
        axios
            .get(url)
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