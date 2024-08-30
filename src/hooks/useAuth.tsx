import { useContext, useState, createContext } from "react";
import { ReactNode } from "react";
import useTokens from "./useTokens";



type AuthResponse = {
    success: boolean;
    message: string;
}

interface AuthContextType {

    // impliment user in the future, such as claims, roles, etc.
    // user: any;
    login: (
        email: string,
        password: string
    ) => Promise<AuthResponse>;

    logout: () => Promise<AuthResponse>;

    register: (
        email: string,
        username: string,
        password: string
    ) => Promise<AuthResponse>;
}

type LoginResponse = {
    accessToken: string,
    expiresIn: number,
    refreshToken: string,
    tokenType: string,
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const tokenService = useTokens();

    // Login function
    const login = async (email: string , password: string ) => {
        try {
            const res: Response = await fetch(`${API_URL}/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })

            if (!res.ok) {
                return {
                    success: false,
                    message: 'Could not log in, please check your credentials.'
                }
            }

            const data : LoginResponse = await res.json();
            const { accessToken, refreshToken } = data;
            tokenService.setTokens(accessToken, refreshToken);
            
            return {
                success: true,
                message: 'Logged in successfully'
            }

        } catch (error) {
            return {
                success: false,
                message: 'An error occurred while logging in'
            }
        }

    }

    // Logout function
    const logout = async () => {
        // Call the logout API
        try {
            const res = await fetch(`${API_URL}/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenService.accessToken}`
                },
                credentials: 'include'
            }); 

            if (!res.ok) {
                return {
                    success: false,
                    message: 'Could not log out',
                }
            }

            return {
                success: true,
                message: 'Logged out successfully'
            }
        } catch (error) {
            return {
                success: false,
                message: 'An error occurred while logging out'
            }
        }
    }

    // Register function
    const register = async (email: string, username: string, password: string) => {
        try {
            const payload = { email, username, password };
    
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();

                return {
                    success: false,
                    message: `Error ${errorData.status}: ${errorData.title}. ${Object.values(errorData.errors).join(' ')}`,
                }
            }

            return {
                success: true,
                message: 'Registration successful',
            };
        }
        catch (error) {

            return {
                success: false,
                message: 'An error occurred',
            }

        }
    }

    return (
        <AuthContext.Provider value={{ login, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export { AuthProvider, useAuth };