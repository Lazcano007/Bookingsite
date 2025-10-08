import React from "react"
import NavbarButtons from "../components/NavbarButtons"
import "../styles/_AdminEditProfilePage.scss"
import { useParams, useNavigate } from "react-router-dom";


export default function _AdminEditPage() {

    const {id} = useParams();
    const navigate = useNavigate();

    const fakeData = [
        {id: "1", name: "Pedro"},
        {id: "2", name: "Julia"},
        {id: "3", name: "Gabriel"},
        {id: "4", name: "Clara"},
        ];
    
        const profile = fakeData.find((p) => p.id === id);
        if (!profile) {
            return <p style={{ textAlign: "center", color: "white" }}>Profile not found</p>;
        }


    return (
        <div className="home">
            <NavbarButtons />
            <h2 className="adminEditPage_selection-title">Profiles</h2>

            <div className="adminEdit-card">
                <div className="adminEdit-inner">
                    <button className="delete-btn" onClick={() => alert("Deleted (simulerat)")}>DELETE</button>
                    <label className="adminEdit-label">Name:</label>
                    <input type="text" defaultValue={profile.name} className="adminEdit-input"/>
                    <button className="save-btn" onClick={() => navigate("/admin/profiles")}>SAVE</button>
                </div>
            </div>
        </div>
    )
}