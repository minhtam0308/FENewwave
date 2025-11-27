import axios from "axios";



const instance = axios.create({
  baseURL: 'https://localhost:7118'
});

// Alter defaults after instance has been created
let isFresh = true;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  // Do something before request is sent
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  return response?.data;
}, async function (error) {
  if (error?.response?.status === 401) {
    // console.log(error);
    const againAPI = await handleRefreshToken(error);
    return againAPI;
  }
  return Promise.resolve({ ec: 1, em: error?.code, status: error?.response?.status });
});

const handleRefreshToken = async (error) => {

  if (isFresh) {
    try {
      const resfreshToken = await instance.post(`/api/Auth/refresh-token`,
        { UserId: JSON.parse(localStorage.getItem("user")).id, RefreshToken: localStorage.getItem("refreshToken") });
      if (resfreshToken?.ec === 2) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        return {
          ec: 2,
          em: "You need to log in again"
        }
      } else {
        localStorage.setItem("accessToken", resfreshToken.accessToken);
        localStorage.setItem("refreshToken", resfreshToken.refreshToken);
        localStorage.setItem("user", JSON.stringify(resfreshToken.user));
      }
      //send request before
      try {
        console.log("test", error);
        let response;
        if (error.config.method !== 'get' && error.config.method !== 'delete') {
          const contentType = error.config.headers['Content-Type'];
          let requestData;
          if (contentType && contentType.includes('multipart/form-data')) {
            requestData = error.config.data;
          } else {
            requestData = JSON.parse(error.config.data);
          }
          response = await instance[error.config.method]('https://localhost:7118' + error.config.url,
            requestData,
            {
              headers: { ...error.config.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
            }
          );

        } else {
          response = await instance[error.config.method]('https://localhost:7118' + error.config.url,
            {
              headers: { ...error.config.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
              params: error.config.params
            }
          );
        }
        return response;
      } catch (error) {
        console.error('Lỗi:', error); // Xử lý lỗi nếu có
        isFresh = false;
        return {
          ec: 2,
          em: "You data error inner"
        }
      }
    } catch (e) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      isFresh = false;
      window.location.href = 'http://localhost:3000/';
      return {
        ec: 2,
        em: "You need to to login again"
      }
    }

  }

}

export default instance;