import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobs, searchJobs } from "../services/jobService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const data = await getAllJobs();

      setJobs(data.jobs || []);
    } catch (error) {
      console.log("Get jobs error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      const data = await searchJobs({
        keyword,
        location,
        jobType,
        experienceLevel,
        minSalary,
        maxSalary,
      });

      setJobs(data.jobs || []);
    } catch (error) {
      console.log("Search jobs error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to search jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setKeyword("");
    setLocation("");
    setJobType("");
    setExperienceLevel("");
    setMinSalary("");
    setMaxSalary("");
    setSortBy("newest");

    fetchJobs();
  };

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "salary-high") {
      return (b.salary || 0) - (a.salary || 0);
    }

    if (sortBy === "salary-low") {
      return (a.salary || 0) - (b.salary || 0);
    }

    return (
      new Date(b.createdAt || 0) -
      new Date(a.createdAt || 0)
    );
  });

  return (
    <div style={pageContainer}>

      {/* HEADER */}
      <div style={headerSection}>
        <div>
          <div style={badgeStyle}>
            💼 JOBHUB
          </div>

          <h1 style={mainTitle}>
            Find Your Next Job
          </h1>

          <p style={subtitle}>
            Discover opportunities that match your
            skills, experience and career goals.
          </p>
        </div>

        <div style={jobCountCard}>
          <div style={jobCountNumber}>
            {loading ? "..." : sortedJobs.length}
          </div>

          <div style={jobCountText}>
            Jobs Available
          </div>
        </div>
      </div>

      {/* SEARCH SECTION */}
      <div style={searchCard}>

        <div style={sectionTitleRow}>
          <div>
            <h2 style={sectionTitle}>
              🔎 Search & Filter Jobs
            </h2>

            <p style={sectionSubtitle}>
              Find the right opportunity using filters
            </p>
          </div>
        </div>

        <div style={filterGrid}>

          {/* KEYWORD */}
          <div style={fieldGroup}>
            <label style={labelStyle}>
              Job Title / Keyword
            </label>

            <input
              type="text"
              placeholder="e.g. React Developer"
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* LOCATION */}
          <div style={fieldGroup}>
            <label style={labelStyle}>
              Location
            </label>

            <input
              type="text"
              placeholder="e.g. Hyderabad"
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* JOB TYPE */}
          <div style={fieldGroup}>
            <label style={labelStyle}>
              Job Type
            </label>

            <select
              value={jobType}
              onChange={(e) =>
                setJobType(e.target.value)
              }
              style={inputStyle}
            >
              <option value="">
                All Job Types
              </option>

              <option value="Full-time">
                Full-time
              </option>

              <option value="Part-time">
                Part-time
              </option>

              <option value="Internship">
                Internship
              </option>

              <option value="Remote">
                Remote
              </option>
            </select>
          </div>

          {/* EXPERIENCE */}
          <div style={fieldGroup}>
            <label style={labelStyle}>
              Experience
            </label>

            <select
              value={experienceLevel}
              onChange={(e) =>
                setExperienceLevel(e.target.value)
              }
              style={inputStyle}
            >
              <option value="">
                All Experience Levels
              </option>

              <option value="Fresher">
                Fresher
              </option>

              <option value="1-2 Years">
                1-2 Years
              </option>

              <option value="2-5 Years">
                2-5 Years
              </option>

              <option value="5+ Years">
                5+ Years
              </option>
            </select>
          </div>

          {/* MIN SALARY */}
          <div style={fieldGroup}>
            <label style={labelStyle}>
              Minimum Salary
            </label>

            <input
              type="number"
              placeholder="₹ Minimum"
              value={minSalary}
              onChange={(e) =>
                setMinSalary(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* MAX SALARY */}
          <div style={fieldGroup}>
            <label style={labelStyle}>
              Maximum Salary
            </label>

            <input
              type="number"
              placeholder="₹ Maximum"
              value={maxSalary}
              onChange={(e) =>
                setMaxSalary(e.target.value)
              }
              style={inputStyle}
            />
          </div>
        </div>

        {/* SEARCH BUTTONS */}
        <div style={buttonRow}>

          <button
            onClick={handleSearch}
            disabled={loading}
            style={searchButton}
          >
            {loading ? "Searching..." : "🔎 Search Jobs"}
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            style={resetButton}
          >
            ↻ Reset
          </button>
        </div>
      </div>

      {/* RESULTS HEADER */}
      <div style={resultsHeader}>

        <div>
          <h2 style={resultsTitle}>
            Job Opportunities
          </h2>

          <p style={resultsSubtitle}>
            {sortedJobs.length} jobs found
          </p>
        </div>

        <div style={sortContainer}>
          <label style={sortLabel}>
            Sort by
          </label>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            style={sortSelect}
          >
            <option value="newest">
              🆕 Newest Jobs
            </option>

            <option value="salary-high">
              💰 Highest Salary
            </option>

            <option value="salary-low">
              💵 Lowest Salary
            </option>
          </select>
        </div>
      </div>

      {/* JOB RESULTS */}
      <div style={resultsContainer}>

        {loading ? (
          <div style={emptyCard}>
            <div style={loadingIcon}>
              ⏳
            </div>

            <h3>
              Loading Jobs...
            </h3>

            <p>
              Please wait while we find the best
              opportunities for you.
            </p>
          </div>
        ) : sortedJobs.length === 0 ? (
          <div style={emptyCard}>

            <div style={emptyIcon}>
              🔍
            </div>

            <h3>
              No Jobs Found
            </h3>

            <p>
              Try changing your search filters or
              search for another position.
            </p>

            <button
              onClick={handleReset}
              style={searchButton}
            >
              View All Jobs
            </button>
          </div>
        ) : (
          <div style={jobsGrid}>
            {sortedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
              />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

/* ==========================================
   PAGE
========================================== */

const pageContainer = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px 20px 60px",
};

/* ==========================================
   HEADER
========================================== */

const headerSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "25px",
  flexWrap: "wrap",
  marginBottom: "30px",
};

const badgeStyle = {
  display: "inline-block",
  padding: "6px 12px",
  background: "#eff6ff",
  color: "#2563eb",
  borderRadius: "20px",
  fontSize: "13px",
  fontWeight: "700",
  marginBottom: "12px",
};

const mainTitle = {
  margin: "0",
  fontSize: "38px",
  fontWeight: "800",
  color: "#111827",
};

const subtitle = {
  marginTop: "10px",
  color: "#6b7280",
  fontSize: "17px",
};

const jobCountCard = {
  minWidth: "170px",
  padding: "22px",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  textAlign: "center",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};

const jobCountNumber = {
  fontSize: "32px",
  fontWeight: "800",
  color: "#2563eb",
};

const jobCountText = {
  color: "#6b7280",
  marginTop: "4px",
};

/* ==========================================
   SEARCH
========================================== */

const searchCard = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "28px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
};

const sectionTitleRow = {
  marginBottom: "22px",
};

const sectionTitle = {
  margin: "0",
  fontSize: "22px",
  color: "#111827",
};

const sectionSubtitle = {
  marginTop: "6px",
  color: "#6b7280",
};

const filterGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "7px",
};

