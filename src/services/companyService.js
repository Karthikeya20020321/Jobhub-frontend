import API from "./api";

export const createCompany = async (companyData) => {
  const token = localStorage.getItem("token");

  const response = await API.post("/company", companyData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getCompanies = async () => {
  const token = localStorage.getItem("token");

  const response = await API.get("/company", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getCompanyById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.get(`/company/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const updateCompany = async (id, companyData) => {
  const token = localStorage.getItem("token");

  const response = await API.put(
    `/company/${id}`,
    companyData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
export const deleteCompany = async (id) => {
  const token = localStorage.getItem("token");

  const response = await API.delete(`/company/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const uploadCompanyLogo = async (id, file) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("logo", file);

  const response = await API.put(
    `/company/logo/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};