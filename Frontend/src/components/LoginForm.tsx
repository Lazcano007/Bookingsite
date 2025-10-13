import { useState } from "react";
import Button from "./Button";
import "../styles/_LoginForm.scss";
import OrSeparator from "./OrSeparator";
import { Link } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Login data:", { email, password });
    }

    return (
        <div className="login-form-container">
            <h2 className="login-title">LOGIN</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                <label>Email</label>
                <input value={email}onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
                <Link to="/">
                    <Button type="submit">Login</Button>
                </Link>
                <OrSeparator/>
                <Link to="/register">
                    <Button type="submit">Register</Button>
                </Link>
            </form>
        </div>    

        


    );

}