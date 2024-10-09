import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Element, loggedIn, ...rest }) {
  return loggedIn ? <Element {...rest} /> : <Navigate to="/" />;
}

export default ProtectedRoute;
