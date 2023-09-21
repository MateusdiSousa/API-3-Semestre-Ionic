import { Dashboard } from "@/pages/dashboard/dashboard";
import { Routes, Route } from "react-router-dom";
import LoginRoutes from "./LoginRoutes";
import { Login } from "@/pages/login/login";
import { Register } from "@/pages/register/register";
import PrivateRoutes from "./PrivateRoutes";
import { Home } from "@/pages/home/home";

export function Router() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/admin-register" element={<Register />} />
      </Route>
      <Route element={<LoginRoutes />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
