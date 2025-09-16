import { useState } from "react";
import Button from "./Button";
import "../styles/_LoginForm.scss";

export default function LoginForm() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log("Login data:", { name, password });
    }

    return (
        <div className="login-form-container">
            <h2 className="login-title">LOGIN</h2>

            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                <label>Name</label>
                <input value={name}onChange={(e) => setName(e.target.value)} placeholder="Name"/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
                <Button type="submit">Login</Button>
            </form>
        </div>    

        


    );

}