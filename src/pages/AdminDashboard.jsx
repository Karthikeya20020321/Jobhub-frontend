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
      <div style={pageStyle}>
        <div style={loadingCardStyle}>
          <div style={loadingIconStyle}>⚙️</div>
          <h2>Loading Admin Dashboard...</h2>
          <p style={{ color: "#6b7280" }}>
            Please wait while we load your dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={pageStyle}>
        <div style={loadingCardStyle}>
          <div style={loadingIconStyle}>⚠️</div>

          <h2>Unable to Load Dashboard</h2>

          <p style={{ color: "#6b7280" }}>
            Something went wrong while loading the admin dashboard.
          </p>

          <button onClick={loadDashboard} style={primaryButtonStyle}>
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* ================= HEADER ================= */}

      <div style={headerStyle}>
        <div>
          <span style={badgeStyle}>ADMIN PANEL</span>

          <h1 style={titleStyle}>Admin Dashboard</h1>

          <p style={subtitleStyle}>
            Manage and monitor your JobHub platform.
          </p>
        </div>

        <button onClick={loadDashboard} style={refreshButtonStyle}>
          🔄 Refresh
        </button>
      </div>

      {/* ================= USER STATISTICS ================= */}

      <h2 style={sectionTitleStyle}>User Statistics</h2>

      <div style={gridStyle}>
        <StatCard
          title="Total Users"
          value={stats.totalUsers}
          icon="👥"
          color="#2563eb"
          description="Registered users"
        />

        <StatCard
          title="Candidates"
          value={stats.totalCandidates}
          icon="👤"
          color="#16a34a"
          description="Job seekers"
        />

        <StatCard
          title="Recruiters"
          value={stats.totalRecruiters}
          icon="💼"
          color="#9333ea"
          description="Hiring professionals"
        />
      </div>

      {/* ================= JOB STATISTICS ================= */}

      <h2 style={sectionTitleStyle}>Job Statistics</h2>

      <div style={gridStyle}>
        <StatCard
          title="Total Jobs"
          value={stats.totalJobs}
          icon="📋"
          color="#ea580c"
          description="Jobs posted"
        />

        <StatCard
          title="Platform Activity"
          value={stats.totalJobs}
          icon="📊"
          color="#0891b2"
          description="Active job listings"
        />
      </div>

      {/* ================= APPLICATION STATISTICS ================= */}

      <h2 style={sectionTitleStyle}>Application Statistics</h2>

      <div style={gridStyle}>
        <StatCard
          title="Total Applications"
          value={stats.totalApplications}
          icon="📝"
          color="#2563eb"
          description="Applications received"
        />

        <StatCard
          title="Pending"
          value={stats.pendingApplications}
          icon="⏳"
          color="#f59e0b"
          description="Waiting for review"
        />

        <StatCard
          title="Accepted"
          value={stats.acceptedApplications}
          icon="✅"
          color="#16a34a"
          description="Successful applications"
        />

        <StatCard
          title="Rejected"
          value={stats.rejectedApplications}
          icon="❌"
          color="#dc2626"
          description="Rejected applications"
        />
      </div>

      {/* ================= ADMIN CONTROLS ================= */}

      <h2 style={sectionTitleStyle}>Admin Controls</h2>

      <div style={actionGridStyle}>
        {/* Users */}

        <button
          onClick={() => navigate("/admin/users")}
          style={actionCardStyle}
        >
          <div style={actionIconStyle}>👥</div>

          <h3 style={actionTitleStyle}>Manage Users</h3>

          <p style={actionDescriptionStyle}>
            View and manage registered candidates and recruiters.
          </p>

          <span style={actionLinkStyle}>
            Manage Users →
          </span>
        </button>

        {/* Jobs */}

        <button
          onClick={() => navigate("/admin/jobs")}
          style={actionCardStyle}
        >
          <div style={actionIconStyle}>💼</div>

          <h3 style={actionTitleStyle}>Manage Jobs</h3>

          <p style={actionDescriptionStyle}>
            Review and manage jobs posted on JobHub.
          </p>

          <span style={actionLinkStyle}>
            Manage Jobs →
          </span>
        </button>

        {/* Applications */}

        <button
          onClick={() => navigate("/admin/applications")}
          style={actionCardStyle}
        >
          <div style={actionIconStyle}>📋</div>

          <h3 style={actionTitleStyle}>Applications</h3>

          <p style={actionDescriptionStyle}>
            Monitor job applications and their statuses.
          </p>

          <span style={actionLinkStyle}>
            View Applications →
          </span>
        </button>
      </div>

      {/* ================= PLATFORM OVERVIEW ================= */}

      <div style={overviewStyle}>
        <div>
          <span style={badgeStyle}>JOBHUB</span>

          <h2 style={{ margin: "10px 0 5px" }}>
            Platform Overview
          </h2>

          <p style={{ color: "#6b7280", margin: 0 }}>
            Keep track of users, jobs and applications from one place.
          </p>
        </div>

        <div style={overviewStatsStyle}>
          <div>
            <strong>{stats.totalUsers ?? 0}</strong>
            <span>Users</span>
          </div>

          <div>
            <strong>{stats.totalJobs ?? 0}</strong>
            <span>Jobs</span>
          </div>

          <div>
            <strong>{stats.totalApplications ?? 0}</strong>
            <span>Applications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =====================================================
   STAT CARD
