import React from "react";
import { Route } from "react-router-dom";
import Login from "./Login";



function ProtectedRoute({component : Component, isAuthenticated, ...restOfProps}) {
   
    return(
        <Route {...restOfProps}
        render = {(props) => 
            (isAuthenticated ? <Component {...props} /> : <Login />)
        } 
        
        />
    );
}

export default ProtectedRoute;