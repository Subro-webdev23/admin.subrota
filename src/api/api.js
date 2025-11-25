import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Authentication
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// LOGIN API
export async function loginAdmin(email, password) {
    try {
        const res = await axios.post(`${API_BASE_URL}/login`, {
            email,
            password
        });

        // Save token
        localStorage.setItem("token", res.data.token);
        return res.data;

    } catch (err) {
        console.error("Login error:", err?.response?.data || err);
        throw err;
    }
}


// Projects
export async function createProject(data) {
    try {
        const res = await axios.post(`${API_BASE_URL}/projects`, data);
        return res.data;
    } catch (err) {
        console.error("Error creating project:", err?.response?.data || err);
        throw err;
    }
}


export async function deleteProject(id) {
    try {
        const res = await axios.delete(`${API_BASE_URL}/projects/${id}`);
        return res.data;
    } catch (err) {
        console.error("Error deleting project:", err?.response?.data || err);
        throw err;
    }
}

export async function fetchProjects() {
    try {
        const res = await axios.get(`${API_BASE_URL}/projects`);
        return res.data;
    } catch (err) {
        console.error("Error fetching projects:", err?.response?.data || err);
        throw err;
    }
}

export async function updateProject(id, data) {
    try {
        const res = await axios.put(`${API_BASE_URL}/projects/${id}`, data);
        return res.data;
    } catch (err) {
        console.error("Error updating project:", err?.response?.data || err);
        throw err;
    }
}

export async function fetchProjectById(id) {
    try {
        const res = await axios.get(`${API_BASE_URL}/projects/${id}`);
        return res.data;
    } catch (err) {
        console.error("Error fetching project by ID:", err?.response?.data || err);
        throw err;
    }
}