===================================================== */

const StatCard = ({
  title,
  value,
  icon,
  color,
  description,
}) => {
  return (
    <div
      style={{
        ...statCardStyle,
        borderTop: `4px solid ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <p style={statTitleStyle}>{title}</p>

          <div
            style={{
              ...statNumberStyle,
              color,
            }}
          >
            {value ?? 0}
          </div>
        </div>

        <div
          style={{
            ...statIconStyle,
            background: `${color}15`,
          }}
        >
          {icon}
        </div>
      </div>

      <p style={statDescriptionStyle}>
        {description}
      </p>
    </div>
  );
};

/* =====================================================
   STYLES
===================================================== */

const pageStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
  padding: "30px",
  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
  borderRadius: "16px",
  color: "white",
  boxShadow: "0 8px 25px rgba(37, 99, 235, 0.20)",
};

const badgeStyle = {
  display: "inline-block",
  padding: "5px 10px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.18)",
  fontSize: "12px",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const titleStyle = {
  margin: "12px 0 5px",
  fontSize: "32px",
};

const subtitleStyle = {
  margin: 0,
  opacity: 0.9,
  fontSize: "16px",
};

const sectionTitleStyle = {
  marginTop: "40px",
  marginBottom: "5px",
  fontSize: "22px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const statCardStyle = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "22px",
  boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
};

const statTitleStyle = {
  margin: 0,
  color: "#4b5563",
  fontSize: "15px",
  fontWeight: "600",
};

const statNumberStyle = {
  fontSize: "34px",
  fontWeight: "bold",
  marginTop: "8px",
};

const statIconStyle = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const statDescriptionStyle = {
  marginTop: "15px",
  marginBottom: 0,
  color: "#6b7280",
  fontSize: "14px",
};

const actionGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const actionCardStyle = {
  textAlign: "left",
  padding: "25px",
  minHeight: "190px",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  background: "white",
  cursor: "pointer",
  boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
  transition: "0.2s",
};

const actionIconStyle = {
  fontSize: "35px",
  marginBottom: "10px",
};

const actionTitleStyle = {
  margin: "5px 0",
  fontSize: "19px",
};

const actionDescriptionStyle = {
  color: "#6b7280",
  lineHeight: "1.5",
  minHeight: "45px",
};

const actionLinkStyle = {
  display: "inline-block",
  marginTop: "10px",
  color: "#2563eb",
  fontWeight: "bold",
};

const primaryButtonStyle = {
  marginTop: "15px",
  padding: "11px 22px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const refreshButtonStyle = {
  padding: "11px 20px",
  background: "white",
  color: "#2563eb",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const loadingCardStyle = {
  background: "white",
  padding: "50px",
  borderRadius: "16px",
  textAlign: "center",
  border: "1px solid #e5e7eb",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};

const loadingIconStyle = {
  fontSize: "45px",
  marginBottom: "10px",
};

const overviewStyle = {
  marginTop: "40px",
  padding: "25px",
  borderRadius: "14px",
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "30px",
  flexWrap: "wrap",
};

const overviewStatsStyle = {
  display: "flex",
  gap: "30px",
  flexWrap: "wrap",
};

const buttonStyle = primaryButtonStyle;

export default AdminDashboard;