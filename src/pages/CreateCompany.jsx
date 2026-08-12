import { useState } from "react";
import { createCompany } from "../services/companyService";

const CreateCompany = () => {
const [form, setForm] = useState({
name: "",
description: "",
website: "",
location: "",
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();

try {
  const data = await createCompany(form);
  alert(data.message);

  setForm({
    name: "",
    description: "",
    website: "",
    location: "",
  });
} catch (error) {
  alert(error.response?.data?.message || "Error creating company");
}

};

return ( <div style={styles.page}> <div style={styles.container}> <div style={styles.header}> <div style={styles.icon}>🏢</div>

      <div>
        <h1 style={styles.title}>Create Company</h1>
        <p style={styles.subtitle}>
          Add your company information to start posting jobs.
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.field}>
        <label style={styles.label}>Company Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter company name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Description</label>
        <textarea
          name="description"
          placeholder="Tell candidates about your company"
          value={form.description}
          onChange={handleChange}
          required
          rows="5"
          style={styles.textarea}
        />
      </div>

      <div style={styles.row}>
        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Website</label>
          <input
            type="url"
            name="website"
            placeholder="https://example.com"
            value={form.website}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        <div style={{ ...styles.field, flex: 1 }}>
          <label style={styles.label}>Location</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Hyderabad, India"
            value={form.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
      </div>

      <button type="submit" style={styles.button}>
        Create Company
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
maxWidth: "850px",
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
boxSizing: "border-box",
},

row: {
display: "flex",
gap: "20px",
width: "100%",
},

button: {
width: "100%",
marginTop: "8px",
padding: "14px 20px",
border: "none",
borderRadius: "10px",
background: "#2563eb",
color: "#ffffff",
fontSize: "16px",
fontWeight: "600",
cursor: "pointer",
},
};

export default CreateCompany;
