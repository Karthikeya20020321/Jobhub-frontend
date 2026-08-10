import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyJobs,
  deleteJob,
} from "../services/jobService";

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
      <div style={{ padding: "30px" }}>
        <h2>Loading your jobs...</h2>
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
          <h1>My Jobs</h1>

          <p style={{ color: "#666" }}>
            Manage jobs posted by you.
          </p>
        </div>

        <button
          onClick={() => navigate("/create-job")}
          style={createButton}
        >
          + Create New Job
        </button>
      </div>

      {jobs.length === 0 ? (
        <div
          style={{
            marginTop: "30px",
            padding: "50px",
            textAlign: "center",
            border: "1px solid #ddd",
            borderRadius: "12px",
          }}
        >
          <h2>No Jobs Posted</h2>

          <p>
            Create your first job posting.
          </p>

          <button
            onClick={() => navigate("/create-job")}
            style={createButton}
          >
            Create Job
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {jobs.map((job) => (
            <div
              key={job._id}
              style={jobCard}
            >
              <div>
                <h2>{job.title}</h2>

                <h4>
                  {job.company?.name ||
                    "Company"}
                </h4>

                <p>
                  📍 {job.location}
                </p>

                <p>
                  💰 ₹
                  {job.salary
                    ? Number(
                        job.salary
                      ).toLocaleString(
                        "en-IN"
                      )
                    : "Not specified"}
                </p>

                <p>
                  👨‍💻{" "}
                  {job.experienceLevel}
                </p>

                <p>
                  💼 {job.jobType}
                </p>

                <p>
                  👥 Positions:{" "}
                  {job.position}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                {/* View Applicants */}

                <button
                  onClick={() =>
                    navigate(
                      `/applicants/${job._id}`
                    )
                  }
                  style={applicantsButton}
                >
                  👥 View Applicants
                </button>

                {/* Edit */}

                <button
                  onClick={() =>
                    navigate(
                      `/edit-job/${job._id}`
                    )
                  }
                  style={editButton}
                >
                  ✏️ Edit
                </button>

                {/* Delete */}

                <button
                  onClick={() =>
                    handleDelete(job._id)
                  }
                  style={deleteButton}
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const jobCard = {
  border: "1px solid #ddd",
  borderRadius: "12px",
  padding: "25px",
  marginBottom: "20px",
  background: "white",
  boxShadow:
    "0 2px 8px rgba(0,0,0,0.05)",
};

const createButton = {
  padding: "11px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const applicantsButton = {
  padding: "10px 18px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const editButton = {
  padding: "10px 18px",
  background: "#f59e0b",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const deleteButton = {
  padding: "10px 18px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default MyJobs;