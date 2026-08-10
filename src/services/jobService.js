import API from "./api";

export const getAllJobs = async () => {
  const response = await API.get("/jobs");
  return response.data;
};

export const getJobById = async (id) => {
  const response = await API.get(`/jobs/${id}`);
  return response.data;
};

export const createJob = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/jobs", jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// NEW
export const getMyJobs = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/jobs/my", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const deleteJob = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/jobs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const updateJob = async (id, jobData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(`/jobs/${id}`, jobData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const searchJobs = async (filters) => {
  const response = await API.get("/jobs", {
    params: filters,
  });

  return response.data;
};