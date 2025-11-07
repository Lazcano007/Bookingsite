import { useState } from "react";
import Button from "./Button";
import "../styles/_LoginForm.scss";
import OrSeparator from "./OrSeparator";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { api } from "../api/axios";


export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
    
        try{
            const res = await api.post("/auth/login", {email, password});
            localStorage.setItem("token", res.data.token);    //sparar JWT-token i localstorage
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userId", res.data._id);
            setMessage("Welcome to Fresh Line Barber");
            
            if(res.data.role === "admin") {
                setTimeout(() => {
                    navigate("/admin/bookings");
                }, 300)
            } else {
            setTimeout(()=> {
                navigate("/");
            }, 300);
        }
        }catch (err: any) {
            setMessage(err.response?.data?.message || "You wrote wrong email or password!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-form-container">
            <h2 className="login-title">LOGIN</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                <label>Email</label>
                <input value={email}onChange={(e) => setEmail(e.target.value)} placeholder="email" required/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
            </div>

                <Button type="submit" disabled={loading}> {loading ? "Logging in..." : "Login"}</Button>
                {message && <p className="login-message">{message}</p>}
                <OrSeparator/>
                
                <Link to="/register">
                <Button type="button">Register</Button>
                </Link>
            </form>
        </div>    
    );
}