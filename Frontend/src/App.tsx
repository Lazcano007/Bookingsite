// App.tsx (exempel)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/register";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen w-full">
        <header className="pt-6 text-center">
          <h1 className="brand-title text-3xl sm:text-4xl">Fresh Line Barbers</h1>
        </header>
        
        <main className="flex justify-center items-start sm:items-center py-10">
          <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
