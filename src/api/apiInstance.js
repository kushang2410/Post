import axios from "axios";

const apiInstance = axios.create({
    baseURL: import.meta.env.VITE_FIREBASE_BASE_URL
});

export default apiInstance;