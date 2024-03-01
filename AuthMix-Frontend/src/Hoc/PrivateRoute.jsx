import React, { useState, useEffect } from "react";
import { checkIsLoggedIn, checkValidJwtAccessToken } from "../../utility";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      
      // const loggedIn = await checkIsLoggedIn(); // For session-cokkie check
      const jwtLoggedIn= await checkValidJwtAccessToken();
      console.info(jwtLoggedIn)
      // console.info(loggedIn)
      // setIsAuthenticated(loggedIn);
      setIsAuthenticated(jwtLoggedIn);
    };

    fetchData();
  }, []);

  if (isAuthenticated === null) {
    // You can optionally render a loading spinner or message while waiting for authentication check
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
