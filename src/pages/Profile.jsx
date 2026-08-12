import { useEffect, useState } from "react";
import API from "../services/api";

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

  // ==========================================
  // GET PROFILE
  // ==========================================

  const loadProfile = async () => {
    try {
      setLoading(true);

      const response = await API.get("/auth/profile");

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
      console.log("Load profile error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD PROFILE WHEN PAGE OPENS
  // ==========================================

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

      const response = await API.put("/auth/profile", {
        fullName: formData.fullName,
        phone: formData.phone,
        bio: formData.bio,
        skills: formData.skills,
      });

      setUser(response.data.user);

      setFormData({
        fullName: response.data.user.fullName || "",
        phone: response.data.user.phone || "",
        bio: response.data.user.bio || "",
        skills: response.data.user.skills
          ? response.data.user.skills.join(", ")
          : "",
      });

      alert("Profile updated successfully");

      await loadProfile();
    } catch (error) {
      console.log("Profile update error:", error);

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

      const response = await API.put(
        "/auth/profile-photo",
        data
      );

      alert("Profile photo uploaded successfully");

      setUser((previousUser) => ({
        ...previousUser,
        profilePhoto: response.data.profilePhoto,
      }));

      setSelectedFile(null);
    } catch (error) {
      console.log("Profile photo upload error:", error);

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

      const response = await API.put(
        "/auth/resume",
        data
      );

      alert("Resume uploaded successfully");

      setUser((previousUser) => ({
        ...previousUser,
        resume: response.data.resume,
      }));

      setResumeFile(null);
    } catch (error) {
      console.log("Resume upload error:", error);

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
        <div style={loadingCardStyle}>
          <div style={loadingIconStyle}>👤</div>
          <h2>Loading Profile...</h2>
          <p>Please wait while we load your profile.</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // USER NOT FOUND
  // ==========================================

  if (!user) {
    return (
      <div style={pageStyle}>
        <div style={errorCardStyle}>
          <div style={errorIconStyle}>⚠️</div>

          <h2>Unable to load profile</h2>

          <p>
            We couldn't load your profile information.
          </p>

          <button
            type="button"
            onClick={loadProfile}
            style={blueButtonStyle}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PROFILE PAGE
  // ==========================================

  return (
    <div style={pageStyle}>
      <div style={profileCardStyle}>

        {/* HEADER */}

        <div style={headerStyle}>
          <h1 style={titleStyle}>My Profile</h1>

          <p style={subtitleStyle}>
            Manage your personal information, profile photo
            and resume.
          </p>
        </div>

        {/* ======================================
            PROFILE PHOTO
        ====================================== */}

        <div style={photoSectionStyle}>
          <h2 style={sectionTitleStyle}>
            Profile Photo
          </h2>

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

          <div style={fileInputWrapperStyle}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={fileInputStyle}
            />
          </div>

          {selectedFile && (
            <p style={selectedFileStyle}>
              Selected:{" "}
              <strong>{selectedFile.name}</strong>
            </p>
          )}

          <button
            type="button"
            onClick={handleUploadPhoto}
            disabled={uploading}
            style={{
              ...blueButtonStyle,
              opacity: uploading ? 0.7 : 1,
            }}
          >
            {uploading
              ? "Uploading..."
              : "📷 Upload Photo"}
          </button>
        </div>

        {/* ======================================
            RESUME
        ====================================== */}

        <div style={resumeBoxStyle}>
          <div style={resumeHeaderStyle}>
            <div>
              <h2 style={sectionTitleStyle}>
                Resume
              </h2>

              <p style={sectionDescriptionStyle}>
                Upload your latest resume in PDF format.
              </p>
            </div>

            <div style={resumeIconStyle}>
              📄
            </div>
          </div>

          {user.resume ? (
            <div style={resumeUploadedStyle}>
              <div>
                <strong>
                  Resume uploaded successfully ✅
                </strong>

                <p style={{ margin: "5px 0 0" }}>
                  Your resume is ready to view.
                </p>
              </div>

              <a
                href={user.resume}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <button
                  type="button"
                  style={blueButtonStyle}
                >
                  👁 View Resume
                </button>
              </a>
            </div>
          ) : (
            <div style={noResumeStyle}>
              <span>📄</span>
              <span>No resume uploaded</span>
            </div>
          )}

          <div style={fileInputWrapperStyle}>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleResumeChange}
              style={fileInputStyle}
            />
          </div>

          {resumeFile && (
            <p style={selectedFileStyle}>
              Selected:{" "}
              <strong>{resumeFile.name}</strong>
            </p>
          )}

          <button
            type="button"
            onClick={handleUploadResume}
            disabled={resumeUploading}
            style={{
              ...greenButtonStyle,
              opacity: resumeUploading ? 0.7 : 1,
            }}
          >
            {resumeUploading
              ? "Uploading..."
              : "📤 Upload Resume"}
          </button>
        </div>

        {/* ======================================
            PROFILE INFORMATION
        ====================================== */}

        <form onSubmit={handleUpdateProfile}>
          <div style={sectionHeaderStyle}>
            <h2 style={sectionTitleStyle}>
              Personal Information
            </h2>

            <p style={sectionDescriptionStyle}>
              Keep your information up to date.
            </p>
          </div>

          {/* Full Name */}

          <label style={labelStyle}>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            style={inputStyle}
          />

          {/* Email */}

          <label style={labelStyle}>
            Email
          </label>

          <input
            type="email"
            value={user.email || ""}
            disabled
            style={{
              ...inputStyle,
              background: "#f3f4f6",
              color: "#6b7280",
              cursor: "not-allowed",
            }}
          />

          {/* Phone */}

          <label style={labelStyle}>
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

          <label style={labelStyle}>
            Bio
          </label>

          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows="5"
            placeholder="Tell us about yourself"
            style={{
              ...inputStyle,
              resize: "vertical",
            }}
          />

          {/* Skills */}

          <label style={labelStyle}>
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

          <p style={skillsHintStyle}>
            Separate multiple skills with commas.
          </p>

          {/* Update Button */}

          <button
            type="submit"
            disabled={updating}
            style={{
              ...greenButtonStyle,
              width: "100%",
              padding: "13px 20px",
              fontSize: "16px",
              opacity: updating ? 0.7 : 1,
            }}
          >
            {updating
              ? "Updating Profile..."
              : "✓ Update Profile"}
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
  background:
    "linear-gradient(135deg, #f5f7fb 0%, #eef2ff 100%)",
  boxSizing: "border-box",
};

const profileCardStyle = {
  maxWidth: "750px",
  margin: "0 auto",
  padding: "35px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "18px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
  boxSizing: "border-box",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "30px",
};

const titleStyle = {
  margin: 0,
  fontSize: "32px",
  fontWeight: "700",
  color: "#111827",
};

const subtitleStyle = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "15px",
};

const sectionTitleStyle = {
  margin: 0,
  color: "#111827",
  fontSize: "21px",
  fontWeight: "650",
};

const sectionDescriptionStyle = {
  margin: "6px 0 0",
  color: "#6b7280",
  fontSize: "14px",
};

const sectionHeaderStyle = {
  marginBottom: "20px",
};

const photoSectionStyle = {
  textAlign: "center",
  marginTop: "20px",
  marginBottom: "30px",
  padding: "25px",
  background: "#f9fafb",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
};

const profileImageStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "4px solid #ffffff",
  boxShadow:
    "0 5px 18px rgba(0,0,0,0.15)",
};

const defaultProfileStyle = {
  width: "150px",
  height: "150px",
  borderRadius: "50%",
  background:
    "linear-gradient(135deg, #dbeafe, #e0e7ff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  fontSize: "60px",
  border: "4px solid #ffffff",
  boxShadow:
    "0 5px 18px rgba(0,0,0,0.1)",
};

const fileInputWrapperStyle = {
  marginTop: "20px",
  padding: "10px",
  background: "#ffffff",
  borderRadius: "8px",
  border: "1px dashed #cbd5e1",
};

const fileInputStyle = {
  width: "100%",
  fontSize: "14px",
};

const selectedFileStyle = {
  color: "#374151",
  fontSize: "14px",
  marginTop: "10px",
};

const resumeBoxStyle = {
  marginTop: "30px",
  marginBottom: "30px",
  padding: "25px",
  border: "1px solid #dbeafe",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg, #f8fbff, #eff6ff)",
};

const resumeHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  marginBottom: "20px",
};

const resumeIconStyle = {
  fontSize: "35px",
};

const resumeUploadedStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "15px",
  flexWrap: "wrap",
  padding: "15px",
  background: "#ecfdf5",
  border: "1px solid #bbf7d0",
  borderRadius: "10px",
  color: "#166534",
};

const noResumeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "15px",
  background: "#ffffff",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  color: "#6b7280",
};

const labelStyle = {
  display: "block",
  marginBottom: "7px",
  color: "#374151",
  fontWeight: "600",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  marginBottom: "18px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "15px",
  outline: "none",
  background: "#ffffff",
};

const skillsHintStyle = {
  marginTop: "-10px",
  marginBottom: "18px",
  color: "#6b7280",
  fontSize: "12px",
};

const blueButtonStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const greenButtonStyle = {
  marginTop: "10px",
  padding: "11px 22px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const loadingCardStyle = {
  maxWidth: "500px",
  margin: "100px auto",
  padding: "40px",
  textAlign: "center",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

const loadingIconStyle = {
  fontSize: "50px",
  marginBottom: "15px",
};

const errorCardStyle = {
  maxWidth: "500px",
  margin: "100px auto",
  padding: "40px",
  textAlign: "center",
  background: "#ffffff",
  borderRadius: "16px",
  boxShadow:
    "0 10px 30px rgba(0,0,0,0.08)",
};

const errorIconStyle = {
  fontSize: "45px",
  marginBottom: "10px",
};

export default Profile;