const labelStyle = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "12px 13px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
  background: "#fff",
  fontSize: "14px",
  outline: "none",
};

const buttonRow = {
  display: "flex",
  gap: "12px",
  marginTop: "24px",
  flexWrap: "wrap",
};

const searchButton = {
  padding: "12px 22px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const resetButton = {
  padding: "12px 22px",
  background: "#f3f4f6",
  color: "#374151",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

/* ==========================================
   RESULTS
========================================== */

const resultsHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
  marginTop: "40px",
};

const resultsTitle = {
  margin: "0",
  fontSize: "25px",
  color: "#111827",
};

const resultsSubtitle = {
  marginTop: "5px",
  color: "#6b7280",
};

const sortContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const sortLabel = {
  fontSize: "14px",
  color: "#6b7280",
};

const sortSelect = {
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  background: "white",
  cursor: "pointer",
};

/* ==========================================
   JOBS
========================================== */

const resultsContainer = {
  marginTop: "20px",
};

const jobsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(300px, 1fr))",
  gap: "20px",
};

const emptyCard = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "50px 25px",
  textAlign: "center",
  boxShadow: "0 3px 12px rgba(0,0,0,0.04)",
};

const emptyIcon = {
  fontSize: "45px",
  marginBottom: "10px",
};

const loadingIcon = {
  fontSize: "35px",
  marginBottom: "10px",
};

export default Jobs;