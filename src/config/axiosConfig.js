import axios from "axios";
import { getToken, setToekn } from "../context/contextToken";



const instance = axios.create({
  baseURL: 'https://localhost:7118'
});

// Alter defaults after instance has been created
let isFresh = true;
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // Do something before request is sent

  config.headers.Authorization = `Bearer ${getToken()}`;
  // console.log(getToken())

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
  return Promise.resolve({ ec: 1, em: error.response.data?.em ?? error?.code, status: error?.response?.status });
});

const handleRefreshToken = async (error) => {

  if (isFresh) {
    try {
      //send refresh reques
      const resfreshToken = await instance.post(`/api/Auth/refresh-token`, {},
        {
          //sendc ookies
          withCredentials: true
        });
      //if infor is incorrect
      if (resfreshToken?.ec === 2) {
        localStorage.removeItem("user");
        return {
          ec: 2,
          em: "You need to log in again"
        }
      } else {
        setToekn(resfreshToken.em);
        localStorage.setItem("user", JSON.stringify(resfreshToken.user));
      }
      //send request before
      try {
        console.log("test", error);
        let response;
        if (error.config.method !== 'get' && error.config.method !== 'delete') {
          const contentType = error.config.headers['Content-Type'];
          //config data 
          let requestData;
          if (contentType && contentType.includes('multipart/form-data')) {
            requestData = error.config.data;
          } else {
            requestData = JSON.parse(error.config.data);
          }
          //send request
          response = await instance[error.config.method]('https://localhost:7118' + error.config.url,
            requestData,
            {
              // headers: { ...error.config.headers, Authorization: `Bearer ${getToken()}` }
            }
          );

        } else {
          response = await instance[error.config.method]('https://localhost:7118' + error.config.url,
            {
              // headers: { ...error.config.headers, Authorization: `Bearer ${getToken()}` },
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