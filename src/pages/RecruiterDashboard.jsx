import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Welcome Section */}
        <div style={styles.hero}>
          <div>
            <div style={styles.smallTitle}>
              JOBHUB RECRUITER PORTAL
            </div>

            <h1 style={styles.title}>
              Recruiter Dashboard
            </h1>

            <p style={styles.welcome}>
              Welcome back,{" "}
              <strong>
                {user?.fullName || "Recruiter"}
              </strong>{" "}
              👋
            </p>

            <p style={styles.subtitle}>
              Manage your companies, create job opportunities,
              and find the right candidates.
            </p>
          </div>

          <div style={styles.heroIcon}>
            💼
          </div>
        </div>

        {/* Dashboard Cards */}
        <div style={styles.sectionHeader}>
          <div>
            <h2 style={styles.sectionTitle}>
              Quick Actions
            </h2>

            <p style={styles.sectionSubtitle}>
              Choose an action to manage your recruitment activities.
            </p>
          </div>
        </div>

        <div style={styles.grid}>

          {/* Create Company */}
          <button
            onClick={() => navigate("/create-company")}
            style={styles.card}
          >
            <div
              style={{
                ...styles.iconBox,
                background: "#eff6ff",
              }}
            >
              🏢
            </div>

            <h3 style={styles.cardTitle}>
              Create Company
            </h3>

            <p style={styles.cardText}>
              Add your company details and create a new
              company profile.
            </p>

            <span style={styles.cardLink}>
              Create Company →
            </span>
          </button>

          {/* Create Job */}
          <button
            onClick={() => navigate("/create-job")}
            style={styles.card}
          >
            <div
              style={{
                ...styles.iconBox,
                background: "#f0fdf4",
              }}
            >
              💼
            </div>

            <h3 style={styles.cardTitle}>
              Create Job
            </h3>

            <p style={styles.cardText}>
              Post a new job opportunity and start receiving
              applications.
            </p>

            <span
              style={{
                ...styles.cardLink,
                color: "#16a34a",
              }}
            >
              Post a Job →
            </span>
          </button>

          {/* My Companies */}
          <button
            onClick={() => navigate("/my-companies")}
            style={styles.card}
          >
            <div
              style={{
                ...styles.iconBox,
                background: "#fff7ed",
              }}
            >
              🏢
            </div>

            <h3 style={styles.cardTitle}>
              My Companies
            </h3>

            <p style={styles.cardText}>
              View, edit and manage all your company
              profiles.
            </p>

            <span
              style={{
                ...styles.cardLink,
                color: "#ea580c",
              }}
            >
              Manage Companies →
            </span>
          </button>

          {/* My Jobs */}
          <button
            onClick={() => navigate("/my-jobs")}
            style={styles.card}
          >
            <div
              style={{
                ...styles.iconBox,
                background: "#faf5ff",
              }}
            >
              📋
            </div>

            <h3 style={styles.cardTitle}>
              My Jobs
            </h3>

            <p style={styles.cardText}>
              Manage your job postings, applicants and
              recruitment process.
            </p>

            <span
              style={{
                ...styles.cardLink,
                color: "#9333ea",
              }}
            >
              Manage Jobs →
            </span>
          </button>

        </div>

        {/* Bottom Information */}
        <div style={styles.infoBox}>
          <div style={styles.infoIcon}>
            💡
          </div>

          <div>
            <h3 style={styles.infoTitle}>
              Build your hiring pipeline
            </h3>

            <p style={styles.infoText}>
              Create a company profile first, then post
              job opportunities and manage candidates
              from your dashboard.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

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

  hero: {
    background:
      "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
    borderRadius: "20px",
    padding: "40px",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "25px",
    boxShadow:
      "0 12px 30px rgba(37, 99, 235, 0.22)",
    marginBottom: "35px",
  },

  smallTitle: {
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.5px",
    opacity: "0.8",
    marginBottom: "10px",
  },

  title: {
    margin: "0",
    fontSize: "38px",
    fontWeight: "800",
  },

  welcome: {
    fontSize: "18px",
    margin: "12px 0 5px",
  },

  subtitle: {
    margin: "8px 0 0",
    maxWidth: "650px",
    lineHeight: "1.6",
    opacity: "0.9",
    fontSize: "15px",
  },

  heroIcon: {
    width: "100px",
    height: "100px",
    borderRadius: "25px",
    background: "rgba(255,255,255,0.15)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    flexShrink: "0",
  },

  sectionHeader: {
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: "0",
    fontSize: "25px",
    color: "#111827",
  },

  sectionSubtitle: {
    margin: "7px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  card: {
    textAlign: "left",
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: "16px",
    padding: "25px",
    minHeight: "245px",
    cursor: "pointer",
    boxShadow:
      "0 5px 18px rgba(0,0,0,0.05)",
    transition:
      "transform 0.2s ease, box-shadow 0.2s ease",
  },

  iconBox: {
    width: "55px",
    height: "55px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "27px",
    marginBottom: "18px",
  },

  cardTitle: {
    margin: "0 0 8px",
    color: "#111827",
    fontSize: "20px",
    fontWeight: "750",
  },

  cardText: {
    margin: "0 0 18px",
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  cardLink: {
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "700",
  },

  infoBox: {
    marginTop: "30px",
    background: "white",
    border: "1px solid #dbeafe",
    borderRadius: "14px",
    padding: "20px",
    display: "flex",
    alignItems: "flex-start",
    gap: "15px",
    boxShadow:
      "0 4px 15px rgba(0,0,0,0.04)",
  },

  infoIcon: {
    fontSize: "25px",
  },

  infoTitle: {
    margin: "0 0 5px",
    color: "#1e3a8a",
    fontSize: "16px",
  },

  infoText: {
    margin: "0",
    color: "#6b7280",
    fontSize: "14px",
    lineHeight: "1.5",
  },
};

export default RecruiterDashboard;
