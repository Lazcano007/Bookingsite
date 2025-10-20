import { useState } from "react";
import Button from "./Button";
import "../styles/_RegisterForm.scss";
import OrSeparator from "./OrSeparator";
import {useNavigate, Link} from "react-router-dom";
import { api } from "../api/axios";


type RegisterFormProps = {
  isAdmin?: boolean;
};

export default function RegisterForm({ isAdmin}: RegisterFormProps)  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(password !== confirmPassword) {
      setMessage("Your passwords do not match!");
      return;
    }

    try {
        const res = await api.post("/auth/register", {name, email, password});
        
        console.log("Backend response:", res.data);
        localStorage.setItem("token", res.data.token);

        setMessage("You can now log in!")

        if (isAdmin) {
          navigate("/admin/profiles");
        } else {
          navigate("/login");
        }
    }catch (err: any) {
      setMessage(err.response?.data?.message || "Theres been an error, with your registration!");
    }
  
  }

  return (
    <div className="register-form-container">
      <h2 className="register-title">{isAdmin ? "ADD PROFILE" : "REGISTER"} </h2>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Name</label>
          <input value={name}onChange={(e) => setName(e.target.value)} placeholder="Name" required/>
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required/>
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" required/>
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" required/>
        </div>

        <Button type="submit">{isAdmin ? "ADD" : "Register"} </Button>

        {message && <p className="register-message">{message}</p>}

        {!isAdmin && (
          <> 
            <OrSeparator/>
            <Link to="/Login">
            <Button type="button">Login</Button>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
