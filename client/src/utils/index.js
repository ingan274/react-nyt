import axios from "axios";

export default {
    getArticles: search => axios.get(`/api/google/${search}`),
    
    saveArticle: articleData => axios.post("/api/articles", articleData),

    getSavedArticles: () => axios.get("/api/articles"),

    deleteArticle: articleId => axios.delete(`/api/articles/${articleId}`)
} 