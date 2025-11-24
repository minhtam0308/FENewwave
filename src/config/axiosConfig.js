import axios from "axios";


const instance = axios.create({
  baseURL: 'https://localhost:7118'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("accessToken")}`;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response?.data;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (error?.response?.status === 401) {
    await handleRefreshToken();
  }
  // Do something with response error
  return Promise.reject(error?.response);
});

const handleRefreshToken = async () => {
  const resfreshToken = await instance.post(`/api/Auth/refresh-token`,
    { UserId: JSON.parse(localStorage.getItem("user")).id, RefreshToken: localStorage.getItem("refreshToken") });
  if (resfreshToken) {
    localStorage.setItem("accessToken", resfreshToken.accessToken);
    localStorage.setItem("refreshToken", resfreshToken.refreshToken);
    localStorage.setItem("user", JSON.stringify(resfreshToken.user));
  }
}

export default instance;