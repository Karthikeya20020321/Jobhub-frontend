import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getJobById, updateJob } from "../services/jobService";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    experienceLevel: "",
    jobType: "",
    position: "",
  });

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getJobById(id);

      setFormData({
        title: data.job.title,
        description: data.job.description,
        requirements: data.job.requirements,
        salary: data.job.salary,
        location: data.job.location,
        experienceLevel: data.job.experienceLevel,
        jobType: data.job.jobType,
        position: data.job.position,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await updateJob(id, formData);

      alert(data.message);

      navigate("/my-jobs");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Edit Job</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
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

        <input
          type="text"
          name="experienceLevel"
          placeholder="Experience"
          value={formData.experienceLevel}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="text"
          name="jobType"
          placeholder="Job Type"
          value={formData.jobType}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="position"
          placeholder="Open Positions"
          value={formData.position}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Update Job
        </button>
      </form>
    </div>
  );
};

export default EditJob;