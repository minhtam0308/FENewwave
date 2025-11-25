import axios from "axios";



const instance = axios.create({
  baseURL: 'https://localhost:7118'
});

// Alter defaults after instance has been created

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
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data

  return response?.data;
}, async function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  if (error?.response?.status === 401) {

    await handleRefreshToken(error.config.status, error.config.url);


  }
  // Do something with response error
  return Promise.reject(error?.response);
});

const handleRefreshToken = async (method, url) => {
  let isFresh = true;
  if (isFresh) {
    try {
      const resfreshToken = await instance.post(`/api/Auth/refresh-token`,
        { UserId: JSON.parse(localStorage.getItem("user")).id, RefreshToken: localStorage.getItem("refreshToken") });
      if (resfreshToken) {
        localStorage.setItem("accessToken", resfreshToken.accessToken);
        localStorage.setItem("refreshToken", resfreshToken.refreshToken);
        localStorage.setItem("user", JSON.stringify(resfreshToken.user));
      }
      // try {
      // const response = await fetch('https://localhost:7118/'+url, {
      //   method: method, // Phương thức HTTP (POST, GET, PUT...)
      //   headers: {
      //     'Content-Type': 'application/json', // Định dạng dữ liệu là JSON
      //     'Authorization': resfreshToken.accessToken, // Token nếu cần
      //   },
      //   body: JSON.stringify({ // Dữ liệu bạn muốn gửi trong body request
      //     name: 'John Doe',
      //     email: 'john.doe@example.com'
      //   })
      // });

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      //   const data = await response.json(); // Chuyển dữ liệu trả về thành JSON
      //   console.log('Dữ liệu trả về:', data); // Hiển thị dữ liệu trả về từ server
      // } catch (error) {
      //   console.error('Lỗi:', error); // Xử lý lỗi nếu có
      // }
    } catch (e) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      isFresh = false;
    }

  }

}

export default instance;