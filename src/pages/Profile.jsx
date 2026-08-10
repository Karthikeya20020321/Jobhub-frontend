import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Profile form
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    bio: "",
    skills: "",
  });

  // Profile photo
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Resume
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploading, setResumeUploading] = useState(false);

  // Update profile
  const [updating, setUpdating] = useState(false);

  // JWT token
  const token = localStorage.getItem("token");

  // ==========================================
  // GET PROFILE
  // ==========================================

  const loadProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userData = response.data.user;

      setUser(userData);

      setFormData({
        fullName: userData.fullName || "",
        phone: userData.phone || "",
        bio: userData.bio || "",
        skills: userData.skills
          ? userData.skills.join(", ")
          : "",
      });
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // Load profile when page opens
  useEffect(() => {
    loadProfile();
  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // UPDATE PROFILE
  // ==========================================

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const response = await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          fullName: formData.fullName,
          phone: formData.phone,
          bio: formData.bio,
          skills: formData.skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data.user);

      alert("Profile updated successfully");

      // Reload profile
      await loadProfile();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Profile update failed"
      );
    } finally {
      setUpdating(false);
    }
  };

  // ==========================================
  // SELECT PROFILE PHOTO
  // ==========================================

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setSelectedFile(file);
  };

  // ==========================================
  // UPLOAD PROFILE PHOTO
  // ==========================================

  const handleUploadPhoto = async () => {
    if (!selectedFile) {
      alert("Please select an image first");
      return;
    }

    try {
      setUploading(true);

      const data = new FormData();

      data.append("profilePhoto", selectedFile);

      const response = await axios.put(
        "http://localhost:5000/api/auth/profile-photo",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile photo uploaded successfully");

      setUser((previousUser) => ({
        ...previousUser,
        profilePhoto: response.data.profilePhoto,
      }));

      setSelectedFile(null);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Profile photo upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  // ==========================================
  // SELECT RESUME
  // ==========================================

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file");
      return;
    }

    setResumeFile(file);
  };

  // ==========================================
  // UPLOAD RESUME
  // ==========================================

  const handleUploadResume = async () => {
    if (!resumeFile) {
      alert("Please select a PDF resume first");
      return;
    }

    try {
      setResumeUploading(true);

      const data = new FormData();

      data.append("resume", resumeFile);

      const response = await axios.put(
        "http://localhost:5000/api/auth/resume",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Resume uploaded successfully");

      setUser((previousUser) => ({
        ...previousUser,
        resume: response.data.resume,
      }));

      setResumeFile(null);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Resume upload failed"
      );
    } finally {
      setResumeUploading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div style={pageStyle}>
        <h2>Loading Profile...</h2>
      </div>
    );
  }

  // ==========================================
  // USER NOT FOUND
  // ==========================================

  if (!user) {
    return (
      <div style={pageStyle}>
        <h2>Unable to load profile</h2>
      </div>
    );
  }

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (
    <div style={pageStyle}>
      <div style={profileCardStyle}>

        <h1 style={{ textAlign: "center" }}>
          My Profile
        </h1>

        {/* ======================================
            PROFILE PHOTO
        ====================================== */}

        <div style={photoSectionStyle}>

          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              style={profileImageStyle}
            />
          ) : (
            <div style={defaultProfileStyle}>
              👤
            </div>
          )}

          <div style={{ marginTop: "20px" }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {selectedFile && (
            <p>
              Selected:{" "}
              <strong>{selectedFile.name}</strong>
            </p>
          )}

          <button
            type="button"
            onClick={handleUploadPhoto}
            disabled={uploading}
            style={blueButtonStyle}
          >
            {uploading
              ? "Uploading..."
              : "Upload Photo"}
          </button>
        </div>

        {/* ======================================
            RESUME
        ====================================== */}

        <div style={resumeBoxStyle}>

          <h2>Resume</h2>

          {user.resume ? (
            <div>

              <p>
                Resume uploaded successfully ✅
              </p>

              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  type="button"
                  style={blueButtonStyle}
                >
                  View Resume
                </button>
              </a>

            </div>
          ) : (
            <p>
              No resume uploaded
            </p>
          )}

          <div style={{ marginTop: "20px" }}>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleResumeChange}
            />

          </div>

          {resumeFile && (
            <p>
              Selected:{" "}
              <strong>{resumeFile.name}</strong>
            </p>
          )}

          <button
            type="button"
            onClick={handleUploadResume}
            disabled={resumeUploading}
            style={greenButtonStyle}
          >
            {resumeUploading
              ? "Uploading..."
              : "Upload Resume"}
          </button>

        </div>

        {/* ======================================
            PROFILE INFORMATION
        ====================================== */}

        <form onSubmit={handleUpdateProfile}>

          <h2>Personal Information</h2>

          {/* Full Name */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={inputStyle}
          />

          {/* Email */}

          <label>
            Email
          </label>

          <input
            type="email"
            value={user.email}
            disabled
            style={{
              ...inputStyle,
              background: "#f3f4f6",
            }}
          />

          {/* Phone */}

          <label>
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            style={inputStyle}
          />

          {/* Bio */}

          <label>
            Bio
          </label>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about yourself"
            style={inputStyle}
          />

          {/* Skills */}

          <label>
            Skills
          </label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, Express, MongoDB"
            style={inputStyle}
          />

          {/* Update Button */}

          <button
            type="submit"
            disabled={updating}
            style={greenButtonStyle}
          >
            {updating
              ? "Updating..."
              : "Update Profile"}
          </button>

        </form>

      </div>
    </div>
  );
};

// ==========================================
// STYLES
// ==========================================

const pageStyle = {
  minHeight: "100vh",
  padding: "40px 20px",
  background: "#f5f7fb",
  boxSizing: "border-box",
};

const profileCardStyle = {
  maxWidth: "700px",
  margin: "0 auto",
  padding: "30px",
  background: "white",
  border: "1px solid #ddd",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

const photoSectionStyle = {
  textAlign: "center",
  marginTop: "25px",
  marginBottom: "30px",
};

const profileImageStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "3px solid #ddd",
};

const defaultProfileStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  background: "#eee",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  fontSize: "60px",
};

const resumeBoxStyle = {
  marginTop: "30px",
  marginBottom: "30px",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  background: "#fafafa",
};

const inputStyle = {
  width: "100%",
  padding: "11px",
  marginTop: "7px",
  marginBottom: "18px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  boxSizing: "border-box",
  fontSize: "15px",
};

const blueButtonStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

const greenButtonStyle = {
  marginTop: "10px",
  padding: "11px 22px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Profile;