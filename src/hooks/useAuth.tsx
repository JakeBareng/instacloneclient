import { useContext, useState, createContext } from "react";

//TODO: create user interface
interface AuthContextType {

    // impliment user in the future, such as claims, roles, etc.
    // user: any;
    error: { message: string } | null;

    login: (
        email: string,
        password: string
    ) => void;

    logout: () => void;

    register: (
        email: string,
        username: string,
        password: string
    ) => void;
}

const AuthContext = createContext<AuthContextType | null>( null);

import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const API_URL = "http://localhost:5147";
    const [error, setError] = useState(null);

    // Login function
    const login = async (email: string , password: string ) => {
        // Call the login API
        const res: Response = await fetch(`${API_URL}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
    
        let data = await res.json();
    
        if (!res.ok) {
            setError(data.errors);
            return;
        }
    }

    // Logout function
    const logout = async () => {
        // Call the logout API
        const res = await fetch(`${API_URL}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }); 

        let data = await res.json();

        if (!res.ok)
            setError(data.errors);
    }

    // Register function
    const register = async (email: string, username: string, password: string ) => {
        // Call the register API
        const res = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, username, password })
        });

        let data = await res.json();

        if (!res.ok)
            setError(data.errors);
    }

    return (
        <AuthContext.Provider value={{ login, logout, register, error }}>
            {children}
        </AuthContext.Provider>
    )
}



const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;