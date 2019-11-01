import React, { Component } from "react";
import API from "../../utils/api";
import Card from "../../components/Card";
import Article from "../../components/Article";
import "./style.css";

class Home extends Component {
    state = {
        articles: [],
        articlesNum: false,
        savedArticles: [],
        savedArticlesNum: false,
        q: ""
    }

    componentDidMount = () => {
        this.getArticles();
        this.getSavedArticles();
    }

    getArticles = () => {
        const search = this.state.q
        API.getArticles(search)
            .then(res => {
                if (res.data.articles) {
                    this.setState({
                        articles: res.data.articles,
                        articlesNum: true
                    })
                    // console.log("result",res.data.articles)
                    console.log("result", this.state.articles)
                } else {
                    this.setState({
                        articles: [],
                        articlesNum: false
                    })
                    // console.log("result",res.data.articles)
                    console.log("result", this.state.articles)
                }

            })
            .catch(err => console.log(err));
    }

    getSavedArticles = () => {
        API.getSavedArticles()
        .then(res => {
            if (res.length) {
                this.setState({
                    // savedArticles: [res.data.articles],
                    savedArticlesNum: true
                })
                // console.log("result",res.data.articles)
                console.log("result", this.state.savedArticles)
            } else {
                this.setState({
                    savedArticles: [],
                    savedArticlesNum: false
                })
                // console.log("result",res.data.articles)
                console.log("result", this.state.articles)
            }

        })
            .catch(err => console.log(err));
    }

    handleArticleSave = id => {
        const savedArticle = this.state.articles.find(article => article._id === id);
        API.saveArticle(savedArticle)
            .then(res => {
                this.getArticles();
                this.getSavedArticles();
            });
    }

    handleArticleDelete = id => {
        API.deleteArticle(id)
            .then(res => {
                this.getArticles();
                this.getSavedArticles();
            })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        this.getArticles();
    }

    renderResults = () => {
        if (this.state.articlesNum) {
            return (
                <Card cardTitle="Results">
                    <ul className="list-group list-group-flush">
                        {this.state.articles.map(article => (
                            <Article
                                title={article.title}
                                url={article.url}
                                description={article.description}
                                author={article.author}
                                handleClick={this.handleArticleSave}
                                handleDelete={this.handleArticleDelete}
                                buttonText="Save Article"
                            />
                        ))}
                    </ul>
                </Card>
            )
        } else {
            return (
                <Card cardTitle="Results">
                    <p className="noResults"> No Articles found. Please put in a search.</p>
                </Card>
            )
        }
    }

    renderSaved = () => {
        if (this.state.savedArticlesNum) {
            return (
                <Card cardTitle="Saved">
                    <ul className="list-group list-group-flush">
                        {this.state.savedArticles.map(article => (
                            <Article
                                key={article._id}
                                _id={article._id}
                                title={article.title}
                                url={article.url}
                                date={article.date}
                                handleClick={this.handleArticleDelete}
                                buttonText="Delete Article"
                            />
                        ))}
                    </ul>
                </Card>
            )
        } else {
            return (
                <Card cardTitle="Saved">
                    <p className="noResults"> No Articles where saved</p>
                </Card>
            )
        }
    }

    render = () => (
        <div className="container">
            <Card cardTitle="Search">
                <form className="text-center">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="topic"
                            name="q"
                            value={this.state.q}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <button className="btn" onClick={this.handleFormSubmit}>Search</button>
                </form>
            </Card>

            {this.renderResults()}
            {this.renderSaved()}

        </div>
    )
}

export default Home;