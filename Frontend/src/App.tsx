import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.scss";
import RegisterPage from "./pages/RegisterPage";
import Header from "./components/Header";


export default function App() {
  return (
    <BrowserRouter>
      <Header />
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
    </BrowserRouter>
  );
}
