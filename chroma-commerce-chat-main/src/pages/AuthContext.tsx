import { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    user: any | null;
    setUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchSession = async () => {
        const res = await fetch('http://localhost:3000/api/auth/session', {
            credentials: 'include',
        });
        const data = await res.json();
        setUser(data.user);
    };

    useEffect(() => {
        fetchSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
