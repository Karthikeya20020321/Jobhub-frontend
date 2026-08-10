import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getJobById } from "../services/jobService";

import {
  applyJob,
  getMyApplications,
} from "../services/applicationService";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [checkingApplication, setCheckingApplication] =
    useState(true);

  const [applied, setApplied] = useState(false);
  const [applicationStatus, setApplicationStatus] =
    useState("");

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  // =========================
  // LOAD JOB
  // =========================

  useEffect(() => {
    loadJob();
  }, [id]);

  // =========================
  // CHECK APPLICATION
  // =========================

  useEffect(() => {
    if (token && user?.role === "candidate") {
      checkApplication();
    } else {
      setCheckingApplication(false);
    }
  }, [id, token]);

  const loadJob = async () => {
    try {
      setLoading(true);

      const data = await getJobById(id);

      setJob(data.job || null);
    } catch (error) {
      console.log("Job Details Error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load job"
      );
    } finally {
      setLoading(false);
    }
  };

  const checkApplication = async () => {
    try {
      setCheckingApplication(true);

      const data = await getMyApplications();

      const applications = data.applications || [];

      const existingApplication = applications.find(
        (application) =>
          application.job?._id?.toString() === id.toString()
      );

      if (existingApplication) {
        setApplied(true);

        setApplicationStatus(
          existingApplication.status || "Pending"
        );
      } else {
        setApplied(false);
        setApplicationStatus("");
      }
    } catch (error) {
      console.log(
        "Failed to check application:",
        error
      );
    } finally {
      setCheckingApplication(false);
    }
  };

  // =========================
  // APPLY FOR JOB
  // =========================

  const handleApply = async () => {
    if (!token) {
      alert("Please login to apply for this job");
      navigate("/login");
      return;
    }

    if (!user) {
      alert("Please login again");
      navigate("/login");
      return;
    }

    if (user.role !== "candidate") {
      alert("Only candidates can apply for jobs.");
      return;
    }

    if (applied) {
      alert(
        `You have already applied for this job.\nStatus: ${
          applicationStatus || "Pending"
        }`
      );
      return;
    }

    try {
      setApplying(true);

      const data = await applyJob(id);

      console.log("Apply Response:", data);

      alert(
        data.message ||
          "Application submitted successfully"
      );

      setApplied(true);

      setApplicationStatus(
        data.application?.status || "Pending"
      );
    } catch (error) {
      console.log("Apply Error:", error);

      const message =
        error.response?.data?.message ||
        "Failed to apply for job";

      alert(message);

      // Already applied
      if (
        message
          .toLowerCase()
          .includes("already applied")
      ) {
        setApplied(true);

        await checkApplication();
      }
    } finally {
      setApplying(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div style={containerStyle}>
        <h2>Loading job...</h2>
      </div>
    );
  }

  // =========================
  // JOB NOT FOUND
  // =========================

  if (!job) {
    return (
      <div style={containerStyle}>
        <h2>Job not found</h2>

        <button
          onClick={() => navigate("/jobs")}
          style={primaryButton}
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div style={containerStyle}>

      {/* Back */}

      <button
        onClick={() => navigate("/jobs")}
        style={backButton}
      >
        ← Back to Jobs
      </button>

      {/* Job Header */}

      <div style={headerCard}>
        <div>
          <h1>{job.title}</h1>

          <h2 style={{ color: "#555" }}>
            {job.company?.name ||
              "Company not specified"}
          </h2>

          <p style={{ color: "#666" }}>
            📍{" "}
            {job.location ||
              "Location not specified"}
          </p>
        </div>

        <div>
          {job.salary && (
            <h2 style={{ color: "#16a34a" }}>
              ₹
              {Number(job.salary).toLocaleString(
                "en-IN"
              )}
            </h2>
          )}
        </div>
      </div>

      {/* Job Information */}

      <div style={gridStyle}>

        <div style={infoCard}>
          <h3>Job Type</h3>

          <p>
            {job.jobType || "Not specified"}
          </p>
        </div>

        <div style={infoCard}>
          <h3>Experience</h3>

          <p>
            {job.experienceLevel ||
              "Not specified"}
          </p>
        </div>

        <div style={infoCard}>
          <h3>Positions</h3>

          <p>
            {job.position || "Not specified"}
          </p>
        </div>

        <div style={infoCard}>
          <h3>Location</h3>

          <p>
            {job.location || "Not specified"}
          </p>
        </div>

      </div>

      {/* Description */}

      <div style={sectionCard}>
        <h2>Job Description</h2>

        <p style={paragraphStyle}>
          {job.description ||
            "No description provided."}
        </p>
      </div>

      {/* Requirements */}

      <div style={sectionCard}>
        <h2>Requirements</h2>

        {job.requirements ? (
          <p style={paragraphStyle}>
            {job.requirements}
          </p>
        ) : (
          <p>
            No specific requirements provided.
          </p>
        )}
      </div>

      {/* Recruiter */}

      <div style={sectionCard}>
        <h2>Posted By</h2>

        <p>
          <strong>
            {job.createdBy?.fullName ||
              "Recruiter"}
          </strong>
        </p>

        {job.createdBy?.email && (
          <p>{job.createdBy.email}</p>
        )}
      </div>

      {/* =========================
          APPLICATION SECTION
      ========================= */}

      <div style={applyCard}>

        {/* Candidate */}

        {user?.role === "candidate" ? (

          checkingApplication ? (

            <>
              <h2>Checking application...</h2>

              <p>
                Please wait while we check your
                application status.
              </p>
            </>

          ) : applied ? (

            <>
              <h2>
                Application Submitted ✓
              </h2>

              <p>
                You have already applied for
                this position.
              </p>

              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              >
                <strong>
                  Application Status:
                </strong>

                <span
                  style={{
                    ...statusStyle,
                    ...getStatusStyle(
                      applicationStatus
                    ),
                  }}
                >
                  {applicationStatus ||
                    "Pending"}
                </span>
              </div>

              <button
                onClick={() =>
                  navigate("/my-applications")
                }
                style={primaryButton}
              >
                📋 Track Application
              </button>
            </>

          ) : (

            <>
              <h2>
                Interested in this job?
              </h2>

              <p>
                Submit your application to the
                recruiter.
              </p>

              <button
                onClick={handleApply}
                disabled={applying}
                style={{
                  ...primaryButton,
                  marginTop: "10px",
                  opacity: applying ? 0.7 : 1,
                  cursor: applying
                    ? "not-allowed"
                    : "pointer",
                }}
              >
                {applying
                  ? "Applying..."
                  : "Apply Now"}
              </button>
            </>

          )

        ) : !token ? (

          /* Not logged in */

          <>
            <h2>Want to apply?</h2>

            <p>
              Login as a candidate to apply for
              this position.
            </p>

            <button
              onClick={() =>
                navigate("/login")
              }
              style={primaryButton}
            >
              Login to Apply
            </button>
          </>

        ) : (

          /* Recruiter */

          <>
            <h2>Recruiter Account</h2>

            <p>
              Recruiters cannot apply for jobs.
            </p>
          </>

        )}

      </div>
    </div>
  );
};

// =========================
// STATUS STYLE
// =========================

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

// =========================
// STYLES
// =========================

const containerStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

const headerCard = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "30px",
  padding: "30px",
  marginTop: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "#fff",
  flexWrap: "wrap",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginTop: "20px",
};

const infoCard = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#f9fafb",
};

const sectionCard = {
  padding: "25px",
  marginTop: "20px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "#fff",
};

const paragraphStyle = {
  lineHeight: "1.7",
  color: "#444",
};

const applyCard = {
  padding: "30px",
  marginTop: "25px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "#f9fafb",
  textAlign: "center",
};

const backButton = {
  padding: "9px 15px",
  border: "1px solid #ccc",
  background: "white",
  borderRadius: "6px",
  cursor: "pointer",
};

const primaryButton = {
  padding: "11px 22px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const statusStyle = {
  display: "inline-block",
  marginLeft: "10px",
  padding: "7px 14px",
  borderRadius: "20px",
  fontWeight: "bold",
};

export default JobDetails;
