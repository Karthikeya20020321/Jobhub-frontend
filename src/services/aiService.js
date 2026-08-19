import API from "./api";

export const generateJobWithAI = async (jobData) => {
  const token = localStorage.getItem("token");

  const response = await API.post(
    "/ai/generate-job",
    jobData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};