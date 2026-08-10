import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminDashboard = () => {
const navigate = useNavigate();

const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
loadDashboard();
}, []);

const loadDashboard = async () => {
try {
setLoading(true);

  const token = localStorage.getItem("token");

  const response = await API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  setStats(response.data.stats);
} catch (error) {
  console.log("Admin dashboard error:", error);

  const message =
    error.response?.data?.message ||
    "Failed to load admin dashboard";

  alert(message);

  if (
    error.response?.status === 401 ||
    error.response?.status === 403
  ) {
    navigate("/");
  }
} finally {
  setLoading(false);
}

};

if (loading) {
return (
<div
style={{
maxWidth: "1200px",
margin: "50px auto",
padding: "20px",
textAlign: "center",
}}
> <h2>Loading Admin Dashboard...</h2> </div>
);
}

if (!stats) {
return (
<div
style={{
maxWidth: "1200px",
margin: "50px auto",
padding: "20px",
textAlign: "center",
}}
> <h2>Unable to load dashboard</h2>

    <button
      onClick={loadDashboard}
      style={buttonStyle}
    >
      Try Again
    </button>
  </div>
);

}

return (
<div
style={{
maxWidth: "1200px",
margin: "40px auto",
padding: "20px",
}}
>
{/* HEADER */}

  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "15px",
    }}
  >
    <div>
      <h1>Admin Dashboard</h1>

      <p style={{ color: "#666" }}>
        Manage and monitor your JobHub platform.
      </p>
    </div>

    <button
      onClick={loadDashboard}
      style={buttonStyle}
    >
      🔄 Refresh
    </button>
  </div>

  {/* USER STATISTICS */}

  <h2 style={{ marginTop: "35px" }}>
    User Statistics
  </h2>

  <div style={gridStyle}>
    <StatCard
      title="Total Users"
      value={stats.totalUsers}
      icon="👥"
      color="#2563eb"
    />

    <StatCard
      title="Candidates"
      value={stats.totalCandidates}
      icon="👤"
      color="#16a34a"
    />

    <StatCard
      title="Recruiters"
      value={stats.totalRecruiters}
      icon="💼"
      color="#9333ea"
    />
  </div>

  {/* JOB STATISTICS */}

  <h2 style={{ marginTop: "35px" }}>
    Job Statistics
  </h2>

  <div style={gridStyle}>
    <StatCard
      title="Total Jobs"
      value={stats.totalJobs}
      icon="📋"
      color="#ea580c"
    />
  </div>

  {/* APPLICATION STATISTICS */}

  <h2 style={{ marginTop: "35px" }}>
    Application Statistics
  </h2>

  <div style={gridStyle}>
    <StatCard
      title="Total Applications"
      value={stats.totalApplications}
      icon="📝"
      color="#2563eb"
    />

    <StatCard
      title="Pending"
      value={stats.pendingApplications}
      icon="⏳"
      color="#f59e0b"
    />

    <StatCard
      title="Accepted"
      value={stats.acceptedApplications}
      icon="✅"
      color="#16a34a"
    />

    <StatCard
      title="Rejected"
      value={stats.rejectedApplications}
      icon="❌"
      color="#dc2626"
    />
  </div>

  {/* QUICK ACTIONS */}

  <div
    style={{
      marginTop: "40px",
      padding: "25px",
      border: "1px solid #ddd",
      borderRadius: "12px",
      background: "#f9fafb",
    }}
  >
    <h2>Admin Controls</h2>

    <p style={{ color: "#666" }}>
      Manage users, jobs, and applications.
    </p>

    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      <button
        onClick={() => navigate("/admin/users")}
        style={buttonStyle}
      >
        👥 Manage Users
      </button>

      <button
        onClick={() => navigate("/admin/jobs")}
        style={buttonStyle}
      >
        💼 Manage Jobs
      </button>

      <button
        onClick={() =>
          navigate("/admin/applications")
        }
        style={buttonStyle}
      >
        📋 Applications
      </button>
    </div>
  </div>
</div>

);
};

const StatCard = ({
title,
value,
icon,
color,
}) => {
return (
<div
style={{
background: "white",
border: "1px solid #ddd",
borderRadius: "12px",
padding: "25px",
boxShadow:
"0 2px 8px rgba(0,0,0,0.05)",
borderLeft: `5px solid ${color}`,
}}
>
<div
style={{
fontSize: "30px",
}}
>
{icon} </div>

  <h3
    style={{
      marginTop: "10px",
      color: "#555",
    }}
  >
    {title}
  </h3>

  <p
    style={{
      fontSize: "32px",
      fontWeight: "bold",
      margin: "5px 0 0",
      color,
    }}
  >
    {value ?? 0}
  </p>
</div>

);
};

const gridStyle = {
display: "grid",
gridTemplateColumns:
"repeat(auto-fit, minmax(220px, 1fr))",
gap: "20px",
marginTop: "20px",
};

const buttonStyle = {
padding: "11px 20px",
background: "#2563eb",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

export default AdminDashboard;
