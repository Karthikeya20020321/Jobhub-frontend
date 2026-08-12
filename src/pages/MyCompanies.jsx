import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCompanies, deleteCompany } from "../services/companyService";

const MyCompanies = () => {
const navigate = useNavigate();

const [companies, setCompanies] = useState([]);

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

const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this company?"
);

if (!confirmDelete) return;

try {
  const data = await deleteCompany(id);

  alert(data.message);

  loadCompanies();
} catch (error) {
  alert(error.response?.data?.message || "Delete failed");
}

};

return ( <div style={styles.page}> <div style={styles.container}>

    {/* Header */}
    <div style={styles.header}>
      <div>
        <h1 style={styles.title}>My Companies</h1>
        <p style={styles.subtitle}>
          Manage the companies you have created and their information.
        </p>
      </div>

      <button
        style={styles.createButton}
        onClick={() => navigate("/create-company")}
      >
        + Create Company
      </button>
    </div>

    {/* Company Count */}
    {companies.length > 0 && (
      <div style={styles.count}>
        {companies.length}{" "}
        {companies.length === 1 ? "Company" : "Companies"}
      </div>
    )}

    {/* Empty State */}
    {companies.length === 0 ? (
      <div style={styles.emptyState}>
        <div style={styles.emptyIcon}>🏢</div>

        <h2 style={styles.emptyTitle}>No Companies Found</h2>

        <p style={styles.emptyText}>
          You haven't created any companies yet. Create your first
          company to start posting jobs.
        </p>

        <button
          style={styles.emptyButton}
          onClick={() => navigate("/create-company")}
        >
          Create Your First Company
        </button>
      </div>
    ) : (
      <div style={styles.grid}>
        {companies.map((company) => (
          <div key={company._id} style={styles.card}>

            {/* Company Header */}
            <div style={styles.cardHeader}>
              <div style={styles.companyIcon}>🏢</div>

              <div style={styles.companyNameContainer}>
                <h2 style={styles.companyName}>
                  {company.name}
                </h2>

                <span style={styles.locationBadge}>
                  📍 {company.location}
                </span>
              </div>
            </div>

            {/* Description */}
            <p style={styles.description}>
              {company.description}
            </p>

            {/* Website */}
            {company.website && (
              <div style={styles.websiteBox}>
                <span style={styles.websiteIcon}>🌐</span>

                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.website}
                >
                  {company.website}
                </a>
              </div>
            )}

            {/* Actions */}
            <div style={styles.actions}>

              <button
                style={styles.editButton}
                onClick={() =>
                  navigate(`/edit-company/${company._id}`)
                }
              >
                ✏️ Edit
              </button>

              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(company._id)}
              >
                🗑️ Delete
              </button>

            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>

);
};

const styles = {
page: {
minHeight: "calc(100vh - 70px)",
background: "#f8fafc",
padding: "50px 20px",
boxSizing: "border-box",
},

container: {
width: "100%",
maxWidth: "1150px",
margin: "0 auto",
},

header: {
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "20px",
marginBottom: "25px",
flexWrap: "wrap",
},

title: {
margin: 0,
fontSize: "32px",
fontWeight: "700",
color: "#0f172a",
},

subtitle: {
margin: "7px 0 0",
color: "#64748b",
fontSize: "15px",
},

createButton: {
border: "none",
background: "#2563eb",
color: "#ffffff",
padding: "12px 20px",
borderRadius: "10px",
fontSize: "15px",
fontWeight: "600",
cursor: "pointer",
boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
},

count: {
display: "inline-block",
background: "#eff6ff",
color: "#2563eb",
padding: "7px 12px",
borderRadius: "20px",
fontSize: "13px",
fontWeight: "600",
marginBottom: "20px",
},

grid: {
display: "grid",
gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
gap: "22px",
},

card: {
background: "#ffffff",
border: "1px solid #e2e8f0",
borderRadius: "16px",
padding: "24px",
boxShadow: "0 8px 25px rgba(15, 23, 42, 0.06)",
transition: "transform 0.2s ease",
},

cardHeader: {
display: "flex",
alignItems: "center",
gap: "15px",
marginBottom: "18px",
},

companyIcon: {
width: "52px",
height: "52px",
borderRadius: "13px",
background: "#eff6ff",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "25px",
flexShrink: 0,
},

companyNameContainer: {
minWidth: 0,
},

companyName: {
margin: 0,
color: "#0f172a",
fontSize: "20px",
fontWeight: "700",
wordBreak: "break-word",
},

locationBadge: {
display: "inline-block",
marginTop: "6px",
color: "#64748b",
fontSize: "13px",
},

description: {
color: "#475569",
fontSize: "14px",
lineHeight: "1.6",
minHeight: "65px",
margin: "0 0 18px",
},

websiteBox: {
display: "flex",
alignItems: "center",
gap: "8px",
background: "#f8fafc",
border: "1px solid #e2e8f0",
padding: "10px 12px",
borderRadius: "9px",
marginBottom: "20px",
overflow: "hidden",
},

websiteIcon: {
flexShrink: 0,
},

website: {
color: "#2563eb",
textDecoration: "none",
fontSize: "13px",
overflow: "hidden",
textOverflow: "ellipsis",
whiteSpace: "nowrap",
},

actions: {
display: "flex",
gap: "10px",
borderTop: "1px solid #e2e8f0",
paddingTop: "18px",
},

editButton: {
flex: 1,
padding: "11px 15px",
borderRadius: "9px",
border: "1px solid #bfdbfe",
background: "#eff6ff",
color: "#2563eb",
fontWeight: "600",
fontSize: "14px",
cursor: "pointer",
},

deleteButton: {
flex: 1,
padding: "11px 15px",
borderRadius: "9px",
border: "1px solid #fecaca",
background: "#fef2f2",
color: "#dc2626",
fontWeight: "600",
fontSize: "14px",
cursor: "pointer",
},

emptyState: {
background: "#ffffff",
border: "1px solid #e2e8f0",
borderRadius: "18px",
padding: "70px 30px",
textAlign: "center",
boxShadow: "0 8px 25px rgba(15, 23, 42, 0.05)",
},

emptyIcon: {
width: "70px",
height: "70px",
borderRadius: "18px",
background: "#eff6ff",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: "32px",
margin: "0 auto 20px",
},

emptyTitle: {
margin: 0,
color: "#0f172a",
fontSize: "22px",
},

emptyText: {
maxWidth: "500px",
margin: "10px auto 25px",
color: "#64748b",
fontSize: "15px",
lineHeight: "1.6",
},

emptyButton: {
border: "none",
background: "#2563eb",
color: "#ffffff",
padding: "12px 20px",
borderRadius: "10px",
fontSize: "15px",
fontWeight: "600",
cursor: "pointer",
},
};

export default MyCompanies;
