import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  applyJob,
  getMyApplications,
} from "../services/applicationService";

const JobCard = ({ job }) => {
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [checkingApplication, setCheckingApplication] =
    useState(true);

  const token = localStorage.getItem("token");

  // ==========================================
  // CHECK WHETHER ALREADY APPLIED
  // ==========================================

  useEffect(() => {
    const checkApplication = async () => {
      if (!token) {
        setCheckingApplication(false);
        return;
      }

      try {
        const data = await getMyApplications();

        const applications = data.applications || [];

        const alreadyApplied = applications.some(
          (application) =>
            application.job?._id === job._id
        );

        setApplied(alreadyApplied);
      } catch (error) {
        console.log(
          "Failed to check application:",
          error
        );
      } finally {
        setCheckingApplication(false);
      }
    };

    checkApplication();
  }, [job._id, token]);

  // ==========================================
  // APPLY
  // ==========================================

  const handleApply = async () => {
    if (!token) {
      alert("Please login to apply for a job");
      return;
    }

    try {
      setApplying(true);

      const data = await applyJob(job._id);

      alert(
        data.message ||
          "Application submitted successfully"
      );

      setApplied(true);
    } catch (error) {
      console.log("Apply error:", error);

      const message =
        error.response?.data?.message ||
        "Failed to apply for job";

      alert(message);

      if (
        message ===
        "You have already applied for this job"
      ) {
        setApplied(true);
      }
    } finally {
      setApplying(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "20px 0",
        borderRadius: "10px",
        background: "#fff",
      }}
    >
      <h2>{job.title}</h2>

      <h4>
        {job.company?.name || "Company"}
      </h4>

      <p>📍 {job.location}</p>

      <p>
        💰 ₹
        {job.salary
          ? Number(job.salary).toLocaleString("en-IN")
          : "Not specified"}
      </p>

      <p>
        👨‍💻 {job.experienceLevel}
      </p>

      <p>
        💼 {job.jobType}
      </p>

      <div style={{ marginTop: "15px" }}>
        <Link to={`/jobs/${job._id}`}>
          <button
            style={{
              padding: "10px 15px",
              marginRight: "10px",
              cursor: "pointer",
              border: "1px solid #ccc",
              borderRadius: "5px",
              background: "white",
            }}
          >
            View Details
          </button>
        </Link>

        <button
          onClick={handleApply}
          disabled={
            applying ||
            applied ||
            checkingApplication
          }
          style={{
            padding: "10px 15px",
            background:
              applied || checkingApplication
                ? "#6b7280"
                : "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor:
              applying ||
              applied ||
              checkingApplication
                ? "not-allowed"
                : "pointer",
          }}
        >
          {checkingApplication
            ? "Checking..."
            : applying
            ? "Applying..."
            : applied
            ? "Applied ✓"
            : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
