import { HashRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import { ManagerRoute, ProtectedRoute, PublicRoute } from "./routes/Routes";

import { EmployeeLogin } from "../pages/EmployeeLogin";
import { ManagerLogin } from "../pages/ManagerLogin";

import { ManagerDashboard } from "../pages/ManagerDashboard";
import { EmployeeDashboard } from "../pages/EmployeeDashboard";

import apiClient from "../services/api-client";
import axios from "axios";

import { Helmet } from "react-helmet";
import { getCsrfToken } from "../services/csrfTokenManager";

interface Props {
    isLoggedIn: boolean;
    isManager: boolean;
}

const DefaultRoute = ({ isLoggedIn, isManager }: Props) => {
    const { isAuthInitializing } = useAuth();

    if (isAuthInitializing) {
        return;
    }

    if (isLoggedIn) {
        return isManager ? <ManagerDashboard /> : <EmployeeDashboard />;
    }

    return <EmployeeLogin />;
};

function App() {
    useEffect(() => {
        const prefetchToken = async () => {
            await getCsrfToken(); // Fetch and cache the token
        };

        prefetchToken();
    }, []);

    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        async function fetchCsrfToken() {
            try {
                const response = await apiClient.get<{ csrf_token: string }>(
                    "/api/csrf-token"
                );
                setCsrfToken(response.data.csrf_token);
            } catch (error) {
                console.error("Failed to fetch CSRF token:", error);
            }
        }

        fetchCsrfToken();
    }, []);

    const { isLoggedIn, isManager } = useAuth();

    return (
        <>
            <Helmet>
                {csrfToken && <meta name="csrf-token" content={csrfToken} />}
            </Helmet>
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
        </>
    );
}

export default App;
