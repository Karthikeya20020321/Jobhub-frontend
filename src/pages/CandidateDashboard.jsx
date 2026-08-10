import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications();

      setApplications(data.applications || []);
    } catch (error) {
      console.log("Failed to load applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = applications.filter(
    (application) =>
      application.status === "Pending"
  ).length;

  const acceptedCount = applications.filter(
    (application) =>
      application.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (application) =>
      application.status === "Rejected"
  ).length;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      {/* Header */}

      <div
        style={{
          padding: "30px",
          borderRadius: "12px",
          background: "#2563eb",
          color: "white",
        }}
      >
        <h1 style={{ marginTop: 0 }}>
          Candidate Dashboard
        </h1>

        <p style={{ marginBottom: 0 }}>
          Welcome, {user?.fullName || "Candidate"} 👋
        </p>
      </div>

      {/* Application Statistics */}

      <h2 style={{ marginTop: "35px" }}>
        Application Summary
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Total */}

        <div style={statCardStyle}>
          <h3>Total Applications</h3>

          <div style={statNumberStyle}>
            {loading ? "..." : applications.length}
          </div>

          <p>Applications submitted</p>
        </div>

        {/* Pending */}

        <div style={statCardStyle}>
          <h3>🟡 Pending</h3>

          <div style={statNumberStyle}>
            {loading ? "..." : pendingCount}
          </div>

          <p>Waiting for recruiter</p>
        </div>

        {/* Accepted */}

        <div style={statCardStyle}>
          <h3>🟢 Accepted</h3>

          <div style={statNumberStyle}>
            {loading ? "..." : acceptedCount}
          </div>

          <p>Applications accepted</p>
        </div>

        {/* Rejected */}

        <div style={statCardStyle}>
          <h3>🔴 Rejected</h3>

          <div style={statNumberStyle}>
            {loading ? "..." : rejectedCount}
          </div>

          <p>Applications rejected</p>
        </div>
      </div>

      {/* Main Actions */}

      <h2 style={{ marginTop: "40px" }}>
        Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {/* Search Jobs */}

        <div style={cardStyle}>
          <h2>🔎 Search Jobs</h2>

          <p>
            Find jobs based on title, location,
            experience and salary.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            style={buttonStyle}
          >
            Browse Jobs
          </button>
        </div>

        {/* My Applications */}

        <div style={cardStyle}>
          <h2>📋 My Applications</h2>

          <p>
            Track all your applications and their
            current status.
          </p>

          <button
            onClick={() =>
              navigate("/my-applications")
            }
            style={buttonStyle}
          >
            View Applications
          </button>
        </div>

        {/* Profile */}

        <div style={cardStyle}>
          <h2>👤 My Profile</h2>

          <p>
            Update your personal information,
            skills, profile photo and resume.
          </p>

          <button
            onClick={() => navigate("/profile")}
            style={buttonStyle}
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Recent Applications */}

      <div style={{ marginTop: "40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Recent Applications</h2>

          {applications.length > 0 && (
            <button
              onClick={() =>
                navigate("/my-applications")
              }
              style={{
                background: "none",
                border: "none",
                color: "#2563eb",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              View All →
            </button>
          )}
        </div>

        {loading ? (
          <p>Loading applications...</p>
        ) : applications.length === 0 ? (
          <div
            style={{
              padding: "30px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3>No applications yet</h3>

            <p style={{ color: "#666" }}>
              Start applying for jobs to see them
              here.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              style={buttonStyle}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            {applications
              .slice(0, 3)
              .map((application) => {
                const job = application.job;

                return (
                  <div
                    key={application._id}
                    style={{
                      padding: "20px",
                      border: "1px solid #ddd",
                      borderRadius: "10px",
                      background: "white",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent:
                          "space-between",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            marginTop: 0,
                            marginBottom: "5px",
                          }}
                        >
                          {job?.title ||
                            "Job unavailable"}
                        </h3>

                        <p
                          style={{
                            margin: 0,
                            color: "#666",
                          }}
                        >
                          🏢{" "}
                          {job?.company?.name ||
                            "Company"}
                        </p>

                        <p
                          style={{
                            marginBottom: 0,
                            color: "#666",
                          }}
                        >
                          📍{" "}
                          {job?.location ||
                            "Location unavailable"}
                        </p>
                      </div>

                      <span
                        style={{
                          ...getStatusStyle(
                            application.status
                          ),
                          padding: "8px 14px",
                          borderRadius: "20px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {application.status}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(
                          `/jobs/${job?._id}`
                        )
                      }
                      disabled={!job?._id}
                      style={{
                        marginTop: "15px",
                        padding: "9px 18px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                    >
                      View Job
                    </button>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Candidate Flow */}

      <div
        style={{
          marginTop: "40px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#f9fafb",
        }}
      >
        <h2>How JobHub Works</h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <Step number="1" text="Search Jobs" />
          <Step number="2" text="View Job" />
          <Step number="3" text="Apply" />
          <Step
            number="4"
            text="Track Application"
          />
          <Step
            number="5"
            text="Get Decision"
          />
        </div>
      </div>
    </div>
  );
};

const getStatusStyle = (status) => {
  if (status === "Accepted") {
    return {
      background: "#dcfce7",
      color: "#166534",
    };
  }

  if (status === "Rejected") {
    return {
      background: "#fee2e2",
      color: "#991b1b",
    };
  }

  return {
    background: "#fef3c7",
    color: "#92400e",
  };
};

const Step = ({ number, text }) => {
  return (
    <div
      style={{
        padding: "15px 20px",
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontWeight: "bold",
      }}
    >
      {number}. {text}
    </div>
  );
};

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "25px",
  background: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const buttonStyle = {
  marginTop: "15px",
  padding: "11px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const statCardStyle = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "20px",
  background: "white",
};

const statNumberStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
};

export default CandidateDashboard;