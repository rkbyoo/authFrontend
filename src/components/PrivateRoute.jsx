import React from 'react'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({isLoggedIn,child}) => {
if(isLoggedIn){
    return child;
}
else{
    return(<Navigate to="/login"/>)
}
}

export default PrivateRoute

