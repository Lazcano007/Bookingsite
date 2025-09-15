import { useState } from "react";

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
    <div className="w-[360px] mx-auto bg-white text-black rounded-2xl border shadow-[0_6px_18px_rgba(0,0,0,0.25)] p-6">
      <h2 className="text-center text-xl font-semibold tracking-wide mb-4">REGISTER</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
            <div>
                <label className="block text-xs mb-1">Name</label>
                <input className="w-full border-2 border-black/80 rounded-xl p-2 focus:outline-none" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"/>
            </div>

            <div>
                <label className="block text-xs mb-1">Password</label>
                <input type="password" className="w-full border-2 border-black/80 rounded-xl p-2 focus:outline-none" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>

            <div>
                <label className="block text-xs mb-1">Confirm Password</label>
                <input type="password" className="w-full border-2 border-black/80 rounded-xl p-2 focus:outline-none" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password"/>
            </div>

            <div>
                <label className="block text-xs mb-1">Email address</label>
                <input type="email" className="w-full border-2 border-black/80 rounded-xl p-2 focus:outline-none" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com"/>
            </div>

            <button type="submit" className="w-full mt-2 rounded-full bg-black text-white py-2 text-base hover:opacity-90 transition">Sign up</button>
        
        </form>
    </div>
  );
}
