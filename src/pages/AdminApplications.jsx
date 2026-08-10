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

  const response = await API.get(
    "/admin/applications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setApplications(
    response.data.applications || []
  );
} catch (error) {
  console.log(
    "Admin applications error:",
    error
  );

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

const handleStatus = async (
applicationId,
status
) => {
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

  setApplications(
    (currentApplications) =>
      currentApplications.map(
        (application) =>
          application._id === applicationId
            ? {
                ...application,
                status,
              }
            : application
      )
  );
} catch (error) {
  console.log(
    "Update application error:",
    error
  );

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
<div
style={{
maxWidth: "1200px",
margin: "50px auto",
padding: "20px",
textAlign: "center",
}}
> <h2>Loading applications...</h2> </div>
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
      <h1>Manage Applications</h1>

      <p style={{ color: "#666" }}>
        Review and manage all job applications.
      </p>
    </div>

    <button
      onClick={() => navigate("/admin")}
      style={backButton}
    >
      ← Admin Dashboard
    </button>
  </div>

  {/* TOTAL APPLICATIONS */}

  <div
    style={{
      marginTop: "25px",
      padding: "15px 20px",
      background: "#eff6ff",
      border: "1px solid #bfdbfe",
      borderRadius: "8px",
    }}
  >
    <strong>Total Applications:</strong>{" "}
    {applications.length}
  </div>

  {/* APPLICATION LIST */}

  {applications.length === 0 ? (
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
      <h2>No Applications Found</h2>

      <p style={{ color: "#666" }}>
        There are currently no job applications.
      </p>
    </div>
  ) : (
    <div style={{ marginTop: "30px" }}>
      {applications.map((application) => (
        <div
          key={application._id}
          style={applicationCard}
        >
          {/* JOB */}

          <h2
            style={{
              marginTop: 0,
              color: "#111827",
            }}
          >
            {application.job?.title ||
              "Job Title Not Available"}
          </h2>

          <h4
            style={{
              color: "#2563eb",
            }}
          >
            {application.job?.company?.name ||
              "Company"}
          </h4>

          <hr />

          {/* CANDIDATE */}

          <p>
            <strong>Candidate:</strong>{" "}
            {application.applicant?.fullName ||
              "Unknown"}
          </p>

          <p>
            <strong>Email:</strong>{" "}
            {application.applicant?.email ||
              "Not available"}
          </p>

          <p>
            <strong>Phone:</strong>{" "}
            {application.applicant?.phone ||
              "Not provided"}
          </p>

          {/* JOB DETAILS */}

          <p>
            <strong>Location:</strong>{" "}
            {application.job?.location ||
              "Not specified"}
          </p>

          <p>
            <strong>Salary:</strong>{" "}
            {application.job?.salary
              ? `₹${Number(
                  application.job.salary
                ).toLocaleString("en-IN")}`
              : "Not specified"}
          </p>

          <p>
            <strong>Applied:</strong>{" "}
            {application.createdAt
              ? new Date(
                  application.createdAt
                ).toLocaleDateString(
                  "en-IN"
                )
              : "N/A"}
          </p>

          {/* STATUS */}

          <div
            style={{
              marginTop: "15px",
            }}
          >
            <strong>Status:</strong>{" "}

            <span
              style={{
                display: "inline-block",
                padding: "6px 12px",
                borderRadius: "20px",
                fontWeight: "bold",
                ...getStatusStyle(
                  application.status
                ),
              }}
            >
              {application.status ||
                "Pending"}
            </span>
          </div>

          {/* ACTION BUTTONS */}

          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                handleStatus(
                  application._id,
                  "Accepted"
                )
              }
              disabled={
                updating ===
                  application._id ||
                application.status ===
                  "Accepted"
              }
              style={{
                ...acceptButton,
                opacity:
                  application.status ===
                  "Accepted"
                    ? 0.6
                    : 1,
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
                updating ===
                  application._id ||
                application.status ===
                  "Rejected"
              }
              style={{
                ...rejectButton,
                opacity:
                  application.status ===
                  "Rejected"
                    ? 0.6
                    : 1,
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
                updating ===
                  application._id ||
                application.status ===
                  "Pending"
              }
              style={{
                ...pendingButton,
                opacity:
                  application.status ===
                  "Pending"
                    ? 0.6
                    : 1,
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

const applicationCard = {
border: "1px solid #ddd",
borderRadius: "12px",
padding: "25px",
marginBottom: "20px",
background: "white",
boxShadow:
"0 2px 8px rgba(0,0,0,0.05)",
};

const backButton = {
padding: "10px 18px",
background: "#2563eb",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

const acceptButton = {
padding: "10px 18px",
background: "#16a34a",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

const rejectButton = {
padding: "10px 18px",
background: "#dc2626",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

const pendingButton = {
padding: "10px 18px",
background: "#f59e0b",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

export default AdminApplications;
