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

  return (
    <div style={{ padding: "30px" }}>
      <h1>Create Company</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Company Name"
          value={form.name}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <br /><br />

        <button type="submit">Create Company</button>
      </form>
    </div>
  );
};

export default CreateCompany;