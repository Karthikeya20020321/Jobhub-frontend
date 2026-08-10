import API from "./api";

const getToken = () => {
  return localStorage.getItem("token");
};

// ==========================================
// APPLY FOR JOB - CANDIDATE
// ==========================================

export const applyJob = async (jobId) => {
  const token = getToken();

  const response = await API.post(
    "/applications/apply",
    { jobId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// GET MY APPLICATIONS - CANDIDATE
// ==========================================

export const getMyApplications = async () => {
  const token = getToken();

  const response = await API.get(
    "/applications/my-applications",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// GET APPLICANTS - RECRUITER
// ==========================================

export const getApplicantsByJob = async (jobId) => {
  const token = getToken();

  const response = await API.get(
    `/applications/job/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// ==========================================
// ACCEPT / REJECT APPLICATION - RECRUITER
// ==========================================

export const updateApplicationStatus = async (
  applicationId,
  status
) => {
  const token = getToken();

  const response = await API.put(
    `/applications/${applicationId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
