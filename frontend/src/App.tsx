import { HashRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ManagerRoute, ProtectedRoute, PublicRoute } from "./routes/Routes";

import { EmployeeLogin } from "../pages/EmployeeLogin";
import { ManagerLogin } from "../pages/ManagerLogin";

import { ManagerDashboard } from "../pages/ManagerDashboard";
import { EmployeeDashboard } from "../pages/EmployeeDashboard";

import CenteredSpinner from "../components/CenteredSpinner/CenteredSpinner"

interface Props {
    isLoggedIn: boolean;
    isManager: boolean;
}

const DefaultRoute = ({ isLoggedIn, isManager }: Props) => {
    const { isAuthInitializing } = useAuth();

    if (isAuthInitializing) {
        return <CenteredSpinner/>;
    }

    if (isLoggedIn) {
        return isManager ? <ManagerDashboard /> : <EmployeeDashboard />;
    }

    return <EmployeeLogin />;
};

function App() {

    const { isLoggedIn, isManager } = useAuth();

    return (
        <>
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
