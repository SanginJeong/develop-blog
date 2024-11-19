import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터: 토큰 추가
api.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Starting Request", request);
    return request;
  },
  (error) => {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 에러 처리 및 상태 코드에 따른 동작
api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "An error occurred";
    console.log(`RESPONSE ERROR: ${status} - ${message}`);
    
    if (status === 401) {
      sessionStorage.removeItem('token');
      window.location.href = "/login";
    }

    return Promise.reject(error.response?.data || error.message);
  }
);

export default api;
