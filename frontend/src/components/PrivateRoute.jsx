import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children }) => {
  if (user === null) {
    return <Navigate to="/Login" />;
  }
  return children;
};

export default PrivateRoute;
