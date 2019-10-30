import axios from "axios";
import filterParams from "./filterParams";

export default {
    getArticles: params => axios.get("/api/google", { params: filterParams(params) }),
    
    saveArticle: articleData => axios.post("/api/articles", articleData),

    getSavedArticles: articleData => axios.get("/api/articles"),

    deleteArticle: articleId => axios.delete(`/api/articles/${articleId}`)
} 