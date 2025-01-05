import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
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
                // Attempt initial validation
                const response = await apiClient.post("/auth/validate");
                if (response.data.isValid) {
                    setIsLoggedIn(true);
                    setIsManager(response.data.isManager);
                    return;
                }
            } catch (error) {
                console.log("Initial validation failed, attempting refresh...");
            }

            try {
                const refreshResponse = await apiClient.post("/auth/refresh");
                if (refreshResponse.status === 200) {
                    console.log(
                        "Token refreshed successfully. Revalidating..."
                    );
                    const validationResponse = await apiClient.post(
                        "/auth/validate"
                    );
                    if (validationResponse.data.isValid) {
                        setIsLoggedIn(true);
                        setIsManager(validationResponse.data.isManager);
                        return ;
                    }
                }
            } catch (refreshError) {
                console.log("Error during token refresh:", refreshError);
            }

            setIsLoggedIn(false);
        };

        initializeAuth().finally(() => {
            setIsAuthInitializing(false);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isManager,
                isAuthInitializing,
                setIsLoggedIn,
                setIsManager,
            }}
        >
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
