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

      console.log("My Applications:", data);

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
      <div style={containerStyle}>
        <h2>Loading applications...</h2>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>My Applications</h1>

      <p style={{ color: "#666" }}>
        Track the jobs you have applied for.
      </p>

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
          <h2>No Applications Yet</h2>

          <p>
            You have not applied for any jobs yet.
          </p>

          <button
            onClick={() => navigate("/jobs")}
            style={buttonStyle}
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div style={{ marginTop: "30px" }}>
          {applications.map((application) => (
            <div
              key={application._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "25px",
                marginBottom: "20px",
                background: "white",
                boxShadow:
                  "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <h2>
                {application.job?.title ||
                  "Job Title Not Available"}
              </h2>

              <h4>
                {application.job?.company?.name ||
                  "Company"}
              </h4>

              <p>
                📍{" "}
                {application.job?.location ||
                  "Location not specified"}
              </p>

              <p>
                💰 ₹
                {application.job?.salary
                  ? Number(
                      application.job.salary
                    ).toLocaleString("en-IN")
                  : "Not specified"}
              </p>

              <p>
                📅 Applied on:{" "}
                {application.createdAt
                  ? new Date(
                      application.createdAt
                    ).toLocaleDateString("en-IN")
                  : "N/A"}
              </p>

              <div style={{ marginTop: "15px" }}>
                <strong>Status:</strong>

                <span
                  style={{
                    display: "inline-block",
                    padding: "7px 14px",
                    borderRadius: "20px",
                    fontWeight: "bold",
                    marginLeft: "8px",
                    ...getStatusStyle(
                      application.status
                    ),
                  }}
                >
                  {application.status || "Pending"}
                </span>
              </div>

              {application.status === "Accepted" && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "#166534",
                    fontWeight: "bold",
                  }}
                >
                  🎉 Congratulations! Your application
                  has been accepted.
                </p>
              )}

              {application.status === "Rejected" && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "#991b1b",
                    fontWeight: "bold",
                  }}
                >
                  Your application was not selected
                  for this position.
                </p>
              )}

              {application.status === "Pending" && (
                <p
                  style={{
                    marginTop: "15px",
                    color: "#92400e",
                  }}
                >
                  ⏳ Your application is still under
                  review.
                </p>
              )}

              <button
                onClick={() =>
                  navigate(
                    `/jobs/${application.job?._id}`
                  )
                }
                style={{
                  ...buttonStyle,
                  marginTop: "15px",
                }}
                disabled={!application.job?._id}
              >
                View Job
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "20px",
};

const buttonStyle = {
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default MyApplications;
