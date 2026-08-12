import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.get("/admin/jobs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(response.data.jobs || []);
    } catch (error) {
      console.log("Admin jobs error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load jobs"
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

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(jobId);

      const token = localStorage.getItem("token");

      const response = await API.delete(
        `/admin/jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "Job deleted successfully"
      );

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job._id !== jobId
        )
      );
    } catch (error) {
      console.log("Delete job error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={loadingCard}>
          <div style={loadingIcon}>💼</div>
          <h2>Loading Jobs...</h2>
          <p>Please wait while we load all JobHub jobs.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* HEADER */}

      <div style={headerStyle}>
        <div>
          <h1 style={titleStyle}>Manage Jobs</h1>

          <p style={subtitleStyle}>
            View and manage all jobs posted on JobHub.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin")}
          style={backButton}
        >
          ← Admin Dashboard
        </button>
      </div>

      {/* STATISTICS */}

      <div style={statsGrid}>
        <div style={statCard}>
          <div style={statIcon}>💼</div>

          <div>
            <p style={statLabel}>Total Jobs</p>

            <h2 style={statNumber}>
              {jobs.length}
            </h2>
          </div>
        </div>

        <div style={statCard}>
          <div style={statIcon}>📋</div>

          <div>
            <p style={statLabel}>Platform</p>

            <h2 style={statNumber}>JobHub</h2>
          </div>
        </div>
      </div>

      {/* JOBS */}

      <div style={sectionHeader}>
        <div>
          <h2 style={{ margin: 0 }}>
            All Jobs
          </h2>

          <p style={subtitleStyle}>
            Jobs currently available on the platform.
          </p>
        </div>

        <button
          onClick={loadJobs}
          style={refreshButton}
        >
          🔄 Refresh
        </button>
      </div>

      {jobs.length === 0 ? (
        <div style={emptyStyle}>
          <div style={emptyIcon}>📋</div>

          <h2>No Jobs Found</h2>

          <p>
            There are currently no jobs posted on
            JobHub.
          </p>
        </div>
      ) : (
        <div style={jobsGrid}>
          {jobs.map((job) => (
            <div
              key={job._id}
              style={jobCard}
            >
              {/* JOB HEADER */}

              <div style={jobHeader}>
                <div style={jobIcon}>
                  💼
                </div>

                <div style={{ flex: 1 }}>
                  <h2 style={jobTitle}>
                    {job.title ||
                      "Untitled Job"}
                  </h2>

                  <p style={companyName}>
                    🏢{" "}
                    {job.company?.name ||
                      "Company not specified"}
                  </p>
                </div>
              </div>

              {/* JOB DETAILS */}

              <div style={detailsContainer}>
                <div style={detailItem}>
                  <span style={detailIcon}>
                    📍
                  </span>

                  <div>
                    <small style={detailLabel}>
                      Location
                    </small>

                    <p style={detailValue}>
                      {job.location ||
                        "Not specified"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>
                    💰
                  </span>

                  <div>
                    <small style={detailLabel}>
                      Salary
                    </small>

                    <p style={detailValue}>
                      ₹
                      {job.salary
                        ? Number(
                            job.salary
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "Not specified"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>
                    💼
                  </span>

                  <div>
                    <small style={detailLabel}>
                      Job Type
                    </small>

                    <p style={detailValue}>
                      {job.jobType ||
                        "Not specified"}
                    </p>
                  </div>
                </div>

                <div style={detailItem}>
                  <span style={detailIcon}>
                    👨‍💻
                  </span>

                  <div>
                    <small style={detailLabel}>
                      Experience
                    </small>

                    <p style={detailValue}>
                      {job.experienceLevel ||
                        "Not specified"}
                    </p>
                  </div>
                </div>
              </div>

              {/* POSTED BY */}

              <div style={postedBox}>
                <div>
                  <small style={detailLabel}>
                    Posted By
                  </small>

                  <p style={postedValue}>
                    👤{" "}
                    {job.createdBy?.fullName ||
                      "Unknown recruiter"}
                  </p>
                </div>

                <div>
                  <small style={detailLabel}>
                    Posted On
                  </small>

                  <p style={postedValue}>
                    📅{" "}
                    {job.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )
                      : "N/A"}
                  </p>
                </div>
              </div>

              {/* ACTION */}

              <div style={actionContainer}>
                <button
                  onClick={() =>
                    handleDelete(job._id)
                  }
                  disabled={
                    deleting === job._id
                  }
                  style={{
                    ...deleteButton,
                    background:
                      deleting === job._id
                        ? "#9ca3af"
                        : "#dc2626",
                    cursor:
                      deleting === job._id
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {deleting === job._id
                    ? "Deleting..."
                    : "🗑 Delete Job"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* =========================
   STYLES
========================= */

const containerStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "30px",
};

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
  color: "#666",
  marginTop: "8px",
};

const backButton = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "20px",
  marginTop: "30px",
};

const statCard = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  padding: "22px",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  boxShadow:
    "0 2px 8px rgba(0,0,0,0.05)",
};

const statIcon = {
  width: "55px",
  height: "55px",
  borderRadius: "10px",
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "28px",
};

const statLabel = {
  margin: 0,
  color: "#666",
  fontSize: "14px",
};

const statNumber = {
  margin: "5px 0 0",
  fontSize: "26px",
  color: "#2563eb",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "40px",
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "15px",
};

const refreshButton = {
  padding: "10px 18px",
  background: "#f3f4f6",
  color: "#111827",
  border: "1px solid #ddd",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};

const jobsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
};

const jobCard = {
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "22px",
  boxShadow:
    "0 2px 8px rgba(0,0,0,0.05)",
  transition: "0.2s",
};

const jobHeader = {
  display: "flex",
  alignItems: "flex-start",
  gap: "15px",
};

const jobIcon = {
  width: "50px",
  height: "50px",
  borderRadius: "10px",
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};

const jobTitle = {
  margin: 0,
  color: "#111827",
  fontSize: "21px",
};

const companyName = {
  marginTop: "7px",
  color: "#2563eb",
  fontWeight: "bold",
};

const detailsContainer = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(130px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const detailItem = {
  display: "flex",
  gap: "8px",
  alignItems: "flex-start",
};

const detailIcon = {
  fontSize: "18px",
};

const detailLabel = {
  color: "#777",
  fontSize: "12px",
};

const detailValue = {
  margin: "3px 0 0",
  color: "#111827",
  fontWeight: "500",
  fontSize: "14px",
};

const postedBox = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "15px",
  marginTop: "20px",
  padding: "15px",
  background: "#f9fafb",
  borderRadius: "8px",
};

const postedValue = {
  margin: "4px 0 0",
  fontSize: "14px",
  fontWeight: "500",
};

const actionContainer = {
  marginTop: "20px",
  paddingTop: "15px",
  borderTop: "1px solid #eee",
};

const deleteButton = {
  width: "100%",
  padding: "11px 18px",
  color: "white",
  border: "none",
  borderRadius: "7px",
  fontWeight: "bold",
};

const emptyStyle = {
  marginTop: "30px",
  padding: "60px 30px",
  textAlign: "center",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "#f9fafb",
};

const emptyIcon = {
  fontSize: "45px",
};

const loadingCard = {
  textAlign: "center",
  padding: "60px 30px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "white",
};

const loadingIcon = {
  fontSize: "45px",
};

export default AdminJobs;