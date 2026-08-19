import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div style={pageStyle}>
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* JOB SEARCH CTA */}
      <section style={searchSection}>
        <div style={searchContainer}>
          <div>
            <span style={sectionBadge}>JOBHUB</span>

            <h2 style={searchTitle}>
              Find the right opportunity for your career
            </h2>

            <p style={searchText}>
              Search thousands of job opportunities and find a position
              that matches your skills, experience, and career goals.
            </p>
          </div>

          <div style={searchButtons}>
            <button
              onClick={() => (window.location.href = "/jobs")}
              style={primaryButton}
            >
              🔎 Browse Jobs
            </button>

            <button
              onClick={() => (window.location.href = "/register")}
              style={secondaryButton}
            >
              Create Account →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={sectionStyle}>
        <div style={sectionHeader}>
          <span style={sectionBadge}>WHY JOBHUB?</span>

          <h2 style={sectionTitle}>
            Everything you need to find your next job
          </h2>

          <p style={sectionDescription}>
            JobHub makes the job search process simple, fast, and
            organized.
          </p>
        </div>

        <div style={featureGrid}>
          <FeatureCard
            icon="🔎"
            title="Find Jobs Easily"
            description="Search and filter jobs by title, location, job type, experience, and salary."
          />

          <FeatureCard
            icon="⚡"
            title="Apply Quickly"
            description="Find suitable jobs and submit your application with just a few clicks."
          />

          <FeatureCard
            icon="📋"
            title="Track Applications"
            description="Keep track of all your applications and monitor their current status."
          />

          <FeatureCard
            icon="🔐"
            title="Secure Platform"
            description="Your account and application information are protected with secure authentication."
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={howSection}>
        <div style={sectionHeader}>
          <span style={sectionBadge}>HOW IT WORKS</span>

          <h2 style={sectionTitle}>
            Start your job search in 4 simple steps
          </h2>
        </div>

        <div style={stepsGrid}>
          <Step
            number="01"
            icon="👤"
            title="Create Account"
            text="Register as a candidate and create your JobHub account."
          />

          <Step
            number="02"
            icon="🔎"
            title="Search Jobs"
            text="Explore jobs using our powerful search and filtering options."
          />

          <Step
            number="03"
            icon="📨"
            title="Apply"
            text="Apply to jobs that match your skills and career goals."
          />

          <Step
            number="04"
            icon="📊"
            title="Track Status"
            text="Monitor your applications and see recruiter decisions."
          />
        </div>
      </section>

      {/* RECRUITER CTA */}
      <section style={recruiterSection}>
        <div style={recruiterContent}>
          <div>
            <span style={recruiterBadge}>FOR RECRUITERS</span>

            <h2 style={recruiterTitle}>
              Looking for talented people?
            </h2>

            <p style={recruiterText}>
              Create your recruiter account, post jobs, and connect with
              talented candidates.
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/register")}
            style={recruiterButton}
          >
            Start Hiring →
          </button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={finalSection}>
        <h2 style={finalTitle}>
          Ready to find your next opportunity?
        </h2>

        <p style={finalText}>
          Join JobHub today and take the next step in your career.
        </p>

        <button
          onClick={() => (window.location.href = "/register")}
          style={finalButton}
        >
          Get Started 🚀
        </button>
      </section>

      <Footer />
    </div>
  );
};


/* ==========================================
   FEATURE CARD
========================================== */

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div style={featureCard}>
      <div style={featureIcon}>{icon}</div>

      <h3 style={featureTitle}>{title}</h3>

      <p style={featureText}>{description}</p>
    </div>
  );
};


/* ==========================================
   STEP
========================================== */

const Step = ({ number, icon, title, text }) => {
  return (
    <div style={stepCard}>
      <div style={stepTop}>
        <span style={stepNumber}>{number}</span>

        <span style={stepIcon}>{icon}</span>
      </div>

      <h3 style={stepTitle}>{title}</h3>

      <p style={stepText}>{text}</p>
    </div>
  );
};


