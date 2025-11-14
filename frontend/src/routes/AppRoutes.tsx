import { Routes, Route } from "react-router-dom";
import Home from "@pages/Home";
import LoginPage from "@pages/Login";
import PrivateRoute from "./PrivateRoutes";
import PrivateNavbar from "./PrivateNavbar";
import Profile from "@pages/users/Profile";
import Task from "@pages/task/Task";

export default function AppRoutes() {
    return (
        <Routes>
            {/* Rota pública */}
            <Route path="/" element={<LoginPage />} />

            {/* Rotas protegidas com layout fixo */}
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <PrivateNavbar />
                    </PrivateRoute>
                }
            >
                <Route path="home" element={<Home />} />
                <Route path="profile" element={<Profile />} />
                <Route path="tasks" element={<Task />} />
            </Route>
        </Routes>
    );
}
