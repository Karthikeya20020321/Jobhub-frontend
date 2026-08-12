import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminApplications = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.get("/admin/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications(response.data.applications || []);
    } catch (error) {
      console.log("Admin applications error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load applications"
      );

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

  const handleStatus = async (applicationId, status) => {
    try {
      setUpdating(applicationId);

      const token = localStorage.getItem("token");

      const response = await API.put(
        `/admin/applications/${applicationId}`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Application updated successfully"
      );

      setApplications((currentApplications) =>
        currentApplications.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
              }
            : application
        )
      );
    } catch (error) {
      console.log("Update application error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update application"
      );
    } finally {
      setUpdating(null);
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
          <div style={loadingIcon}>📋</div>

          <h2>Loading Applications...</h2>

          <p>
            Please wait while we load all JobHub applications.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* HEADER */}

      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>
            Manage Applications
          </h1>

          <p style={subtitleStyle}>
            Review and manage all job applications on JobHub.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin")}
          style={backButton}
        >
          ← Admin Dashboard
        </button>
      </div>

      {/* SUMMARY CARD */}

      <div style={summaryCard}>
        <div style={summaryIcon}>📋</div>

        <div>
          <p style={summaryLabel}>
            Total Applications
          </p>

          <h2 style={summaryNumber}>
            {applications.length}
          </h2>
        </div>
      </div>

      {/* APPLICATIONS */}

      {applications.length === 0 ? (
        <div style={emptyCard}>
          <div style={emptyIcon}>📭</div>

          <h2>No Applications Found</h2>

          <p>
            There are currently no job applications on JobHub.
          </p>
        </div>
      ) : (
        <div style={applicationsGrid}>
          {applications.map((application) => (
            <div
              key={application._id}
              style={applicationCard}
            >
              {/* CARD HEADER */}

              <div style={cardHeader}>
                <div>
                  <h2 style={jobTitle}>
                    {application.job?.title ||
                      "Job Title Not Available"}
                  </h2>

                  <p style={companyName}>
                    🏢{" "}
                    {application.job?.company?.name ||
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

              {/* JOB DETAILS */}

              <div style={detailsSection}>
                <div style={detailItem}>
                  <span style={detailIcon}>👤</span>

                  <div>
                    <small style={detailLabel}>
                      Candidate
                    </small>

                    <p style={detailValue}>
                      {application.applicant?.fullName ||
                        "Unknown"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>📧</span>

                  <div>
                    <small style={detailLabel}>
                      Email
                    </small>

                    <p style={detailValue}>
                      {application.applicant?.email ||
                        "Not available"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>📱</span>

                  <div>
                    <small style={detailLabel}>
                      Phone
                    </small>

                    <p style={detailValue}>
                      {application.applicant?.phone ||
                        "Not provided"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>📍</span>

                  <div>
                    <small style={detailLabel}>
                      Location
                    </small>

                    <p style={detailValue}>
                      {application.job?.location ||
                        "Not specified"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>💰</span>

                  <div>
                    <small style={detailLabel}>
                      Salary
                    </small>

                    <p style={detailValue}>
                      {application.job?.salary
                        ? `₹${Number(
                            application.job.salary
                          ).toLocaleString("en-IN")}`
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>📅</span>

                  <div>
                    <small style={detailLabel}>
                      Applied On
                    </small>

                    <p style={detailValue}>
                      {application.createdAt
                        ? new Date(
                            application.createdAt
                          ).toLocaleDateString("en-IN")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* DIVIDER */}

              <div style={divider}></div>

              {/* STATUS */}

              <div style={statusSection}>
                <span style={statusTitle}>
                  Application Status
                </span>

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

              {/* ACTIONS */}

              <div style={actionsSection}>
                <button
                  onClick={() =>
                    handleStatus(
                      application._id,
                      "Accepted"
                    )
                  }
                  disabled={
                    updating === application._id ||
                    application.status === "Accepted"
                  }
                  style={{
                    ...acceptButton,
                    opacity:
                      application.status === "Accepted"
                        ? 0.5
                        : 1,
                    cursor:
                      updating === application._id ||
                      application.status === "Accepted"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {updating === application._id
                    ? "Updating..."
                    : "✓ Accept"}
                </button>

                <button
                  onClick={() =>
                    handleStatus(
                      application._id,
                      "Rejected"
                    )
                  }
                  disabled={
                    updating === application._id ||
                    application.status === "Rejected"
                  }
                  style={{
                    ...rejectButton,
                    opacity:
                      application.status === "Rejected"
                        ? 0.5
                        : 1,
                    cursor:
                      updating === application._id ||
                      application.status === "Rejected"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {updating === application._id
                    ? "Updating..."
                    : "✕ Reject"}
                </button>

                <button
                  onClick={() =>
                    handleStatus(
                      application._id,
                      "Pending"
                    )
                  }
                  disabled={
                    updating === application._id ||
                    application.status === "Pending"
                  }
                  style={{
                    ...pendingButton,
                    opacity:
                      application.status === "Pending"
                        ? 0.5
                        : 1,
                    cursor:
                      updating === application._id ||
                      application.status === "Pending"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {updating === application._id
                    ? "Updating..."
                    : "⏳ Pending"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ==========================================
   PAGE STYLE
========================================== */

const pageStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "30px 20px",
};

/* ==========================================
   HEADER
========================================== */

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const titleStyle = {
  margin: 0,
  fontSize: "32px",
  color: "#111827",
};

const subtitleStyle = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "16px",
};

/* ==========================================
   BACK BUTTON
========================================== */

const backButton = {
  padding: "11px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px",
};

/* ==========================================
   SUMMARY
========================================== */

const summaryCard = {
  marginTop: "30px",
  padding: "20px 25px",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
  background: "white",
  display: "flex",
  alignItems: "center",
  gap: "18px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const summaryIcon = {
  width: "55px",
  height: "55px",
  borderRadius: "12px",
  background: "#dbeafe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "26px",
};

const summaryLabel = {
  margin: 0,
  color: "#6b7280",
  fontSize: "14px",
};

const summaryNumber = {
  margin: "3px 0 0",
  fontSize: "28px",
  color: "#2563eb",
};

/* ==========================================
   APPLICATION GRID
========================================== */

const applicationsGrid = {
  marginTop: "30px",
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(480px, 1fr))",
  gap: "20px",
};

/* ==========================================
   APPLICATION CARD
========================================== */

const applicationCard = {
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "25px",
  background: "white",
  boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "15px",
};

const jobTitle = {
  margin: 0,
  color: "#111827",
  fontSize: "21px",
};

const companyName = {
  margin: "8px 0 0",
  color: "#2563eb",
  fontWeight: "600",
};

/* ==========================================
   DETAILS
========================================== */

const detailsSection = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "18px",
  marginTop: "25px",
};

const detailItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
};

const detailIcon = {
  fontSize: "18px",
};

const detailLabel = {
  color: "#9ca3af",
  fontSize: "12px",
};

const detailValue = {
  margin: "3px 0 0",
  color: "#374151",
  fontSize: "14px",
  wordBreak: "break-word",
};

/* ==========================================
   STATUS
========================================== */

const statusBadge = {
  display: "inline-block",
  padding: "7px 13px",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "bold",
  whiteSpace: "nowrap",
};

const statusSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const statusTitle = {
  fontWeight: "600",
  color: "#374151",
};

/* ==========================================
   DIVIDER
========================================== */

const divider = {
  height: "1px",
  background: "#e5e7eb",
  margin: "22px 0",
};

/* ==========================================
   ACTION BUTTONS
========================================== */

const actionsSection = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
  marginTop: "20px",
};

const acceptButton = {
  padding: "10px 18px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

const rejectButton = {
  padding: "10px 18px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

const pendingButton = {
  padding: "10px 18px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

/* ==========================================
   EMPTY / LOADING
========================================== */

const emptyCard = {
  marginTop: "30px",
  padding: "60px 30px",
  textAlign: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  background: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const emptyIcon = {
  fontSize: "45px",
  marginBottom: "10px",
};

const loadingCard = {
  padding: "70px 30px",
  textAlign: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  background: "white",
  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
};

const loadingIcon = {
  fontSize: "45px",
  marginBottom: "10px",
};

export default AdminApplications;