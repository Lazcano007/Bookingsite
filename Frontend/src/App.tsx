import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.scss";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MyBookingsPage from "./pages/MyBookingsPage";
import HistoryPage from "./pages/HistoryPage";
import Profile from "./pages/ProfilePage";
import AdminDashboardBookingPage from "./adminPages/AdminDashboardBookingPage";
import AdminProfilesPage from "./adminPages/AdminProfilesPage";
import AdminEditProfilePage from "./adminPages/AdminEditProfilePage";
import AdminAddProfilePage from "./adminPages/AdminAddProfilePage";


export default function App() {
  const token = localStorage.getItem("token");
  
  return (
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/" element={ token ? <HomePage /> : <LoginPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/bookings" element={<MyBookingsPage/>} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<Profile/>} />

            {/* Admin routes */}
            <Route path="/admin/bookings" element={<AdminDashboardBookingPage />} />
            <Route path="/admin/profiles" element={<AdminProfilesPage />} />
            <Route path="/admin/profile/:id" element={<AdminEditProfilePage />} />
            <Route path="/admin/add-profile" element={<AdminAddProfilePage />}  />
            
          </Routes>
    </BrowserRouter>
  );
}
