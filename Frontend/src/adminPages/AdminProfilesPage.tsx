import { useState, useEffect } from "react";
import NavbarButtons from "../components/NavbarButtons";
import "../styles/_AdminProfilesPage.scss"
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";

type Profile = {
    _id: string;
    name: string;
};

export default function AdminProfilesPage() {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfiles = async () => {
            try{
                const res = await api.get("/admin/profiles");
                setProfiles(res.data);
            }catch(err: any) {
                setToastMessage(err.response?.data?.message || "Theres been a problem fetching the profiles");
            }
        };
        fetchProfiles();
    }, []);

    
    return (

        <div className="home">
            <NavbarButtons />

            <h2 className="adminProfile_selection-title">Admin Profile</h2>

            {toastMessage && <p className="toast">{toastMessage}</p>}

            <div className="adminProfile-card">
                <ul className="adminProfile-list"> 
                    <div className="adminEdit-inner">
                        {profiles.length > 0 ? (
                            profiles.map((p) => (
                            <li key= {p._id} className="adminProfile-item">
                                <span className="adminProfile-name">{p.name}</span>
                                <button className="adminProfile-edit" onClick={() => navigate(`/admin/profile/${p._id}`)}>EDIT</button>
                            </li>
                        ))
                        ) : (
                        <p className="no-users"> There are no users to fetch!</p>
                        )}
                    </div>
                </ul>
                <button className="adminProfile-add" onClick={()=> navigate("/admin/add-profile")}>ADD</button>
            </div>
        </div>
    );
}