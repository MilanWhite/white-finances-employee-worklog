import axios from "axios";
import { getCsrfToken } from "./csrfTokenManager";


const apiClient = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
});

// Add a request interceptor to include CSRF token
apiClient.interceptors.request.use(async (config) => {
    const csrfToken = await getCsrfToken(); // Ensure token is fetched
    if (csrfToken) {
        config.headers["X-CSRFToken"] = csrfToken;
    }
    return config;
});

export default apiClient;
