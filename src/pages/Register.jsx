import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await API.post("/auth/register", formData);

      alert(res.data.message || "Registration successful!");

      navigate("/login");
    } catch (error) {
      console.log("Registration error:", error);

      alert(
        error.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div style={registerCardStyle}>

        {/* Header */}

        <div style={headerStyle}>
          <div style={logoStyle}>💼</div>

          <h1 style={titleStyle}>
            Create Your Account
          </h1>

          <p style={subtitleStyle}>
            Join JobHub and find your next opportunity
          </p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Email */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Password */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={inputStyle}
            />
          </div>

          {/* Role */}

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Account Type
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="candidate">
                👤 Candidate
              </option>

              <option value="recruiter">
                💼 Recruiter
              </option>
            </select>
          </div>

          {/* Register Button */}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...registerButtonStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        {/* Login */}

        <div style={loginSectionStyle}>
          <p style={loginTextStyle}>
            Already have an account?
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            style={loginButtonStyle}
          >
            Sign In
          </button>
        </div>

      </div>
    </div>
  );
};

/* ==============================
   PAGE
============================== */

const pageStyle = {
  minHeight: "100vh",
  background:
    "linear-gradient(135deg, #eff6ff 0%, #f8fafc 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
  boxSizing: "border-box",
};

/* ==============================
   REGISTER CARD
============================== */

const registerCardStyle = {
  width: "100%",
  maxWidth: "450px",
  background: "white",
  borderRadius: "16px",
  padding: "40px",
  boxSizing: "border-box",
  boxShadow:
    "0 10px 30px rgba(0, 0, 0, 0.08)",
  border: "1px solid #e5e7eb",
};

/* ==============================
   HEADER
============================== */

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const logoStyle = {
  width: "60px",
  height: "60px",
  margin: "0 auto 15px",
  borderRadius: "14px",
  background: "#2563eb",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "28px",
};

const titleStyle = {
  margin: 0,
  color: "#111827",
  fontSize: "28px",
};

const subtitleStyle = {
  marginTop: "10px",
  marginBottom: 0,
  color: "#6b7280",
  fontSize: "15px",
};

/* ==============================
   FORM
============================== */

const fieldStyle = {
  marginBottom: "20px",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#374151",
  fontWeight: "600",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "13px 14px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

/* ==============================
   REGISTER BUTTON
============================== */

const registerButtonStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "5px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  fontWeight: "600",
};

/* ==============================
   LOGIN
============================== */

const loginSectionStyle = {
  marginTop: "28px",
  paddingTop: "22px",
  borderTop: "1px solid #e5e7eb",
  textAlign: "center",
};

const loginTextStyle = {
  margin: 0,
  color: "#6b7280",
  fontSize: "14px",
};

const loginButtonStyle = {
  marginTop: "8px",
  background: "transparent",
  border: "none",
  color: "#2563eb",
  fontWeight: "600",
  fontSize: "15px",
  cursor: "pointer",
};

export default Register;