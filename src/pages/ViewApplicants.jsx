import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getApplicantsByJob,
  updateApplicationStatus,
} from "../services/applicationService";

const ViewApplicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplicants();
  }, [jobId]);

  const loadApplicants = async () => {
    try {
      setLoading(true);

      const data = await getApplicantsByJob(jobId);

      setApplications(data.applications || []);
    } catch (error) {
      console.log("Applicants error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (applicationId, status) => {
    try {
      await updateApplicationStatus(
        applicationId,
        status
      );

      alert(`Application ${status}`);

      loadApplicants();
    } catch (error) {
      console.log("Status update error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to update application"
      );
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading applicants...</h2>
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
      <h1>Applicants</h1>

      <p style={{ color: "#666" }}>
        Review candidates who applied for this job.
      </p>

      {applications.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
            padding: "40px",
            textAlign: "center",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h2>No Applicants Yet</h2>
          <p>No candidates have applied for this job.</p>
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {applications.map((app) => (
            <div
              key={app._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                background: "white",
              }}
            >
              <h2>
                {app.applicant?.fullName ||
                  "Candidate"}
              </h2>

              <p>
                <strong>Email:</strong>{" "}
                {app.applicant?.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {app.applicant?.phone ||
                  "Not provided"}
              </p>

              <p>
                <strong>Job:</strong>{" "}
                {app.job?.title}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color:
                      app.status === "Accepted"
                        ? "green"
                        : app.status === "Rejected"
                        ? "red"
                        : "#f59e0b",
                  }}
                >
                  {app.status}
                </span>
              </p>

              <div
                style={{
                  marginTop: "15px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() =>
                    handleStatus(
                      app._id,
                      "Accepted"
                    )
                  }
                  disabled={
                    app.status === "Accepted"
                  }
                  style={{
                    padding: "10px 18px",
                    background:
                      app.status === "Accepted"
                        ? "#9ca3af"
                        : "#16a34a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor:
                      app.status === "Accepted"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  ✓ Accept
                </button>

                <button
                  onClick={() =>
                    handleStatus(
                      app._id,
                      "Rejected"
                    )
                  }
                  disabled={
                    app.status === "Rejected"
                  }
                  style={{
                    padding: "10px 18px",
                    background:
                      app.status === "Rejected"
                        ? "#9ca3af"
                        : "#dc2626",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor:
                      app.status === "Rejected"
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewApplicants;