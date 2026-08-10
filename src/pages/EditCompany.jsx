import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCompanyById,
  updateCompany,
  uploadCompanyLogo,
} from "../services/companyService";

const EditCompany = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [logo, setLogo] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "",
  });

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    try {
      const data = await getCompanyById(id);

      setFormData({
        name: data.company.name || "",
        description: data.company.description || "",
        website: data.company.website || "",
        location: data.company.location || "",
        logo: data.company.logo || "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed to load company");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateCompany(id, formData);

      if (logo) {
        await uploadCompanyLogo(id, logo);
      }

      alert("Company updated successfully");

      navigate("/my-companies");
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Edit Company</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />

        <br /><br />

        {formData.logo && (
          <>
            <img
              src={formData.logo}
              alt="Company Logo"
              width="120"
              height="120"
              style={{
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ccc",
              }}
            />
            <br /><br />
          </>
        )}

        <input
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
        />

        <br /><br />

        <button type="submit">
          Update Company
        </button>
      </form>
    </div>
  );
};

export default EditCompany;