import React, { Component } from "react";
import API from "../../utils/API";
import Card from "../../components/Card";
import Article from "../../components/Article";
import "./style.css";

class Home extends Component {
    state = {
        articles: [],
        savedArticles: [],
        q: ""
    }

    componentDidMount = () => {
        this.getArticles();
        this.getSavedArticles();
    }

    getArticles = () => {
        API.searchArticle({
            q: this.state.q
        })
            .then(res => this.setState({ articles: res.data }))
            .catch(err => console.log(err));
    }

    getSavedArticles = () => {
        API.getSavedArticles()
            .then(res => this.setState({ savedArticles: res.data }))
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

    formatDate = date => {
        if (date) {
            const formattedDate = date + "0101";
            return formattedDate;
        } else {
            return date;
        }
    }

    render = () => (
        <React.Fragment>
            <Card>
                <form className="text-center">
                    <div className="form-group row">
                        <input
                            type="text"
                            className="form-control searchInput"
                            id="topic"
                            name="q"
                            value={this.state.q}
                            onChange={this.handleInputChange}
                        />
                    </div>

                    <button className="btn " onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </Card>
            <Card cardTitle="Results">
                <ul className="list-group list-group-flush">
                    {this.state.articles.map(article => (
                        <Article
                            key={article._id}
                            _id={article._id}
                            title={article.headline.main}
                            url={article.web_url}
                            date={article.pub_date}
                            handleClick={this.handleArticleSave}
                            handleDelete={this.handleArticleDelete}
                            buttonText="Save Article"
                            buttonColor="warning"
                        />
                    ))}
                </ul>
            </Card>
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
                            buttonColor="outline-warning"
                        />
                    ))}
                </ul>
            </Card>
        </React.Fragment>
    )
}

export default Home;