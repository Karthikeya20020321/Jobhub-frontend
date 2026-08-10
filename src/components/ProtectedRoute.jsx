import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({
children,
allowedRoles,
}) => {
const { user } = useContext(AuthContext);

// Not logged in
if (!user) {
return <Navigate to="/login" replace />;
}

// Role restriction
if (
allowedRoles &&
!allowedRoles.includes(user.role)
) {
if (user.role === "candidate") {
return <Navigate to="/candidate" replace />;
}

if (user.role === "recruiter") {
  return <Navigate to="/recruiter" replace />;
}

if (user.role === "admin") {
  return <Navigate to="/admin" replace />;
}

return <Navigate to="/" replace />;

}

return children;
};

export default ProtectedRoute;
