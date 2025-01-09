import { HashRouter, Routes, Route } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { ManagerRoute, ProtectedRoute, PublicRoute } from "./routes/Routes";

import { EmployeeLogin } from "../pages/employee/EmployeeLogin";
import { EmployeeDashboard } from "../pages/employee/EmployeeDashboard";
import { EmployeeActivity } from "../pages/employee/EmployeeActivity";
import { EmployeeProfile } from "../pages/employee/EmployeeProfile";
import { EmployeeSchedule } from "../pages/employee/EmployeeSchedule";

import { ManagerLogin } from "../pages/manager/ManagerLogin";
import { ManagerDashboard } from "../pages/manager/ManagerDashboard";

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

                    {/* ALL EMPLOYEE */}
                    <Route
                        path="/employee/dashboard"
                        element={
                            <ProtectedRoute>
                                <EmployeeDashboard />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employee/activity"
                        element={
                            <ProtectedRoute>
                                <EmployeeActivity />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employee/profile"
                        element={
                            <ProtectedRoute>
                                <EmployeeProfile />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/employee/schedule"
                        element={
                            <ProtectedRoute>
                                <EmployeeSchedule />
                            </ProtectedRoute>
                        }
                    />



                    {/* ALL MANAGER */}
                    <Route
                        path="/managerlogin"
                        element={
                            <PublicRoute>
                                <ManagerLogin />
                            </PublicRoute>
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
