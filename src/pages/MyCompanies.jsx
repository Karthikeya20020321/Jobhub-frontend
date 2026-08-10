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

  return (
    <div style={{ padding: "30px" }}>
      <h1>My Companies</h1>

      {companies.length === 0 ? (
        <p>No Companies Found</p>
      ) : (
        companies.map((company) => (
          <div
            key={company._id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{company.name}</h2>

            <p>{company.description}</p>

            <p>
              <strong>Location:</strong> {company.location}
            </p>

            <p>
              <strong>Website:</strong> {company.website}
            </p>

            <button
             onClick={() => navigate(`/edit-company/${company._id}`)}
            >
            Edit
            </button>

            <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleDelete(company._id)}
            >
            Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyCompanies;