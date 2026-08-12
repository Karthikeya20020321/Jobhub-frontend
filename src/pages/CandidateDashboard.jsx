import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyApplications } from "../services/applicationService";

const CandidateDashboard = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const data = await getMyApplications();
      setApplications(data.applications || []);
    } catch (error) {
      console.log("Failed to load applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const pendingCount = applications.filter(
    (application) => application.status === "Pending"
  ).length;

  const acceptedCount = applications.filter(
    (application) => application.status === "Accepted"
  ).length;

  const rejectedCount = applications.filter(
    (application) => application.status === "Rejected"
  ).length;

  return (
    <div style={pageStyle}>
      {/* ================= HEADER ================= */}

      <div style={headerStyle}>
        <div>
          <div style={headerBadge}>JOBHUB • CANDIDATE</div>

          <h1 style={headerTitle}>Candidate Dashboard</h1>

          <p style={headerText}>
            Welcome back,{" "}
            <strong>{user?.fullName || "Candidate"}</strong> 👋
          </p>

          <p style={headerSubText}>
            Find great opportunities, manage applications, and track your
            career progress.
          </p>
        </div>

        <div style={headerIcon}>👨‍💻</div>
      </div>

      {/* ================= APPLICATION SUMMARY ================= */}

      <div style={sectionHeaderStyle}>
        <div>
          <h2 style={sectionTitle}>Application Summary</h2>
          <p style={sectionSubtitle}>
            Keep track of your job applications.
          </p>
        </div>
      </div>

      <div style={statsGridStyle}>
        {/* Total */}

        <div style={statCardStyle}>
          <div style={statIconBlue}>📋</div>

          <div>
            <p style={statLabel}>Total Applications</p>

            <h2 style={statNumberStyle}>
              {loading ? "..." : applications.length}
            </h2>

            <p style={statDescription}>Applications submitted</p>
          </div>
        </div>

        {/* Pending */}

        <div style={statCardStyle}>
          <div style={statIconYellow}>⏳</div>

          <div>
            <p style={statLabel}>Pending</p>

            <h2 style={statNumberStyle}>
              {loading ? "..." : pendingCount}
            </h2>

            <p style={statDescription}>Waiting for recruiter</p>
          </div>
        </div>

        {/* Accepted */}

        <div style={statCardStyle}>
          <div style={statIconGreen}>✓</div>

          <div>
            <p style={statLabel}>Accepted</p>

            <h2 style={statNumberStyle}>
              {loading ? "..." : acceptedCount}
            </h2>

            <p style={statDescription}>Applications accepted</p>
          </div>
        </div>

        {/* Rejected */}

        <div style={statCardStyle}>
          <div style={statIconRed}>✕</div>

          <div>
            <p style={statLabel}>Rejected</p>

            <h2 style={statNumberStyle}>
              {loading ? "..." : rejectedCount}
            </h2>

            <p style={statDescription}>Applications rejected</p>
          </div>
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}

      <div style={{ marginTop: "45px" }}>
        <div style={sectionHeaderStyle}>
          <div>
            <h2 style={sectionTitle}>Quick Actions</h2>

            <p style={sectionSubtitle}>
              Everything you need for your job search.
            </p>
          </div>
        </div>

        <div style={actionsGridStyle}>
          {/* Search Jobs */}

          <ActionCard
            icon="🔎"
            title="Search Jobs"
            description="Find jobs based on title, location, experience and salary."
            buttonText="Browse Jobs"
            onClick={() => navigate("/jobs")}
          />

          {/* My Applications */}

          <ActionCard
            icon="📋"
            title="My Applications"
            description="Track all your applications and their current status."
            buttonText="View Applications"
            onClick={() => navigate("/my-applications")}
          />

          {/* Profile */}

          <ActionCard
            icon="👤"
            title="My Profile"
            description="Update your personal information, skills, profile photo and resume."
            buttonText="View Profile"
            onClick={() => navigate("/profile")}
          />
        </div>
      </div>

      {/* ================= RECENT APPLICATIONS ================= */}

      <div style={{ marginTop: "45px" }}>
        <div style={recentHeaderStyle}>
          <div>
            <h2 style={sectionTitle}>Recent Applications</h2>

            <p style={sectionSubtitle}>
              Your latest job applications.
            </p>
          </div>

          {applications.length > 0 && (
            <button
              onClick={() => navigate("/my-applications")}
              style={viewAllButtonStyle}
            >
              View All →
            </button>
          )}
        </div>

        {loading ? (
          <div style={emptyCardStyle}>
            <div style={loadingIcon}>⏳</div>
            <h3>Loading applications...</h3>
          </div>
        ) : applications.length === 0 ? (
          <div style={emptyCardStyle}>
            <div style={emptyIcon}>📭</div>

            <h3 style={{ marginBottom: "8px" }}>
              No applications yet
            </h3>

            <p style={emptyTextStyle}>
              Start applying for jobs to see your applications here.
            </p>

            <button
              onClick={() => navigate("/jobs")}
              style={primaryButtonStyle}
            >
              Browse Jobs
            </button>
          </div>
        ) : (
          <div style={applicationsGridStyle}>
            {applications.slice(0, 3).map((application) => {
              const job = application.job;

              return (
                <div
                  key={application._id}
                  style={applicationCardStyle}
                >
                  <div style={applicationTopStyle}>
                    <div>
                      <div style={jobIcon}>💼</div>

                      <h3 style={jobTitleStyle}>
                        {job?.title || "Job unavailable"}
                      </h3>

                      <p style={companyTextStyle}>
                        🏢 {job?.company?.name || "Company"}
                      </p>

                      <p style={locationTextStyle}>
                        📍 {job?.location || "Location unavailable"}
                      </p>
                    </div>

                    <span
                      style={{
                        ...getStatusStyle(application.status),
                        padding: "8px 14px",
                        borderRadius: "20px",
                        fontWeight: "700",
                        fontSize: "13px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {application.status}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/jobs/${job?._id}`)
                    }
                    disabled={!job?._id}
                    style={{
                      ...secondaryButtonStyle,
                      opacity: !job?._id ? 0.5 : 1,
                    }}
                  >
                    View Job →
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= HOW JOBHUB WORKS ================= */}

      <div style={flowCardStyle}>
        <div>
          <div style={headerBadgeDark}>JOBHUB PROCESS</div>

          <h2 style={{ margin: "8px 0" }}>
            How JobHub Works
          </h2>

          <p style={{ color: "#64748b" }}>
            Follow these simple steps to find your next opportunity.
          </p>
        </div>

        <div style={stepsGridStyle}>
          <Step number="1" icon="🔎" text="Search Jobs" />

          <Step number="2" icon="👀" text="View Job" />

          <Step number="3" icon="📤" text="Apply" />

          <Step
            number="4"
            icon="📋"
            text="Track Application"
          />

          <Step
            number="5"
            icon="🎯"
            text="Get Decision"
          />
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   ACTION CARD
========================================================= */

const ActionCard = ({
  icon,
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div style={actionCardStyle}>
      <div style={actionIconStyle}>{icon}</div>

      <h2 style={actionTitleStyle}>{title}</h2>

      <p style={actionDescriptionStyle}>
        {description}
      </p>

      <button
        onClick={onClick}
        style={primaryButtonStyle}
      >
        {buttonText} →
      </button>
    </div>
  );
};

/* =========================================================
   STATUS STYLE
========================================================= */

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

/* =========================================================
   STEP
========================================================= */

const Step = ({ number, icon, text }) => {
  return (
    <div style={stepStyle}>
      <div style={stepNumberStyle}>{number}</div>

      <div style={stepIconStyle}>{icon}</div>

      <div style={stepTextStyle}>{text}</div>
    </div>
  );
};

/* =========================================================
   PAGE
========================================================= */

const pageStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px 20px 60px",
  background: "#f8fafc",
};

/* =========================================================
   HEADER
========================================================= */

const headerStyle = {
  padding: "35px",
  borderRadius: "18px",
  background:
    "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "white",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "25px",
  boxShadow: "0 10px 30px rgba(37,99,235,0.20)",
};

const headerBadge = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.15)",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.5px",
};

const headerBadgeDark = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  background: "#eff6ff",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "700",
  letterSpacing: "0.5px",
};

const headerTitle = {
  margin: "15px 0 8px",
  fontSize: "32px",
};

const headerText = {
  margin: 0,
  fontSize: "18px",
};

const headerSubText = {
  marginTop: "12px",
  marginBottom: 0,
  color: "#dbeafe",
};

const headerIcon = {
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  background: "rgba(255,255,255,0.15)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "42px",
};

/* =========================================================
   SECTION
========================================================= */

const sectionHeaderStyle = {
  marginTop: "30px",
};

const sectionTitle = {
  margin: 0,
  fontSize: "24px",
  color: "#0f172a",
};

const sectionSubtitle = {
  marginTop: "6px",
  color: "#64748b",
};

/* =========================================================
   STATS
========================================================= */

const statsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(210px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const statCardStyle = {
  padding: "22px",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "15px",
  display: "flex",
  alignItems: "center",
  gap: "16px",
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};

const statIconBase = {
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
  flexShrink: 0,
};

const statIconBlue = {
  ...statIconBase,
  background: "#eff6ff",
};

const statIconYellow = {
  ...statIconBase,
  background: "#fef3c7",
};

const statIconGreen = {
  ...statIconBase,
  background: "#dcfce7",
};

const statIconRed = {
  ...statIconBase,
  background: "#fee2e2",
};

const statLabel = {
  margin: 0,
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "600",
};

const statNumberStyle = {
  margin: "4px 0",
  fontSize: "30px",
  color: "#0f172a",
};

const statDescription = {
  margin: 0,
  color: "#94a3b8",
  fontSize: "13px",
};

/* =========================================================
   ACTIONS
========================================================= */

const actionsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const actionCardStyle = {
  padding: "25px",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};

const actionIconStyle = {
  width: "52px",
  height: "52px",
  borderRadius: "13px",
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "25px",
};

const actionTitleStyle = {
  margin: "18px 0 8px",
  color: "#0f172a",
};

const actionDescriptionStyle = {
  color: "#64748b",
  lineHeight: "1.6",
  minHeight: "50px",
};

/* =========================================================
   BUTTONS
========================================================= */

const primaryButtonStyle = {
  marginTop: "15px",
  padding: "11px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryButtonStyle = {
  marginTop: "18px",
  padding: "10px 18px",
  background: "#eff6ff",
  color: "#2563eb",
  border: "1px solid #bfdbfe",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const viewAllButtonStyle = {
  background: "transparent",
  border: "none",
  color: "#2563eb",
  cursor: "pointer",
  fontWeight: "700",
};

/* =========================================================
   APPLICATIONS
========================================================= */

const recentHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
};

const applicationsGridStyle = {
  display: "grid",
  gap: "15px",
  marginTop: "20px",
};

const applicationCardStyle = {
  padding: "22px",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "15px",
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};

const applicationTopStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "20px",
};

const jobIcon = {
  fontSize: "20px",
  marginBottom: "8px",
};

const jobTitleStyle = {
  margin: 0,
  color: "#0f172a",
};

const companyTextStyle = {
  margin: "8px 0 4px",
  color: "#475569",
};

const locationTextStyle = {
  margin: 0,
  color: "#64748b",
};

/* =========================================================
   EMPTY
========================================================= */

const emptyCardStyle = {
  marginTop: "20px",
  padding: "50px 25px",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "15px",
  textAlign: "center",
};

const emptyIcon = {
  fontSize: "42px",
};

const loadingIcon = {
  fontSize: "35px",
};

const emptyTextStyle = {
  color: "#64748b",
};

/* =========================================================
   JOBHUB FLOW
========================================================= */

const flowCardStyle = {
  marginTop: "45px",
  padding: "28px",
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "18px",
  boxShadow: "0 4px 12px rgba(15,23,42,0.04)",
};

const stepsGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "15px",
  marginTop: "25px",
};

const stepStyle = {
  padding: "18px",
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  textAlign: "center",
};

const stepNumberStyle = {
  width: "30px",
  height: "30px",
  margin: "0 auto 10px",
  borderRadius: "50%",
  background: "#2563eb",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "700",
};

const stepIconStyle = {
  fontSize: "24px",
  marginBottom: "8px",
};

const stepTextStyle = {
  fontWeight: "600",
  color: "#334155",
};

export default CandidateDashboard;