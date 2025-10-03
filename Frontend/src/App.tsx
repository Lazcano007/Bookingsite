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


export default function App() {
  return (
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/bookings" element={<MyBookingsPage/>} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
    </BrowserRouter>
  );
}
