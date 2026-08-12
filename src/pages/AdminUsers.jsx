import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminUsers = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users || []);
    } catch (error) {
      console.log("Users error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load users"
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(userId);

      const token = localStorage.getItem("token");

      const response = await API.delete(
        `/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        response.data.message ||
          "User deleted successfully"
      );

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user._id !== userId
        )
      );
    } catch (error) {
      console.log("Delete user error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    } finally {
      setDeleting(null);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={loadingCard}>
          <div style={loadingIcon}>👥</div>
          <h2>Loading Users...</h2>
          <p>
            Please wait while we load JobHub users.
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // UI
  // =========================

  return (
    <div style={pageStyle}>
      {/* HEADER */}

      <div style={headerStyle}>
        <div>
          <div style={smallLabel}>
            ADMIN CONTROL
          </div>

          <h1 style={titleStyle}>
            Manage Users
          </h1>

          <p style={subtitleStyle}>
            View and manage all JobHub users.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin")}
          style={backButton}
        >
          ← Admin Dashboard
        </button>
      </div>

      {/* USER SUMMARY */}

      <div style={summaryGrid}>
        <div style={summaryCard}>
          <div style={summaryIcon}>👥</div>

          <div>
            <p style={summaryLabel}>
              Total Users
            </p>

            <h2 style={summaryNumber}>
              {users.length}
            </h2>
          </div>
        </div>

        <div style={summaryCard}>
          <div
            style={{
              ...summaryIcon,
              background: "#dcfce7",
            }}
          >
            💼
          </div>

          <div>
            <p style={summaryLabel}>
              Recruiters
            </p>

            <h2 style={summaryNumber}>
              {
                users.filter(
                  (user) =>
                    user.role === "recruiter"
                ).length
              }
            </h2>
          </div>
        </div>

        <div style={summaryCard}>
          <div
            style={{
              ...summaryIcon,
              background: "#dbeafe",
            }}
          >
            👤
          </div>

          <div>
            <p style={summaryLabel}>
              Candidates
            </p>

            <h2 style={summaryNumber}>
              {
                users.filter(
                  (user) =>
                    user.role === "candidate"
                ).length
              }
            </h2>
          </div>
        </div>
      </div>

      {/* USERS SECTION */}

      <div style={sectionCard}>
        <div style={sectionHeader}>
          <div>
            <h2 style={sectionTitle}>
              All Users
            </h2>

            <p style={sectionSubtitle}>
              Manage registered users on the
              JobHub platform.
            </p>
          </div>

          <button
            onClick={loadUsers}
            style={refreshButton}
          >
            🔄 Refresh
          </button>
        </div>

        {users.length === 0 ? (
          <div style={emptyStyle}>
            <div style={emptyIcon}>👥</div>

            <h2>No Users Found</h2>

            <p>
              There are currently no users in
              JobHub.
            </p>
          </div>
        ) : (
          <div style={tableWrapper}>
            <table style={tableStyle}>
              <thead>
                <tr style={tableHeaderRow}>
                  <th style={thStyle}>User</th>
                  <th style={thStyle}>Email</th>
                  <th style={thStyle}>Role</th>
                  <th style={thStyle}>Phone</th>
                  <th style={thStyle}>Joined</th>
                  <th
                    style={{
                      ...thStyle,
                      textAlign: "center",
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user._id}
                    style={tableRowStyle}
                  >
                    {/* USER */}

                    <td style={tdStyle}>
                      <div style={userInfo}>
                        <div style={avatarStyle}>
                          {user.fullName
                            ?.charAt(0)
                            ?.toUpperCase() ||
                            "U"}
                        </div>

                        <div>
                          <strong
                            style={{
                              color: "#111827",
                            }}
                          >
                            {user.fullName ||
                              "N/A"}
                          </strong>

                          <div
                            style={{
                              fontSize: "12px",
                              color: "#9ca3af",
                              marginTop: "3px",
                            }}
                          >
                            User ID:{" "}
                            {user._id?.slice(
                              -6
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* EMAIL */}

                    <td style={tdStyle}>
                      <span
                        style={{
                          color: "#374151",
                        }}
                      >
                        {user.email || "N/A"}
                      </span>
                    </td>

                    {/* ROLE */}

                    <td style={tdStyle}>
                      <span
                        style={{
                          ...roleStyle,
                          ...getRoleStyle(
                            user.role
                          ),
                        }}
                      >
                        {user.role ||
                          "candidate"}
                      </span>
                    </td>

                    {/* PHONE */}

                    <td style={tdStyle}>
                      {user.phone ||
                        "Not provided"}
                    </td>

                    {/* JOINED */}

                    <td style={tdStyle}>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "N/A"}
                    </td>

                    {/* ACTION */}

                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "center",
                      }}
                    >
                      {user.role === "admin" ? (
                        <span
                          style={protectedStyle}
                        >
                          🔒 Protected
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            handleDelete(
                              user._id
                            )
                          }
                          disabled={
                            deleting ===
                            user._id
                          }
                          style={{
                            ...deleteButton,
                            ...(deleting ===
                            user._id
                              ? deletingButton
                              : {}),
                          }}
                        >
                          {deleting === user._id
                            ? "Deleting..."
                            : "🗑 Delete"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* FOOTER INFO */}

      <div style={infoCard}>
        <div style={infoIcon}>🛡️</div>

        <div>
          <h3
            style={{
              margin: 0,
              color: "#111827",
            }}
          >
            Admin Security
          </h3>

          <p
            style={{
              margin:
                "5px 0 0",
              color: "#6b7280",
            }}
          >
            Admin accounts are protected and
            cannot be deleted from this page.
          </p>
        </div>
      </div>
    </div>
  );
};

// =========================
// ROLE COLORS
// =========================

const getRoleStyle = (role) => {
  if (role === "admin") {
    return {
      background: "#ede9fe",
      color: "#6d28d9",
    };
  }

  if (role === "recruiter") {
    return {
      background: "#dcfce7",
      color: "#166534",
    };
  }

  return {
    background: "#dbeafe",
    color: "#1d4ed8",
  };
};

// =========================
// PAGE
// =========================

const pageStyle = {
  maxWidth: "1100px",
  margin: "40px auto",
  padding: "30px",
  minHeight: "100vh",
};

// =========================
// HEADER
// =========================

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "30px",
};

const smallLabel = {
  fontSize: "13px",
  fontWeight: "700",
  color: "#2563eb",
  letterSpacing: "1px",
  marginBottom: "8px",
};

const titleStyle = {
  margin: 0,
  fontSize: "32px",
  color: "#111827",
};

const subtitleStyle = {
  marginTop: "8px",
  color: "#6b7280",
  fontSize: "16px",
};

const backButton = {
  padding: "12px 20px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  boxShadow:
    "0 4px 10px rgba(37,99,235,0.2)",
};

// =========================
// SUMMARY
// =========================

const summaryGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "20px",
  marginBottom: "30px",
};

const summaryCard = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  padding: "22px",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  boxShadow:
    "0 4px 12px rgba(0,0,0,0.05)",
};

const summaryIcon = {
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  background: "#dbeafe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "24px",
};

const summaryLabel = {
  margin: 0,
  color: "#6b7280",
  fontSize: "14px",
};

const summaryNumber = {
  margin: "4px 0 0",
  fontSize: "28px",
  color: "#111827",
};

// =========================
// SECTION
// =========================

const sectionCard = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  padding: "25px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.05)",
};

const sectionHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "15px",
  marginBottom: "25px",
};

const sectionTitle = {
  margin: 0,
  fontSize: "22px",
  color: "#111827",
};

const sectionSubtitle = {
  margin: "6px 0 0",
  color: "#6b7280",
};

const refreshButton = {
  padding: "10px 17px",
  background: "#eff6ff",
  color: "#2563eb",
  border: "1px solid #bfdbfe",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

// =========================
// TABLE
// =========================

const tableWrapper = {
  overflowX: "auto",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  minWidth: "850px",
};

const tableHeaderRow = {
  background: "#f8fafc",
};

const thStyle = {
  padding: "15px",
  textAlign: "left",
  borderBottom: "1px solid #e5e7eb",
  color: "#6b7280",
  fontSize: "13px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle = {
  padding: "16px 15px",
  borderBottom: "1px solid #f1f5f9",
  color: "#4b5563",
  fontSize: "14px",
};

const tableRowStyle = {
  transition: "background 0.2s",
};

const userInfo = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const avatarStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "#dbeafe",
  color: "#2563eb",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: "bold",
  fontSize: "16px",
};

const roleStyle = {
  display: "inline-block",
  padding: "6px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "700",
  textTransform: "capitalize",
};

const deleteButton = {
  padding: "8px 14px",
  background: "#dc2626",
  color: "white",
  border: "none",
  borderRadius: "7px",
  cursor: "pointer",
  fontWeight: "600",
};

const deletingButton = {
  background: "#9ca3af",
  cursor: "not-allowed",
};

const protectedStyle = {
  color: "#6b7280",
  fontSize: "13px",
  fontWeight: "600",
};

// =========================
// EMPTY
// =========================

const emptyStyle = {
  padding: "60px 20px",
  textAlign: "center",
  background: "#f8fafc",
  borderRadius: "12px",
  border: "1px dashed #cbd5e1",
};

const emptyIcon = {
  fontSize: "45px",
  marginBottom: "10px",
};

// =========================
// LOADING
// =========================

const loadingCard = {
  maxWidth: "500px",
  margin: "100px auto",
  padding: "50px",
  textAlign: "center",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "16px",
  boxShadow:
    "0 4px 15px rgba(0,0,0,0.05)",
};

const loadingIcon = {
  fontSize: "50px",
  marginBottom: "10px",
};

// =========================
// INFO
// =========================

const infoCard = {
  display: "flex",
  alignItems: "center",
  gap: "15px",
  marginTop: "25px",
  padding: "20px",
  background: "#f8fafc",
  border: "1px solid #e5e7eb",
  borderRadius: "12px",
};

const infoIcon = {
  width: "45px",
  height: "45px",
  borderRadius: "10px",
  background: "#dbeafe",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "22px",
};

export default AdminUsers;