import axios from "axios";
import { getCsrfToken } from "./csrfTokenManager";


const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

apiClient.interceptors.request.use(async (config) => {
    const csrfToken = await getCsrfToken(); 
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

export default apiClient;
