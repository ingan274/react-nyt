  import React from "react";
import "./style.css";

const Card = props => (
    <div className="card">
        <div className="card-header">{props.cardTitle}</div>
        {props.children}
    </div>
)

export default Card; 