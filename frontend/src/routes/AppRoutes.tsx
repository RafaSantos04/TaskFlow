import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import LoginPage from "@pages/Login";
import PrivateRoute from "./PrivateRoutes";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
