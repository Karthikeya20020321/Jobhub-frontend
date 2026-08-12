import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyJobs, deleteJob } from "../services/jobService";

const MyJobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      setLoading(true);

      const data = await getMyJobs();

      setJobs(data.jobs || []);
    } catch (error) {
      console.log("My jobs error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await deleteJob(id);

      alert("Job deleted successfully");

      loadJobs();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.loadingBox}>
          <div style={styles.spinner}></div>
          <h2>Loading your jobs...</h2>
          <p>Please wait while we fetch your job postings.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.smallTitle}>
              RECRUITER DASHBOARD
            </div>

            <h1 style={styles.title}>
              My Jobs
            </h1>

            <p style={styles.subtitle}>
              Manage and track the jobs posted by you.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-job")}
            style={styles.createButton}
          >
            + Create New Job
          </button>
        </div>

        {/* Job count */}
        {jobs.length > 0 && (
          <div style={styles.countBox}>
            <span style={styles.countNumber}>
              {jobs.length}
            </span>

            <span style={styles.countText}>
              {jobs.length === 1
                ? "Job Posted"
                : "Jobs Posted"}
            </span>
          </div>
        )}

        {/* Empty State */}
        {jobs.length === 0 ? (
          <div style={styles.emptyBox}>
            <div style={styles.emptyIcon}>
              💼
            </div>

            <h2 style={styles.emptyTitle}>
              No Jobs Posted Yet
            </h2>

            <p style={styles.emptyText}>
              You haven't created any job postings.
              Start hiring by creating your first job.
            </p>

            <button
              onClick={() => navigate("/create-job")}
              style={styles.createButton}
            >
              + Create Your First Job
            </button>
          </div>
        ) : (

          /* Jobs */
          <div style={styles.jobsGrid}>
            {jobs.map((job) => (
              <div
                key={job._id}
                style={styles.jobCard}
              >

                {/* Job Header */}
                <div style={styles.jobHeader}>
                  <div>
                    <h2 style={styles.jobTitle}>
                      {job.title}
                    </h2>

                    <p style={styles.companyName}>
                      🏢{" "}
                      {job.company?.name ||
                        "Company"}
                    </p>
                  </div>

                  <span style={styles.jobTypeBadge}>
                    {job.jobType}
                  </span>
                </div>

                {/* Description */}
                <p style={styles.description}>
                  {job.description
                    ? job.description.length > 160
                      ? `${job.description.substring(
                          0,
                          160
                        )}...`
                      : job.description
                    : "No description provided."}
                </p>

                {/* Job Information */}
                <div style={styles.infoGrid}>

                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>
                      📍
                    </span>

                    <div>
                      <span style={styles.infoLabel}>
                        Location
                      </span>

                      <span style={styles.infoValue}>
                        {job.location ||
                          "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>
                      💰
                    </span>

                    <div>
                      <span style={styles.infoLabel}>
                        Salary
                      </span>

                      <span style={styles.infoValue}>
                        {job.salary
                          ? `₹${Number(
                              job.salary
                            ).toLocaleString(
                              "en-IN"
                            )}`
                          : "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>
                      👨‍💻
                    </span>

                    <div>
                      <span style={styles.infoLabel}>
                        Experience
                      </span>

                      <span style={styles.infoValue}>
                        {job.experienceLevel ||
                          "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.infoIcon}>
                      👥
                    </span>

                    <div>
                      <span style={styles.infoLabel}>
                        Positions
                      </span>

                      <span style={styles.infoValue}>
                        {job.position || 0}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Requirements */}
                {job.requirements && (
                  <div style={styles.requirementsBox}>
                    <span style={styles.requirementsTitle}>
                      Requirements
                    </span>

                    <p style={styles.requirementsText}>
                      {job.requirements}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div style={styles.actions}>

                  <button
                    onClick={() =>
                      navigate(
                        `/applicants/${job._id}`
                      )
                    }
                    style={styles.applicantsButton}
                  >
                    👥 View Applicants
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        `/edit-job/${job._id}`
                      )
                    }
                    style={styles.editButton}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(job._id)
                    }
                    style={styles.deleteButton}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================
   STYLES
========================= */

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f8fafc 0%, #eef4ff 100%)",
    padding: "40px 20px",
    boxSizing: "border-box",
  },

  container: {
    maxWidth: "1200px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
    flexWrap: "wrap",
  },

  smallTitle: {
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    marginBottom: "8px",
  },

  title: {
    margin: "0",
    fontSize: "36px",
    fontWeight: "800",
    color: "#111827",
  },

  subtitle: {
    marginTop: "8px",
    color: "#6b7280",
    fontSize: "16px",
  },

  createButton: {
    padding: "13px 22px",
    background:
      "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    boxShadow:
      "0 5px 15px rgba(37, 99, 235, 0.25)",
  },

  countBox: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    background: "white",
    border: "1px solid #e5e7eb",
    padding: "10px 16px",
    borderRadius: "10px",
    marginBottom: "25px",
    boxShadow:
      "0 2px 8px rgba(0,0,0,0.04)",
  },

  countNumber: {
    color: "#2563eb",
    fontWeight: "800",
    fontSize: "18px",
  },

  countText: {
    color: "#6b7280",
    fontSize: "14px",
  },

  jobsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(500px, 1fr))",
    gap: "22px",
  },

  jobCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.06)",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease",
  },

  jobHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "15px",
    marginBottom: "15px",
  },

  jobTitle: {
    margin: "0 0 7px",
    color: "#111827",
    fontSize: "23px",
    fontWeight: "750",
  },

  companyName: {
    margin: "0",
    color: "#4b5563",
    fontSize: "14px",
    fontWeight: "600",
  },

  jobTypeBadge: {
    background: "#eff6ff",
    color: "#2563eb",
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  description: {
    color: "#6b7280",
    lineHeight: "1.6",
    fontSize: "14px",
    marginBottom: "20px",
  },

  infoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2, 1fr)",
    gap: "12px",
    marginBottom: "20px",
  },

  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "12px",
  },

  infoIcon: {
    fontSize: "18px",
  },

  infoLabel: {
    display: "block",
    color: "#9ca3af",
    fontSize: "11px",
    marginBottom: "3px",
  },

  infoValue: {
    display: "block",
    color: "#374151",
    fontSize: "13px",
    fontWeight: "600",
  },

  requirementsBox: {
    background: "#f8fafc",
    borderRadius: "10px",
    padding: "14px",
    marginBottom: "20px",
  },

  requirementsTitle: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#374151",
  },

  requirementsText: {
    margin: "6px 0 0",
    color: "#6b7280",
    fontSize: "13px",
    lineHeight: "1.5",
  },

  actions: {
    display: "flex",
    gap: "9px",
    paddingTop: "18px",
    borderTop: "1px solid #f0f0f0",
    flexWrap: "wrap",
  },

  applicantsButton: {
    flex: "1",
    minWidth: "150px",
    padding: "11px 14px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  editButton: {
    padding: "11px 18px",
    background: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  deleteButton: {
    padding: "11px 18px",
    background: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
  },

  emptyBox: {
    background: "white",
    borderRadius: "18px",
    padding: "70px 30px",
    textAlign: "center",
    border: "1px solid #e5e7eb",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.05)",
  },

  emptyIcon: {
    fontSize: "50px",
    marginBottom: "15px",
  },

  emptyTitle: {
    margin: "0 0 10px",
    color: "#111827",
  },

  emptyText: {
    maxWidth: "500px",
    margin: "0 auto 25px",
    color: "#6b7280",
    lineHeight: "1.6",
  },

  loadingBox: {
    maxWidth: "500px",
    margin: "100px auto",
    textAlign: "center",
    background: "white",
    padding: "50px",
    borderRadius: "16px",
    boxShadow:
      "0 5px 20px rgba(0,0,0,0.05)",
  },

  spinner: {
    width: "35px",
    height: "35px",
    border: "4px solid #e5e7eb",
    borderTop:
      "4px solid #2563eb",
    borderRadius: "50%",
    margin: "0 auto 20px",
  },
};

export default MyJobs;
