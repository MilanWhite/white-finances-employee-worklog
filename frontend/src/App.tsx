import { HashRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect } from "react";
import { ManagerRoute, ProtectedRoute, PublicRoute } from "./routes/Routes";

import { EmployeeLogin } from "../pages/EmployeeLogin";
import { ManagerLogin } from "../pages/ManagerLogin";

import { ManagerDashboard } from "../pages/ManagerDashboard";
import { EmployeeDashboard } from "../pages/EmployeeDashboard";

import apiClient from "../services/api-client";

interface Props {
    isLoggedIn: boolean;
    isManager: boolean;
}

const DefaultRoute = ({ isLoggedIn, isManager }: Props) => {
    if (isLoggedIn) {
        return isManager ? <ManagerDashboard /> : <EmployeeDashboard />;
    }
    return <EmployeeLogin />;
};

function App() {
    const TOKEN_EXPIRED = "TOKEN_EXPIRED";

    const { isLoggedIn, setIsLoggedIn, isManager, setIsManager } = useAuth();

    const refresh = useCallback(async () => {
        try {
            await apiClient.post("/auth/refresh");
            console.log("Access token refreshed");
        } catch (error) {
            console.log("Token refresh failed, logging out");
            setIsLoggedIn(false);
        }
    }, [setIsLoggedIn]);

    useEffect(() => {
        let isRefreshing = false;

        const validateAndRefreshSession = async () => {
            try {
                const response = await apiClient.post("/auth/validate");
                if (response.data.isValid) {
                    console.log("User is logged in");
                    setIsLoggedIn(true);
                    if (response.data.isManager) {
                        console.log("Manager: true");
                        setIsManager(true);
                    }
                } else {
                    console.log("User session invalid, redirecting to login");
                    setIsLoggedIn(false);
                }
            } catch (error: any) {
                if (error?.response?.data?.error_message === TOKEN_EXPIRED) {
                    console.log("Token expired, refreshing...");
                    await refresh();
                } else {
                    console.log("Validation failed:", error);
                    setIsLoggedIn(false);
                }
            }
        };

        validateAndRefreshSession();

        const interval = setInterval(() => {
            if (!isRefreshing) {
                refresh();
            }
        }, 10 * 60 * 1000); // 10 mins

        return () => clearInterval(interval);
    }, [refresh, setIsLoggedIn]);
    return (
        <HashRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <DefaultRoute
                            isLoggedIn={isLoggedIn}
                            isManager={isManager}
                        />
                    }
                />

                <Route
                    path="/managerlogin"
                    element={
                        <PublicRoute>
                            <ManagerLogin />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/employee/dashboard"
                    element={
                        <ProtectedRoute>
                            <EmployeeDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/manager/dashboard"
                    element={
                        <ManagerRoute>
                            <ManagerDashboard />
                        </ManagerRoute>
                    }
                />
            </Routes>
        </HashRouter>
    );
}

export default App;
