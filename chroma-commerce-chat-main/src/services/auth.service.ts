import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface LoginCredentials {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
}

interface AuthResponse {
    message: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: string;
    };
}

export const authService = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/login`, credentials, {
            withCredentials: true,
        });
        return response.data;
    },

    async register(userData: RegisterData): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/register`, userData, {
            withCredentials: true,
        });
        return response.data;
    },

    async logout(): Promise<void> {
        await axios.post(`${API_URL}/auth/logout`, {}, {
            withCredentials: true,
        });
    },

    async getCurrentUser(): Promise<AuthResponse> {
        const response = await axios.get(`${API_URL}/auth/me`, {
            withCredentials: true,
        });
        return response.data;
    },
}; 