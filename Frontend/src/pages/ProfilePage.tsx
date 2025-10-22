import "../styles/_ProfilePage.scss";
import NavbarButtons from "../components/NavbarButtons";
import { api } from "../api/axios";
import { useEffect, useState } from "react";

type UserProfile = {
    name: string;
    email: string;
};

export default function Profile() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    useEffect(() => {
        async function fetchProfile() {
            try {
                const token = localStorage.getItem("token");

                const res = await api.get("/auth/profile", {
                    headers: { Authorization: `Bearer ${token}`}
                });

                setProfile(res.data);
            } catch (err: any) {
                setToastMessage(
                    err.response?.data?.message || "Theres been an error fetching your profile!" );
            }
        }
        fetchProfile();
        }, [])
    return (
        <div className="home">

            <NavbarButtons/>
            <h2 className="profile_selection-title">PROFILE</h2>

            {profile ? (
            <div className="profile-card">
                <div className="profile-info">
                    <div className="form-row">
                        <label htmlFor="name">Name:</label>
                        <input id="name" defaultValue={profile.name} readOnly/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <input id="email" defaultValue={profile.email} readOnly/>
                    </div>
                </div>
            </div>
            ) : (
                !toastMessage && <p className="loading"></p>
            )}
        </div>
    );
}