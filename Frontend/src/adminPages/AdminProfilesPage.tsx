import React from "react";
import NavbarButtons from "../components/NavbarButtons";
import "../styles/_AdminProfilesPage.scss"
import { useNavigate } from "react-router-dom";

type Profile = {
    id: string;
    name: string;
}

export default function AdminProfilesPage() {
    const profiles: Profile[] = [
        { id: "1", name: "Pedro" },
        { id: "2", name: "Julia" },
        { id: "3", name: "Gabriel" },
        { id: "4", name: "Clara" },
    ]
    const navigate = useNavigate();
    
    return (

        <div className="home">
            <NavbarButtons />

            <h2 className="adminProfile_selection-title">Admin Profile</h2>

            <div className="adminProfile-card">
                    <ul className="adminProfile-list"> 
                <div className="adminEdit-inner">
                        {profiles.map((p) => (
                        <li key= {p.id} className="adminProfile-item">
                            <span className="adminProfile-name">{p.name}</span>
                            <button className="adminProfile-edit" onClick={() => navigate(`/admin/profile/${p.id}`)}>EDIT</button>
                        </li>
                    ))}
                </div>
                    </ul>
                    
                    <button className="adminProfile-add" onClick={()=> navigate("/admin/add-profile")}>ADD</button>
            </div>
        </div>
    );
}