/* ==========================================
   PAGE
========================================== */

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
  color: "#111827",
};


/* ==========================================
   SEARCH CTA
========================================== */

const searchSection = {
  padding: "70px 20px",
  background: "white",
};

const searchContainer = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "40px",
  borderRadius: "20px",
  background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  flexWrap: "wrap",
  boxSizing: "border-box",
};

const sectionBadge = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  background: "#dbeafe",
  color: "#2563eb",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "1px",
};

const searchTitle = {
  margin: "15px 0 10px",
  fontSize: "32px",
  lineHeight: "1.2",
  maxWidth: "650px",
};

const searchText = {
  margin: 0,
  color: "#64748b",
  fontSize: "16px",
  lineHeight: "1.7",
  maxWidth: "650px",
};

const searchButtons = {
  display: "flex",
  gap: "12px",
  flexWrap: "wrap",
};

const primaryButton = {
  padding: "13px 22px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};

const secondaryButton = {
  padding: "13px 22px",
  border: "1px solid #2563eb",
  borderRadius: "8px",
  background: "white",
  color: "#2563eb",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};


/* ==========================================
   FEATURES
========================================== */

const sectionStyle = {
  maxWidth: "1100px",
  margin: "0 auto",
  padding: "80px 20px",
};

const sectionHeader = {
  textAlign: "center",
  maxWidth: "750px",
  margin: "0 auto 45px",
};

const sectionTitle = {
  margin: "15px 0 10px",
  fontSize: "32px",
  lineHeight: "1.25",
};

const sectionDescription = {
  color: "#64748b",
  fontSize: "16px",
  lineHeight: "1.6",
};

const featureGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const featureCard = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  padding: "28px",
  boxShadow: "0 5px 20px rgba(15, 23, 42, 0.05)",
  transition: "0.2s",
};

const featureIcon = {
  width: "52px",
  height: "52px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "12px",
  background: "#eff6ff",
  fontSize: "25px",
};

const featureTitle = {
  margin: "20px 0 10px",
  fontSize: "19px",
};

const featureText = {
  margin: 0,
  color: "#64748b",
  lineHeight: "1.6",
  fontSize: "14px",
};


/* ==========================================
   HOW IT WORKS
========================================== */

const howSection = {
  padding: "80px 20px",
  background: "white",
};

const stepsGrid = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
};

const stepCard = {
  padding: "25px",
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  background: "#f8fafc",
};

const stepTop = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const stepNumber = {
  color: "#2563eb",
  fontWeight: "800",
  fontSize: "14px",
};

const stepIcon = {
  fontSize: "28px",
};

const stepTitle = {
  margin: "20px 0 8px",
  fontSize: "18px",
};

const stepText = {
  margin: 0,
  color: "#64748b",
  lineHeight: "1.6",
  fontSize: "14px",
};


/* ==========================================
   RECRUITER SECTION
========================================== */

const recruiterSection = {
  padding: "70px 20px",
  background: "#111827",
};

const recruiterContent = {
  maxWidth: "1100px",
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "30px",
  flexWrap: "wrap",
};

const recruiterBadge = {
  color: "#93c5fd",
  fontSize: "12px",
  fontWeight: "800",
  letterSpacing: "1px",
};

const recruiterTitle = {
  color: "white",
  fontSize: "32px",
  margin: "12px 0",
};

const recruiterText = {
  color: "#cbd5e1",
  maxWidth: "650px",
  lineHeight: "1.6",
};

const recruiterButton = {
  padding: "14px 24px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};


/* ==========================================
   FINAL CTA
========================================== */

const finalSection = {
  padding: "80px 20px",
  textAlign: "center",
  background: "#eff6ff",
};

const finalTitle = {
  margin: 0,
  fontSize: "34px",
};

const finalText = {
  color: "#64748b",
  margin: "15px 0 25px",
  fontSize: "16px",
};

const finalButton = {
  padding: "14px 28px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontWeight: "700",
  cursor: "pointer",
  fontSize: "15px",
};


export default Home;