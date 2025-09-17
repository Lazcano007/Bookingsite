import { useState } from "react";
import Button from "./Button";
import "../styles/_RegisterForm.scss";
import OrSeparator from "./OrSeparator";
import {Link} from "react-router-dom";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Register data:", { name, email, password, confirmPassword });
  }

  return (
    <div className="register-form-container">
      <h2 className="register-title">REGISTER</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Name</label>
          <input value={name}onChange={(e) => setName(e.target.value)} placeholder="Name"/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password"/>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"/>
        </div>

        <Button type="submit">Register</Button>
        
        <OrSeparator/>
        
        <Link to="/">
        <Button type="submit">Login</Button>
        </Link>

      </form>
    </div>
  );
}
