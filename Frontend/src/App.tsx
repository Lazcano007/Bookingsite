import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.scss";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";



export default function App() {
  return (
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
    </BrowserRouter>
  );
}
