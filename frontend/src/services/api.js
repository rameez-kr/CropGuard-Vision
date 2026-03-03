/* API services - all backend communications 
uses Axios with interceptors for - automatic session id header, common error handling, timout handling */

import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const apiClient=axios.create({
    baseURL:API_BASE_URL,
    timeout:60000, //60s - API processing takes time
});

// Request interceptor : attach session Id
apiClient.interceptors.request.use((config)=>{
    const sessionId=localStorage.getItem("cropguard_session_id");
    if(sessionId){
        config.headers["X-Session-ID"]=sessionId;
    }
    return config;
});

// Response interceptor : format errors
apiClient.interceptors.response.use(
    (response)=>response,
    (error)=>{
        if(error.response?.status===429){
            error.userMessage="Too many requests. Please wait a moment.";
        } else if (error.response?.status===503){
            error.userMessage="Service temporarily unavailable. Try again.";
        } else if (!error.response){
            error.userMessage="Network error. Check your internet connection.";
        } else {
            error.userMessage =
            error.response?.data?.error?.message ||
            error.response?.data?.detail?.error?.message ||
            "Something went wrong. Please try again.";
        }
        return Promise.reject(error);
    }
);

// API's

const api={
    //health
    health:()=>apiClient.get("/api/health"),
    
    //Reference data
    getCrops:()=>apiClient.get("/api/crops"),
    getLanguages:()=>apiClient.get("/api/languages"),

    // Prediction (multipart upload)
    predict:(formData)=> apiClient.post("/api/predict",
        formData,
        {
            headers:{"Content-Type" : "multipart/form-data"},
        }
    ),

    // Voice query (multipart upload)
    voiceQuery:(formData)=> apiClient.post("/api/voice-query",
        formData,
        {
        headers : {"Content-Type":"multipart/form-data"}
        },
    ),

    // History
    getHistory:(sessionId)=>apiClient.get(`/api/history/${sessionId}`),

};

export default api;