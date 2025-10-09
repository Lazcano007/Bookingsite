import { useState } from "react";
import Button from "./Button";
import "../styles/_RegisterForm.scss";
import OrSeparator from "./OrSeparator";
import {useNavigate, Link} from "react-router-dom";


type RegisterFormProps = {
  isAdmin?: boolean;
};

export default function RegisterForm({ isAdmin}: RegisterFormProps)  {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Register data:", { name, email, password, confirmPassword });
    
    alert(isAdmin ? "Profile Added (simulerat)" : "You can login now!" );
  

    if (isAdmin) {
      navigate("/admin/profiles");
    } else {
      navigate("/login");
      console.log("User is Registered!");
    }
  
  }

  return (
    <div className="register-form-container">
      <h2 className="register-title">{isAdmin ? "ADD PROFILE" : "REGISTER"} </h2>

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

        <Button type="submit">{isAdmin ? "ADD" : "Register"} </Button>
        {!isAdmin && (
          <> 
            <OrSeparator/>
            <Link to="/Login">
            <Button type="submit">Login</Button>
            </Link>
          </>
        )}
      </form>
    </div>
  );
}
