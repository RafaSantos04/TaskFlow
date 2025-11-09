import { Navigate } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

interface PrivateRouteProps {
    // children: JSX.Element;
    children: React.ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}
