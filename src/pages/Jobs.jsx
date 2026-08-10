import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { getAllJobs, searchJobs } from "../services/jobService";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  // Search / filters
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  // ==========================================
  // LOAD JOBS
  // ==========================================

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

  // ==========================================
  // SEARCH JOBS
  // ==========================================

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

  // ==========================================
  // RESET FILTERS
  // ==========================================

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

  // ==========================================
  // SORT JOBS
  // ==========================================

  const sortedJobs = [...jobs].sort((a, b) => {
    if (sortBy === "salary-high") {
      return (b.salary || 0) - (a.salary || 0);
    }

    if (sortBy === "salary-low") {
      return (a.salary || 0) - (b.salary || 0);
    }

    // Newest
    return (
      new Date(b.createdAt || 0) -
      new Date(a.createdAt || 0)
    );
  });

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1>Available Jobs</h1>

      <p style={{ color: "#666" }}>
        Find your next opportunity
      </p>

      {/* =====================================
          SEARCH & FILTER
      ====================================== */}

      <div
        style={{
          marginTop: "25px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#f9fafb",
        }}
      >
        <h2>🔎 Search & Filter Jobs</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          {/* Keyword */}

          <input
            type="text"
            placeholder="Job title / keyword"
            value={keyword}
            onChange={(e) =>
              setKeyword(e.target.value)
            }
            style={inputStyle}
          />

          {/* Location */}

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(e.target.value)
            }
            style={inputStyle}
          />

          {/* Job Type */}

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
          </select>

          {/* Experience */}

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

          {/* Minimum Salary */}

          <input
            type="number"
            placeholder="Minimum Salary"
            value={minSalary}
            onChange={(e) =>
              setMinSalary(e.target.value)
            }
            style={inputStyle}
          />

          {/* Maximum Salary */}

          <input
            type="number"
            placeholder="Maximum Salary"
            value={maxSalary}
            onChange={(e) =>
              setMaxSalary(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* Buttons */}

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={handleSearch}
            disabled={loading}
            style={{
              padding: "11px 25px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            {loading
              ? "Searching..."
              : "🔎 Search"}
          </button>

          <button
            onClick={handleReset}
            disabled={loading}
            style={{
              padding: "11px 25px",
              background: "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Reset
          </button>
        </div>
      </div>

      {/* =====================================
          RESULTS
      ====================================== */}

      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <h2>
            Job Results ({sortedJobs.length})
          </h2>

          {/* Sort */}

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            style={{
              ...inputStyle,
              width: "220px",
            }}
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

        {/* Loading */}

        {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
            }}
          >
            <h3>Loading jobs...</h3>
          </div>
        ) : sortedJobs.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              border: "1px solid #ddd",
              borderRadius: "10px",
              marginTop: "20px",
            }}
          >
            <h3>No Jobs Found</h3>

            <p>
              Try changing your search filters.
            </p>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
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

// ==========================================
// INPUT STYLE
// ==========================================

const inputStyle = {
  width: "100%",
  padding: "11px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box",
};

export default Jobs;