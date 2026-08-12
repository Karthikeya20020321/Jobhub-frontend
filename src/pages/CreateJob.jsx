import { useEffect, useState } from "react";
import { createJob } from "../services/jobService";
import { getCompanies } from "../services/companyService";

const CreateJob = () => {
const [companies, setCompanies] = useState([]);

const [form, setForm] = useState({
title: "",
description: "",
requirements: "",
salary: "",
location: "",
experienceLevel: "Fresher",
jobType: "Full-time",
position: 1,
company: "",
});

useEffect(() => {
loadCompanies();
}, []);

const loadCompanies = async () => {
try {
const data = await getCompanies();
setCompanies(data.companies);
} catch (error) {
console.log(error);
}
};

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const data = await createJob(form);
  alert(data.message);

  setForm({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "Fresher",
    jobType: "Full-time",
    position: 1,
    company: "",
  });
} catch (error) {
  alert(error.response?.data?.message || "Failed to create job");
}

};

return ( <div style={styles.page}> <div style={styles.container}>

    {/* Header */}
    <div style={styles.header}>
      <div style={styles.icon}>💼</div>

      <div>
        <h1 style={styles.title}>Create Job</h1>
        <p style={styles.subtitle}>
          Create a new job opportunity and find the right candidates.
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit} style={styles.form}>

      {/* Job Title */}
      <div style={styles.field}>
        <label style={styles.label}>Job Title</label>
        <input
          name="title"
          placeholder="e.g. Full Stack Developer"
          value={form.title}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      {/* Description */}
      <div style={styles.field}>
        <label style={styles.label}>Job Description</label>
        <textarea
          name="description"
          placeholder="Describe the role, responsibilities and expectations..."
          value={form.description}
          onChange={handleChange}
          required
          rows="6"
          style={styles.textarea}
        />
      </div>

      {/* Requirements */}
      <div style={styles.field}>
        <label style={styles.label}>Requirements</label>
        <textarea
          name="requirements"
          placeholder="e.g. React, Node.js, MongoDB, JavaScript..."
          value={form.requirements}
          onChange={handleChange}
          required
          rows="4"
          style={styles.textarea}
        />
      </div>

      {/* Salary + Location */}
      <div style={styles.row}>
        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Salary</label>

          <div style={styles.inputWithPrefix}>
            <span style={styles.prefix}>₹</span>

            <input
              type="number"
              name="salary"
              placeholder="e.g. 800000"
              value={form.salary}
              onChange={handleChange}
              required
              style={styles.salaryInput}
            />
          </div>
        </div>

        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Location</label>

          <input
            name="location"
            placeholder="e.g. Hyderabad"
            value={form.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      {/* Experience + Job Type */}
      <div style={styles.row}>
        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Experience Level</label>

          <select
            name="experienceLevel"
            value={form.experienceLevel}
            onChange={handleChange}
            style={styles.select}
          >
            <option>Fresher</option>
            <option>1 Year</option>
            <option>2 Years</option>
            <option>3+ Years</option>
          </select>
        </div>

        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Job Type</label>

          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            style={styles.select}
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Internship</option>
            <option>Remote</option>
          </select>
        </div>
      </div>

      {/* Positions */}
      <div style={styles.field}>
        <label style={styles.label}>Open Positions</label>

        <input
          type="number"
          name="position"
          min="1"
          placeholder="Number of openings"
          value={form.position}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      {/* Company */}
      <div style={styles.field}>
        <label style={styles.label}>Company</label>

        <select
          name="company"
          value={form.company}
          onChange={handleChange}
          required
          style={styles.select}
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        {companies.length === 0 && (
          <p style={styles.warning}>
            No companies found. Please create a company first.
          </p>
        )}
      </div>

      {/* Submit */}
      <button type="submit" style={styles.button}>
        🚀 Create Job
      </button>
    </form>
  </div>
</div>

);
};

const styles = {
page: {
minHeight: "calc(100vh - 70px)",
background: "#f8fafc",
padding: "50px 20px",
display: "flex",
justifyContent: "center",
boxSizing: "border-box",
},

container: {
width: "100%",
maxWidth: "900px",
background: "#ffffff",
borderRadius: "18px",
padding: "40px",
boxShadow: "0 10px 35px rgba(15, 23, 42, 0.08)",
border: "1px solid #e2e8f0",
boxSizing: "border-box",
},

header: {
display: "flex",
alignItems: "center",
gap: "18px",
marginBottom: "35px",
},

icon: {
width: "58px",
height: "58px",
borderRadius: "14px",
background: "#eff6ff",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "28px",
flexShrink: 0,
},

title: {
margin: 0,
fontSize: "30px",
fontWeight: "700",
color: "#0f172a",
},

subtitle: {
margin: "6px 0 0",
fontSize: "15px",
color: "#64748b",
lineHeight: "1.5",
},

form: {
display: "flex",
flexDirection: "column",
gap: "22px",
},

field: {
display: "flex",
flexDirection: "column",
gap: "8px",
minWidth: 0,
},

label: {
fontSize: "14px",
fontWeight: "600",
color: "#334155",
},

input: {
width: "100%",
padding: "13px 15px",
border: "1px solid #cbd5e1",
borderRadius: "10px",
fontSize: "15px",
color: "#0f172a",
background: "#ffffff",
outline: "none",
boxSizing: "border-box",
},

textarea: {
width: "100%",
padding: "13px 15px",
border: "1px solid #cbd5e1",
borderRadius: "10px",
fontSize: "15px",
color: "#0f172a",
background: "#ffffff",
outline: "none",
resize: "vertical",
fontFamily: "inherit",
lineHeight: "1.5",
boxSizing: "border-box",
},

select: {
width: "100%",
padding: "13px 15px",
border: "1px solid #cbd5e1",
borderRadius: "10px",
fontSize: "15px",
color: "#0f172a",
background: "#ffffff",
outline: "none",
cursor: "pointer",
boxSizing: "border-box",
},

row: {
display: "flex",
gap: "20px",
width: "100%",
},

inputWithPrefix: {
display: "flex",
alignItems: "center",
border: "1px solid #cbd5e1",
borderRadius: "10px",
overflow: "hidden",
background: "#ffffff",
},

prefix: {
padding: "13px 14px",
background: "#f8fafc",
borderRight: "1px solid #e2e8f0",
color: "#475569",
fontWeight: "600",
},

salaryInput: {
width: "100%",
padding: "13px 15px",
border: "none",
outline: "none",
fontSize: "15px",
boxSizing: "border-box",
},

warning: {
margin: "0",
fontSize: "13px",
color: "#b45309",
background: "#fffbeb",
border: "1px solid #fde68a",
padding: "10px 12px",
borderRadius: "8px",
},

button: {
width: "100%",
marginTop: "8px",
padding: "15px 20px",
border: "none",
borderRadius: "10px",
background: "#2563eb",
color: "#ffffff",
fontSize: "16px",
fontWeight: "600",
cursor: "pointer",
},
};

export default CreateJob;
