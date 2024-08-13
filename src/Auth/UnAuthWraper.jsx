import {jwtDecode} from "jwt-decode";
import { Navigate } from "react-router-dom";

function isTokenExpired(token) {
  const decodedToken = jwtDecode(token);
  const currentTime = Math.trunc(Date.now() / 1000);
  return currentTime > decodedToken.exp;
}

function UnAuthWraper(WrappedComponent) {
  const HOC = (props) => {
    const storedAccessToken = localStorage.getItem('accessToken');
    // return <WrappedComponent {...props} />;

    if (!storedAccessToken || isTokenExpired(storedAccessToken)) {
      return <WrappedComponent {...props} />;
    } else {
      return <Navigate to="/" replace={true} />;
    }
  };

  return HOC;
}

export default UnAuthWraper
