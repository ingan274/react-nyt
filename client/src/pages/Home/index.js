import React, { Component } from "react";
import API from "../../utils";
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

    // done
    componentDidMount = () => {
        this.getSavedArticles();
    }

    // done
    getArticles = () => {
        const search = this.state.q
        API.getArticles(search)
            .then(res => {

                if (res.data.articles) {
                    this.setState({
                        articles: res.data.articles,
                        articlesNum: true
                    })

                    // console.log("result", res.data.articles)
                    // console.log("result", this.state.articles)
                } else {
                    this.setState({
                        articles: [],
                        articlesNum: false
                    })
                }

            })
            .catch(err => console.log(err));
    }

      // working
    getSavedArticles = () => {
        API.getSavedArticles()
            .then(res => {
                // console.log("saved response", res)
                if (res.data.length) {
                    this.setState({
                        savedArticles: res.data,
                        savedArticlesNum: true
                    })
                    // console.log("saved",res.data)
                    // console.log("saved", this.state.savedArticles)
                } else {
                    this.setState({
                        savedArticles: [],
                        savedArticlesNum: false
                    })
                }

            })
            .catch(err => console.log(err));
    }

    // working
    handleArticleSave = title => {
        const saveArticle = this.state.articles.find(article => article.title === title);
        console.log(saveArticle)
        // alert("Article Saved")
        API.saveArticle(saveArticle)
            .then(res => {
                // this.getArticles();
                this.getSavedArticles();
            })
            .catch(err => {
                console.log(err)
            });
        
    }

    handleArticleDelete = id => {
        // console.log("id",id)
        API.deleteArticle(id)
            .then(res => {
                console.log(res)
                // this.getArticles();
                this.getSavedArticles();
            })
            .catch (err => console.log(err))
    }

    // done
    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    // done
    handleFormSubmit = event => {
        event.preventDefault();
        this.getArticles();
    }

    // done
    renderResults = () => {
        if (this.state.articlesNum) {
            return (
                <Card cardTitle="Results">
                    <ul className="list-group list-group-flush">
                        {this.state.articles.map(article => (
                            <Article
                                key={article.title}
                                _id={article.title}
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
                                author={article.author}
                                url={article.url}
                                description={article.description}
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