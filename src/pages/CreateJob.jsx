import { useEffect, useState } from "react";
import { createJob } from "../services/jobService";
import { getCompanies } from "../services/companyService";

const CreateJob = () => {
  const [companies, setCompanies] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "Fresher",
    jobType: "Full-time",
    position: 1,
    company: "",
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await createJob(form);
      alert(data.message);

      setForm({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        experienceLevel: "Fresher",
        jobType: "Full-time",
        position: 1,
        company: "",
      });
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create job");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "auto" }}>
      <h2>Create Job</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Job Title"
          value={form.title}
          onChange={handleChange}
        />
        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="requirements"
          placeholder="Requirements"
          value={form.requirements}
          onChange={handleChange}
        />
        <br /><br />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />
        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />
        <br /><br />

        <select
          name="experienceLevel"
          value={form.experienceLevel}
          onChange={handleChange}
        >
          <option>Fresher</option>
          <option>1 Year</option>
          <option>2 Years</option>
          <option>3+ Years</option>
        </select>

        <br /><br />

        <select
          name="jobType"
          value={form.jobType}
          onChange={handleChange}
        >
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Internship</option>
          <option>Remote</option>
        </select>

        <br /><br />

        <input
          type="number"
          name="position"
          placeholder="Open Positions"
          value={form.position}
          onChange={handleChange}
        />
        <br /><br />

        <select
          name="company"
          value={form.company}
          onChange={handleChange}
        >
          <option value="">Select Company</option>

          {companies.map((company) => (
            <option key={company._id} value={company._id}>
              {company.name}
            </option>
          ))}
        </select>

        <br /><br />

        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default CreateJob;