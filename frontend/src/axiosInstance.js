// axiosInstance.js
// i swear this is more trouble than it's worth for now.
// terminate till you have a better understanding of axios and jwt

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // Replace with your API base URL
});

// Set default headers
axiosInstance.defaults.headers.post['Content-Type'] = 'application/json';

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token'); // Or wherever you store the token
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem('refresh_token'); // Or wherever you store the refresh token
            try {
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken,
                });
                if (response.status === 200) {
                    localStorage.setItem('access_token', response.data.access);
                    axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
                    originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Handle token refresh failure (e.g., redirect to login)
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;