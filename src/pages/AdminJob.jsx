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

if (!confirmDelete) {
  return;
}

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
<div
style={{
maxWidth: "1200px",
margin: "50px auto",
padding: "20px",
textAlign: "center",
}}
> <h2>Loading jobs...</h2> </div>
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
{/* HEADER */}

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
      <h1>Manage Jobs</h1>

      <p style={{ color: "#666" }}>
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

  {/* TOTAL JOBS */}

  <div
    style={{
      marginTop: "25px",
      padding: "15px 20px",
      background: "#eff6ff",
      border: "1px solid #bfdbfe",
      borderRadius: "8px",
    }}
  >
    <strong>Total Jobs:</strong> {jobs.length}
  </div>

  {/* JOB LIST */}

  {jobs.length === 0 ? (
    <div
      style={{
        marginTop: "30px",
        padding: "50px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "12px",
        background: "#f9fafb",
      }}
    >
      <h2>No Jobs Found</h2>

      <p style={{ color: "#666" }}>
        There are currently no jobs posted on JobHub.
      </p>
    </div>
  ) : (
    <div style={{ marginTop: "30px" }}>
      {jobs.map((job) => (
        <div
          key={job._id}
          style={jobCard}
        >
          <h2
            style={{
              marginTop: 0,
              color: "#111827",
            }}
          >
            {job.title || "Untitled Job"}
          </h2>

          <h4
            style={{
              color: "#2563eb",
              marginBottom: "15px",
            }}
          >
            {job.company?.name ||
              "Company not specified"}
          </h4>

          <p>
            📍{" "}
            {job.location ||
              "Location not specified"}
          </p>

          <p>
            💰 ₹
            {job.salary
              ? Number(
                  job.salary
                ).toLocaleString("en-IN")
              : "Not specified"}
          </p>

          <p>
            💼{" "}
            {job.jobType ||
              "Job type not specified"}
          </p>

          <p>
            👨‍💻{" "}
            {job.experienceLevel ||
              "Experience not specified"}
          </p>

          <p>
            👤 Posted by:{" "}
            {job.createdBy?.fullName ||
              "Unknown recruiter"}
          </p>

          <p
            style={{
              color: "#666",
              fontSize: "14px",
            }}
          >
            Posted on:{" "}
            {job.createdAt
              ? new Date(
                  job.createdAt
                ).toLocaleDateString(
                  "en-IN"
                )
              : "N/A"}
          </p>

          <div
            style={{
              marginTop: "20px",
            }}
          >
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

const jobCard = {
border: "1px solid #ddd",
borderRadius: "12px",
padding: "25px",
marginBottom: "20px",
background: "white",
boxShadow:
"0 2px 8px rgba(0,0,0,0.05)",
};

const deleteButton = {
padding: "10px 18px",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

const backButton = {
padding: "10px 18px",
background: "#2563eb",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

export default AdminJobs;
