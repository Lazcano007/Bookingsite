import NavbarButtons from "../components/NavbarButtons"
import "../styles/_AdminEditProfilePage.scss"
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api/axios";
import { useEffect, useState } from "react";

type Profile = {
    _id: string;
    name: string;
    role: string;
};

export default function _AdminEditPage() {

    const {id} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState<Profile | null>(null)
    const [name, setName] =  useState("");
    const [role, setRole] = useState("")
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const res = await api.get(`/admin/profiles/${id}`);
            setProfile(res.data);
            setName(res.data.name);
            setRole((prev) => prev || res.data.role || "user");
        } catch (err: any) {
            setToastMessage ( err.response?.data?.message || "Theres been a problem fetching this profile!");
        }
    };
    fetchProfile();
    }, [id]);

    const handleDelete = async () => {
        if(!confirm("Are you sure you want to delete this user?")) 
            return;
        try {
            await api.delete(`/admin/profiles/${id}`);
            navigate("/admin/profiles");
        } catch (err: any) {
            setToastMessage (err.response?.data?.message || "Theres been a problem deleting this profile!");
        }
    };

    const handleSave = async () => {
        try {
            await api.put(`/admin/profiles/${id}`, {name, role});
            navigate("/admin/profiles");
        } catch (err: any) {
            setToastMessage(err.response?.data?.message || "Theres been an error saving this profile!");
        }
    };

    return (
        <div className="home">
            <NavbarButtons />
            <h2 className="adminEditPage_selection-title">Profiles: {profile?.name}</h2>

            {toastMessage && <p className="toast">{toastMessage}</p>}

            <div className="adminEdit-card">
                <div className="adminEdit-inner">
                    <button className="delete-btn" onClick={handleDelete}>DELETE</button>
                    <label className="adminEdit-label">Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="adminEdit-input"/>
                    <label className="adminEdit-label">Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="adminEdit-select">
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="save-btn" onClick={handleSave}>SAVE</button>
                </div>
            </div>
        </div>
    );
}