import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
const { user, logout } = useContext(AuthContext);
const navigate = useNavigate();

const handleLogout = () => {
logout();
navigate("/login");
};

return (
<nav
style={{
display: "flex",
justifyContent: "space-between",
alignItems: "center",
padding: "15px 40px",
background: "#2563eb",
color: "white",
}}
>
<h2 style={{ margin: 0 }}>JobHub</h2>

  <div
    style={{
      display: "flex",
      gap: "20px",
      alignItems: "center",
      flexWrap: "wrap",
    }}
  >
    {/* Common */}
    <Link
      to="/"
      style={{ color: "white", textDecoration: "none" }}
    >
      Home
    </Link>

    <Link
      to="/jobs"
      style={{ color: "white", textDecoration: "none" }}
    >
      Jobs
    </Link>

    {/* Candidate */}
    {user?.role === "candidate" && (
      <>
        <Link
          to="/profile"
          style={{ color: "white", textDecoration: "none" }}
        >
          Profile
        </Link>

        <Link
          to="/candidate"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/my-applications"
          style={{ color: "white", textDecoration: "none" }}
        >
          My Applications
        </Link>
      </>
    )}

    {/* Recruiter */}
    {user?.role === "recruiter" && (
      <>
        <Link
          to="/recruiter"
          style={{ color: "white", textDecoration: "none" }}
        >
          Dashboard
        </Link>

        <Link
          to="/create-company"
          style={{ color: "white", textDecoration: "none" }}
        >
          Create Company
        </Link>

        <Link
          to="/my-companies"
          style={{ color: "white", textDecoration: "none" }}
        >
          My Companies
        </Link>

        <Link
          to="/create-job"
          style={{ color: "white", textDecoration: "none" }}
        >
          Create Job
        </Link>

        <Link
          to="/my-jobs"
          style={{ color: "white", textDecoration: "none" }}
        >
          My Jobs
        </Link>
      </>
    )}

    {/* Admin */}
    {user?.role === "admin" && (
      <>
        <Link
          to="/admin"
          style={{
            color: "white",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Admin Dashboard
        </Link>

        <Link
          to="/admin/users"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Manage Users
        </Link>

        <Link
          to="/admin/jobs"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Manage Jobs
        </Link>

        <Link
          to="/admin/applications"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Applications
        </Link>
      </>
    )}

    {/* Not Logged In */}
    {!user ? (
      <>
        <Link
          to="/login"
          style={{ color: "white", textDecoration: "none" }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{ color: "white", textDecoration: "none" }}
        >
          Register
        </Link>
      </>
    ) : (
      <>
        <span>
          Hi, {user.fullName}
        </span>

        <button
          onClick={handleLogout}
          style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </>
    )}
  </div>
</nav>

);
};

export default Navbar;
