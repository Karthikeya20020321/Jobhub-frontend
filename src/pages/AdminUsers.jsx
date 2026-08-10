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

if (!confirmDelete) {
  return;
}

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

if (loading) {
return ( <div style={containerStyle}> <h2>Loading Users...</h2> </div>
);
}

return ( <div style={containerStyle}> <div style={headerStyle}> <div> <h1>Manage Users</h1>

      <p style={{ color: "#666" }}>
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

  <div style={countBox}>
    <strong>Total Users:</strong>{" "}
    {users.length}
  </div>

  {users.length === 0 ? (
    <div style={emptyStyle}>
      <h2>No Users Found</h2>

      <p style={{ color: "#666" }}>
        There are currently no users in JobHub.
      </p>
    </div>
  ) : (
    <div style={{ marginTop: "30px", overflowX: "auto" }}>
      <table style={tableStyle}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Role</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Joined</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={tdStyle}>
                {user.fullName || "N/A"}
              </td>

              <td style={tdStyle}>
                {user.email || "N/A"}
              </td>

              <td style={tdStyle}>
                <span
                  style={{
                    ...roleStyle,
                    background:
                      user.role === "admin"
                        ? "#ede9fe"
                        : user.role === "recruiter"
                        ? "#dcfce7"
                        : "#dbeafe",
                    color:
                      user.role === "admin"
                        ? "#6d28d9"
                        : user.role === "recruiter"
                        ? "#166534"
                        : "#1d4ed8",
                  }}
                >
                  {user.role || "candidate"}
                </span>
              </td>

              <td style={tdStyle}>
                {user.phone || "Not provided"}
              </td>

              <td style={tdStyle}>
                {user.createdAt
                  ? new Date(
                      user.createdAt
                    ).toLocaleDateString("en-IN")
                  : "N/A"}
              </td>

              <td style={tdStyle}>
                {user.role === "admin" ? (
                  <span
                    style={{
                      color: "#6b7280",
                      fontWeight: "bold",
                    }}
                  >
                    Admin
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      handleDelete(user._id)
                    }
                    disabled={
                      deleting === user._id
                    }
                    style={{
                      ...deleteButton,
                      background:
                        deleting === user._id
                          ? "#9ca3af"
                          : "#dc2626",
                      cursor:
                        deleting === user._id
                          ? "not-allowed"
                          : "pointer",
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

);
};

const containerStyle = {
maxWidth: "1200px",
margin: "40px auto",
padding: "20px",
};

const headerStyle = {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "20px",
flexWrap: "wrap",
};

const countBox = {
marginTop: "25px",
padding: "15px 20px",
background: "#eff6ff",
border: "1px solid #bfdbfe",
borderRadius: "8px",
};

const emptyStyle = {
marginTop: "30px",
padding: "50px",
textAlign: "center",
border: "1px solid #ddd",
borderRadius: "12px",
background: "#f9fafb",
};

const tableStyle = {
width: "100%",
borderCollapse: "collapse",
background: "white",
border: "1px solid #ddd",
};

const thStyle = {
padding: "14px",
textAlign: "left",
borderBottom: "1px solid #ddd",
whiteSpace: "nowrap",
};

const tdStyle = {
padding: "14px",
borderBottom: "1px solid #eee",
};

const roleStyle = {
display: "inline-block",
padding: "5px 10px",
borderRadius: "15px",
fontSize: "13px",
fontWeight: "bold",
textTransform: "capitalize",
};

const deleteButton = {
padding: "8px 14px",
color: "white",
border: "none",
borderRadius: "6px",
};

const backButton = {
padding: "10px 18px",
background: "#2563eb",
color: "white",
border: "none",
borderRadius: "6px",
cursor: "pointer",
};

export default AdminUsers;
