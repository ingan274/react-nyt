const db = require("../models");
const cheerio = require("cheerio");
const axios = require("../../frontend/node_modules/axios")

// Defining methods for the booksController
module.exports = {
    scrape: function (req, res) {
        axios.get("https://www.huffpost.com/news/politics/").then(function (response) {
            var $ = cheerio.load(response.data);
            $("div.card").each(function (i, element) {
                let link = $(element).children("a").attr("href");
                let title = $(element).children(".card__text").children(".card__headlines").text()
                let author = $(element).children(".card__text").children(".card__byline").children(".author-list").children(".card__byline__author").text()
                let blurb = $(element).children(".card__text").children(".card__description").text()
                // console.log(element)

                if (link && title && author && blurb) {
                    let article = {
                        title: title,
                        link: link,
                        author: author,
                        description: blurb,
                        saved: false
                    }
                    // console.log(article);
                    db.Article.find({ link: article.link })
                        .then(foundArticle => {
                            if (!foundArticle.length) {
                                db.Article.create(article)
                                    .then()
                                    .catch(error => console.log(error));
                            }
                        })
                        .catch(error => console.log(error));
                }

            });
            // res.json({message: "Scrape Complete"});
        })
            .catch(error => console.log(error));
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
            .find({ saved: true })
            .sort({ '_id': -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findOneArticle: function (req, res) {
        db.Article
            .findOne({ _id: req.params.articleId })
            .populate("note")
            .then(updatedArticle => {
                res.sendStatus(200);
                // console.log(updatedArticle)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    saveOneArticle: function (req, res) {
        db.Article.findOneAndUpdate({ _id: req.params.articleId }, { saved: request.body.saved }, { new: true })
            .then(updatedArticle => {
                res.send("Save status updated.");
                res.sendStatus(200);
                // console.log(updatedArticle)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(500);
            });
    },
    createNote: function (req, res) {
        db.Note.create({ body: req.body.note })
            .then(createdNote => {
                return db.Article.findOneAndUpdate({ _id: req.body.articleId }, { $push: { note: createdNote._id } }, { new: true })
                    .then(addedNote => {
                        console.log("Note added.");
                        res.sendStatus(200)
                        // console.log(addedNote)
                    })
                    .catch(err => {
                        console.log(err);
                        res.sendStatus(500);
                    });
            })
    },
    removeNote: function (req, res) {
        db.Note.deleteOne({ _id: req.params.noteId })
        .then(deletedNote => {
            res.send("Note deleted.");
            res.sendStatus(200);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    }
};