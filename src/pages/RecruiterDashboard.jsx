import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>Recruiter Dashboard</h1>

      <p style={{ fontSize: "18px" }}>
        Welcome,{" "}
        <strong>{user?.fullName || "Recruiter"}</strong> 👋
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {/* Create Company */}
        <button
          onClick={() => navigate("/create-company")}
          style={cardButtonStyle}
        >
          🏢
          <br />
          <strong>Create Company</strong>
          <br />
          <small>Add a new company</small>
        </button>

        {/* Create Job */}
        <button
          onClick={() => navigate("/create-job")}
          style={cardButtonStyle}
        >
          💼
          <br />
          <strong>Create Job</strong>
          <br />
          <small>Post a new job</small>
        </button>

        {/* My Companies */}
        <button
          onClick={() => navigate("/my-companies")}
          style={cardButtonStyle}
        >
          🏢
          <br />
          <strong>My Companies</strong>
          <br />
          <small>Manage companies</small>
        </button>

        {/* My Jobs */}
        <button
          onClick={() => navigate("/my-jobs")}
          style={cardButtonStyle}
        >
          📋
          <br />
          <strong>My Jobs</strong>
          <br />
          <small>Manage posted jobs</small>
        </button>
      </div>
    </div>
  );
};

const cardButtonStyle = {
  padding: "25px",
  minHeight: "150px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  background: "white",
  cursor: "pointer",
  fontSize: "18px",
  lineHeight: "1.8",
};

export default RecruiterDashboard;