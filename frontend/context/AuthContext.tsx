import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiClient from "../services/api-client";

interface AuthContextType {
    isLoggedIn: boolean;
    isManager: boolean;
    isAuthInitializing: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
    setIsManager: (manager: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isManager, setIsManager] = useState<boolean>(false);
    const [isAuthInitializing, setIsAuthInitializing] = useState<boolean>(true);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const response = await apiClient.post("/auth/validate");
                if (response.data.isValid) {
                    setIsLoggedIn(true);
                    if (response.data.isManager) {
                        setIsManager(true)
                    }
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.log("Error during auth initialization:", error);
                setIsLoggedIn(false);
            } finally {
                setIsAuthInitializing(false); // Initialization complete
            }
        };

        initializeAuth();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, isManager, isAuthInitializing, setIsLoggedIn, setIsManager}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};