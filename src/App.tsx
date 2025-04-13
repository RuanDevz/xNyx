import React, { useEffect, useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import HeaderLogged from "./components/HeaderLogged";
import Footer from "./components/Footer";
import Loading from "./components/Loading/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import YourAccount from "./pages/Youraccount";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ForgotPassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import Plans from "./pages/Plans";
import VIPcontent from "./components/Vipcontent/VipContent";
import FreeContent from "./components/FreeContent/FreeContent";
import ContentDetails from "./pages/ContentDetails";
import AdminPainel from "./pages/AdminPainel";
import AdminVipUsers from "./pages/AdminVipUsers";
import RecommendContent from "./pages/RecommendContent";
import ViewStats from "./pages/Viewstats";
import ViewRequests from "./pages/ViewRequests";
import AccessDenied from "./pages/AccessDenied";
import AdminDisabledVipUsers from "./pages/AdminDisabledVipUsers";
import { linkvertise } from "./utils/linkvertise";

interface User {
  isAdmin: boolean;
  isVip: boolean;
  email: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

const App = () => {
  const [hasPermission, setHasPermission] = useState({ vip: false, admin: false });
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const checkPermissions = async () => {
      if (!token) {
        setHasPermission({ vip: false, admin: false });
        setIsLoading(false);
        return;
      }


      try {
        const response = await axios.get(`https://x-nyx-backend.vercel.app/auth/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { isVip, isAdmin } = response.data;
        setHasPermission({ vip: isVip, admin: isAdmin });
      } catch (error) {
        console.error("Error checking permissions:", error);
        setHasPermission({ vip: false, admin: false });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    checkPermissions();
  }, [token]);

  const PrivateVIPRoute = ({ children }: { children: React.ReactNode }) => {
    return hasPermission.vip ? (
      children
    ) : (
      <AccessDenied message="You need a VIP subscription to access this content." />
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {token ? <HeaderLogged /> : <Header />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FreeContent />} />
            <Route path="/content/free/:slug" element={<ContentDetails />} />
            <Route
              path="/content/vip/:slug"
              element={
                <PrivateVIPRoute>
                  <ContentDetails />
                </PrivateVIPRoute>
              }
            />

            <Route
              path="/vip"
              element={
                hasPermission.vip ? (
                  <VIPcontent />
                ) : (
                  <AccessDenied message="You are not a Premium to access this page." />
                )
              }
            />

            <Route
              path="/admin/settings"
              element={
                hasPermission.admin ? (
                  <AdminPainel />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              }
            />
            <Route
              path="/admin/stats"
              element={
                hasPermission.admin ? (
                  <ViewStats />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              }
            />
            <Route
              path="/admin/requests"
              element={
                hasPermission.admin ? (
                  <ViewRequests />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              }
            />
            <Route
              path="/admin-vip-users"
              element={
                hasPermission.admin ? (
                  <AdminVipUsers />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              }
            />
            <Route
              path="/admin-vip-disabled"
              element={
                hasPermission.admin ? (
                  <AdminDisabledVipUsers />
                ) : (
                  <AccessDenied message="You are not an administrator to access this page." />
                )
              }
            />

            <Route path="/pricing" element={<Plans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account" element={<YourAccount />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/recommend" element={<RecommendContent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;