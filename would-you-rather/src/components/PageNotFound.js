import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
    return (
        <div>
            <h1>404 page does not exist!!!</h1>
            <Link to='/'><button>Go Home</button></Link>
        </div>
    )    
}

export default PageNotFound;