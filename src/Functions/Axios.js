import axios from 'axios';
import { toast } from 'react-toastify';
import { getData } from './LocalStorage';

const url = 'http://localhost:8000/api/';

// Create an instance with custom configurations
const instance = axios.create({
  baseURL: url, // Base URL for requests
  timeout: 60000, // Timeout for requests in milliseconds
  headers: {
    'Authorization': `Bearer ${getData("accessToken")}`, // Example authorization header
  },
});

const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${url}users/token/refresh/`,
      {
        refresh: getData("refreshToken"),
      }
    );
    const newAccessToken = response.data.access;
    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// Add a response interceptor to handle 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        try {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(error.config);
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            window.location.href = '/login';
          }
        } catch (refreshError) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("user");
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

const apiCall = (endpoint, body, method, loadingState, onSuccess) => {
  loadingState(true);
  instance[method](endpoint, body)
    .then(response => {
      let data = response.data;
      loadingState(false);
      return onSuccess(data);
    })
    .catch(error => {
      loadingState(false);
      if (error.response) {
        const { status, data } = error.response;
        switch (status) {
          case 400:
            toast.error(`Bad Request: ${data.detail || 'The request was invalid or cannot be otherwise served.'}`);
            break;
          case 401:
            toast.error(`Unauthorized: ${data.detail || 'Authentication is required and has failed or has not yet been provided.'}`);
            break;
          case 403:
            toast.error(`Forbidden: ${data.detail || 'You do not have permission to access the requested resource.'}`);
            break;
          case 404:
            toast.error(`Not Found: ${data.detail || 'The requested resource could not be found.'}`);
            break;
          case 500:
            toast.error(`Internal Server Error: ${data.detail || 'The server encountered an error and could not complete your request.'}`);
            break;
          default:
            toast.error(`Error: ${data.detail || 'An unexpected error occurred.'}`);
            break;
        }
      } else {
        toast.error(`Error: ${error.message || 'An unexpected error occurred.'}`);
      }
    });
};

export default apiCall;
