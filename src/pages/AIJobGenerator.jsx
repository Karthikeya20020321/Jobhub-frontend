import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateJobWithAI } from "../services/aiService";

const AIJobGenerator = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    experienceLevel: "Fresher",
    jobType: "Full-time",
    salary: "",
    skills: "",
  });

  const [generatedJob, setGeneratedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a job title");
      return;
    }

    try {
      setLoading(true);

      const data = await generateJobWithAI(formData);

      setGeneratedJob(data.job);
    } catch (error) {
      console.log("AI generation error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to generate job"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <div style={headerStyle}>
          <div>
            <span style={badgeStyle}>
              AI POWERED
            </span>

            <h1 style={titleStyle}>
              AI Job Generator 🤖
            </h1>

            <p style={subtitleStyle}>
              Generate professional job descriptions
              using AI and review them before publishing.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/recruiter")
            }
            style={backButtonStyle}
          >
            ← Dashboard
          </button>
        </div>

        <div style={mainGrid}>

          {/* FORM */}

          <div style={cardStyle}>
            <h2>Job Information</h2>

            <p style={helpText}>
              Enter basic information and AI will
              generate the job content.
            </p>

            <form onSubmit={handleGenerate}>

              <label style={labelStyle}>
                Job Title
              </label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="MERN Stack Developer"
                style={inputStyle}
                required
              />

              <label style={labelStyle}>
                Company
              </label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company name"
                style={inputStyle}
              />

              <label style={labelStyle}>
                Location
              </label>

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Hyderabad"
                style={inputStyle}
              />

              <label style={labelStyle}>
                Experience Level
              </label>

              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                style={inputStyle}
              >
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

              <label style={labelStyle}>
                Job Type
              </label>

              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                style={inputStyle}
              >
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

              <label style={labelStyle}>
                Salary
              </label>

              <input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="600000"
                type="number"
                style={inputStyle}
              />

              <label style={labelStyle}>
                Skills
              </label>

              <textarea
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Express.js"
                style={textareaStyle}
                rows="4"
              />

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...generateButtonStyle,
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading
                  ? "🤖 Generating..."
                  : "🤖 Generate Job"}
              </button>

            </form>
          </div>

          {/* GENERATED JOB */}

          <div style={cardStyle}>

            <h2>Generated Job</h2>

            {!generatedJob ? (
              <div style={emptyStyle}>
                <div style={robotStyle}>
                  🤖
                </div>

                <h3>
                  Your AI-generated job will appear here
                </h3>

                <p>
                  Fill in the job information and click
                  Generate Job.
                </p>
              </div>
            ) : (
              <div>

                <h2 style={generatedTitle}>
                  {generatedJob.title}
                </h2>

                <h3>Description</h3>

                <p style={contentStyle}>
                  {generatedJob.description}
                </p>

                <h3>
                  Responsibilities
                </h3>

                <ul>
                  {generatedJob.responsibilities?.map(
                    (item, index) => (
                      <li
                        key={index}
                        style={listItemStyle}
                      >
                        {item}
                      </li>
                    )
                  )}
                </ul>

                <h3>
                  Required Skills
                </h3>

                <div style={skillsContainer}>
                  {generatedJob.requiredSkills?.map(
                    (skill, index) => (
                      <span
                        key={index}
                        style={skillStyle}
                      >
                        {skill}
                      </span>
                    )
                  )}
                </div>

                <h3>
                  Preferred Skills
                </h3>

                <ul>
                  {generatedJob.preferredSkills?.map(
                    (skill, index) => (
                      <li
                        key={index}
                        style={listItemStyle}
                      >
                        {skill}
                      </li>
                    )
                  )}
                </ul>

                <h3>
                  Qualifications
                </h3>

                <ul>
                  {generatedJob.qualifications?.map(
                    (qualification, index) => (
                      <li
                        key={index}
                        style={listItemStyle}
                      >
                        {qualification}
                      </li>
                    )
                  )}
                </ul>

                <div style={reviewNotice}>
                  ⚠️ Review this AI-generated content
                  before publishing.
                </div>

                <button
                  onClick={() => {
                    alert(
                      "Next step: connect this to your existing Create Job API."
                    );
                  }}
                  style={publishButton}
                >
                  📋 Use This Job
                </button>

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


/* STYLES */

const pageStyle = {
  minHeight: "100vh",
  background: "#f8fafc",
  padding: "40px 20px",
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
  marginBottom: "30px",
};

const badgeStyle = {
  background: "#ede9fe",
  color: "#7c3aed",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
};

const titleStyle = {
  fontSize: "36px",
  margin: "15px 0 8px",
};

const subtitleStyle = {
  color: "#64748b",
  maxWidth: "650px",
};

const backButtonStyle = {
  padding: "10px 18px",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "8px",
  cursor: "pointer",
};

const mainGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(400px, 1fr))",
  gap: "25px",
};

const cardStyle = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  padding: "30px",
  boxShadow:
    "0 5px 20px rgba(15,23,42,0.05)",
};

const helpText = {
  color: "#64748b",
};

const labelStyle = {
  display: "block",
  marginTop: "18px",
  marginBottom: "7px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "14px",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const generateButtonStyle = {
  width: "100%",
  marginTop: "25px",
  padding: "14px",
  border: "none",
  borderRadius: "8px",
  background: "#7c3aed",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: "15px",
};

const emptyStyle = {
  minHeight: "500px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "#64748b",
};

const robotStyle = {
  fontSize: "60px",
};

const generatedTitle = {
  color: "#2563eb",
};

const contentStyle = {
  color: "#475569",
  lineHeight: "1.7",
};

const listItemStyle = {
  marginBottom: "10px",
  color: "#475569",
  lineHeight: "1.5",
};

const skillsContainer = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const skillStyle = {
  background: "#eff6ff",
  color: "#2563eb",
  padding: "6px 10px",
  borderRadius: "15px",
  fontSize: "13px",
  fontWeight: "600",
};

const reviewNotice = {
  marginTop: "25px",
  padding: "14px",
  background: "#fffbeb",
  border: "1px solid #fde68a",
  borderRadius: "8px",
  color: "#92400e",
};

const publishButton = {
  width: "100%",
  marginTop: "15px",
  padding: "13px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

export default AIJobGenerator;