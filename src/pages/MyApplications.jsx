import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";

const MyApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const data = await getMyApplications();

      setApplications(data.applications || []);
    } catch (error) {
      console.log("Applications Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingCard}>
          <div style={iconStyle}>📋</div>
          <h2>Loading Applications...</h2>
          <p>Please wait while we load your applications.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div>
          <h1 style={headerTitle}>My Applications</h1>

          <p style={headerSubtitle}>
            Track all the jobs you have applied for and monitor
            your application status.
          </p>
        </div>

        <button
          onClick={() => navigate("/jobs")}
          style={primaryButton}
        >
          🔎 Browse Jobs
        </button>
      </div>

      {/* Application Count */}
      <div style={countCard}>
        <div style={countIcon}>📋</div>

        <div>
          <h3 style={{ margin: 0 }}>Total Applications</h3>

          <p style={countNumber}>
            {applications.length}
          </p>

          <p style={countText}>
            Applications submitted
          </p>
        </div>
      </div>

      {/* No Applications */}
      {applications.length === 0 ? (
        <div style={emptyCard}>
          <div style={emptyIcon}>📭</div>

          <h2>No Applications Yet</h2>

          <p>
            You have not applied for any jobs yet.
            Start exploring available opportunities.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            style={primaryButton}
          >
            🔎 Find Jobs
          </button>
        </div>
      ) : (
        /* Applications */
        <div style={applicationsGrid}>
          {applications.map((application) => {
            const job = application.job;

            return (
              <div
                key={application._id}
                style={applicationCard}
              >
                {/* Card Header */}
                <div style={cardHeader}>
                  <div>
                    <h2 style={jobTitle}>
                      {job?.title ||
                        "Job Title Not Available"}
                    </h2>

                    <p style={companyName}>
                      🏢{" "}
                      {job?.company?.name ||
                        "Company"}
                    </p>
                  </div>

                  <span
                    style={{
                      ...statusBadge,
                      ...getStatusStyle(
                        application.status
                      ),
                    }}
                  >
                    {application.status || "Pending"}
                  </span>
                </div>

                {/* Job Information */}
                <div style={jobInfo}>
                  <div style={infoItem}>
                    <span>📍</span>
                    <span>
                      {job?.location ||
                        "Location not specified"}
                    </span>
                  </div>

                  <div style={infoItem}>
                    <span>💰</span>
                    <span>
                      ₹
                      {job?.salary
                        ? Number(
                            job.salary
                          ).toLocaleString("en-IN")
                        : "Not specified"}
                    </span>
                  </div>

                  <div style={infoItem}>
                    <span>📅</span>
                    <span>
                      Applied on:{" "}
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>

                {/* Status Message */}
                {application.status ===
                  "Accepted" && (
                  <div style={acceptedMessage}>
                    🎉 Congratulations! Your application
                    has been accepted.
                  </div>
                )}

                {application.status ===
                  "Rejected" && (
                  <div style={rejectedMessage}>
                    Your application was not selected
                    for this position.
                  </div>
                )}

                {application.status ===
                  "Pending" && (
                  <div style={pendingMessage}>
                    ⏳ Your application is still under
                    review.
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={() =>
                    navigate(
                      `/jobs/${job?._id}`
                    )
                  }
                  disabled={!job?._id}
                  style={{
                    ...viewButton,
                    opacity: job?._id ? 1 : 0.5,
                    cursor: job?._id
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  👁 View Job
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* =========================================
   PAGE
========================================= */

const pageStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

/* =========================================
   HEADER
========================================= */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "30px",
};

const headerTitle = {
  margin: 0,
  fontSize: "32px",
  color: "#111827",
};

const headerSubtitle = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "16px",
};

/* =========================================
   COUNT CARD
========================================= */

const countCard = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "25px",
  marginBottom: "30px",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
};

const countIcon = {
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  background: "#eff6ff",
  fontSize: "28px",
};

const countNumber = {
  margin: "5px 0",
  fontSize: "30px",
  fontWeight: "bold",
  color: "#2563eb",
};

const countText = {
  margin: 0,
  color: "#6b7280",
};

/* =========================================
   APPLICATION GRID
========================================= */

const applicationsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
};

/* =========================================
   APPLICATION CARD
========================================= */

const applicationCard = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "25px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "15px",
};

const jobTitle = {
  margin: 0,
  fontSize: "21px",
  color: "#111827",
};

const companyName = {
  marginTop: "8px",
  color: "#6b7280",
};

const statusBadge = {
  padding: "7px 13px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

/* =========================================
   JOB INFORMATION
========================================= */

const jobInfo = {
  marginTop: "20px",
  paddingTop: "18px",
  borderTop: "1px solid #e5e7eb",
  display: "grid",
  gap: "12px",
};

const infoItem = {
  display: "flex",
  gap: "10px",
  color: "#4b5563",
};

/* =========================================
   STATUS MESSAGES
========================================= */

const acceptedMessage = {
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  background: "#f0fdf4",
  color: "#166534",
  fontWeight: "600",
};

const rejectedMessage = {
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  background: "#fef2f2",
  color: "#991b1b",
  fontWeight: "600",
};

const pendingMessage = {
  marginTop: "20px",
  padding: "12px",
  borderRadius: "8px",
  background: "#fffbeb",
  color: "#92400e",
};

/* =========================================
   BUTTONS
========================================= */

const primaryButton = {
  padding: "11px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const viewButton = {
  width: "100%",
  marginTop: "20px",
  padding: "11px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
};

/* =========================================
   EMPTY STATE
========================================= */

const emptyCard = {
  padding: "60px 30px",
  textAlign: "center",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
};

const emptyIcon = {
  fontSize: "50px",
  marginBottom: "10px",
};

/* =========================================
   LOADING
========================================= */

const loadingCard = {
  padding: "60px 30px",
  textAlign: "center",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
};

const iconStyle = {
  fontSize: "45px",
  marginBottom: "10px",
};

export default MyApplications;