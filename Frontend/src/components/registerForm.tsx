import { useState } from "react";
import Button from "./Button";
import "../styles/_RegisterForm.scss";
import OrSeparator from "./OrSeparator";
import {useNavigate, Link} from "react-router-dom";
import { api } from "../api/axios";

type RegisterFormProps = {
  isAdmin?: boolean;
};

export default function RegisterForm({ isAdmin = false}: RegisterFormProps)  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if(password !== confirmPassword) {
      setToastMessage("Your passwords do not match!");
      return;
    }

    try {
        if(isAdmin) {
          await api.post("/admin/profiles", {name, email, password});
          setToastMessage("This user has been successfully created!");
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setTimeout(() => navigate("/admin/profiles"), 1500);
          return;
        }

        const res = await api.post("/auth/register", {name, email, password});
        localStorage.setItem("token", res.data.token);
        setToastMessage("You can now log in!")
        setTimeout(() => navigate("/login"), 1500);

    }catch (err: any) {
      setToastMessage(err.response?.data?.message || "Theres been an error, with your registration!");
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
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="John@example.com" required/>
        </div>

        <Button type="submit">{isAdmin ? "ADD" : "Register"} </Button>

        {toastMessage && <p className="toast-message">{toastMessage}</p>}

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
