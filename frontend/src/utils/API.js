import axios from "axios";

export default {
    scrapeArticles: params => axios.get("/articles/scrape"),

    getAllArticles: params => axios.get("/articles/"),
    
    saveArticle: (articleId, articleData) => axios.post(`/articles/save/${articleId}`, articleData),

    getSavedArticles: params => axios.get("/articles/saved/articles"),

    searchArticle: Search => axios.get(`/articles/${Search}`)
} 