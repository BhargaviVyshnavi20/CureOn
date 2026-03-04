import axios from "axios";

const paymentsApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/payments",
});

paymentsApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

paymentsApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/token/refresh/",
            { refresh: refreshToken }
          );
          const { access } = response.data;
          localStorage.setItem("access_token", access);
          originalRequest.headers["Authorization"] = `Bearer ${access}`;
          return paymentsApi(originalRequest);
        } catch (refreshError) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

const submit = async ({ appointment_id, transaction_id, screenshot }) => {
  const formData = new FormData();
  formData.append("appointment_id", String(appointment_id));
  formData.append("transaction_id", transaction_id);
  formData.append("screenshot", screenshot);

  const response = await paymentsApi.post("/submit/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

const adminList = async () => {
  const response = await paymentsApi.get("/admin/list/");
  return response.data;
};

const approve = async (paymentId) => {
  const response = await paymentsApi.patch(`/admin/${paymentId}/approve/`);
  return response.data;
};

const reject = async (paymentId) => {
  const response = await paymentsApi.patch(`/admin/${paymentId}/reject/`);
  return response.data;
};

const normalizeStatus = (status) => String(status || "").toUpperCase();

export const paymentsService = {
  submit,
  adminList,
  approve,
  reject,
  normalizeStatus,
};
