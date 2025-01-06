import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: Props) => {
    const { isLoggedIn, isManager, isAuthInitializing } = useAuth();

    if (isAuthInitializing) {
        return;
    }

    if (!isLoggedIn || isManager) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export const ManagerRoute = ({ children }: Props) => {
    const { isManager, isAuthInitializing } = useAuth();

    if (isAuthInitializing) {
        return;
    }

    if (!isManager) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export const PublicRoute = ({ children }: Props) => {
    const { isLoggedIn } = useAuth();

    if (isLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
