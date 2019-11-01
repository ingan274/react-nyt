import React from "react";

const Article = props => (
    <li className="list-group-item">
        <p className="articleTitle"><a href={props.url} rel="noopener noreferrer" target="_blank">{props.title}</a></p>
        <p className="articleDesc">{props.description}</p>
        <button className="btn" onClick={() => props.handleClick(props._id)}>
            {props.buttonText}
        </button>
    </li>
)

export default Article;