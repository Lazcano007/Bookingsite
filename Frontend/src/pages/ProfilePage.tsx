import "../styles/_ProfilePage.scss";
import NavbarButtons from "../components/NavbarButtons";

export default function Profile() {
    
    return (
        <div className="home">

            <NavbarButtons/>
            <h2 className="profile_selection-title">PROFILE</h2>

            <div className="profile-card">
                <div className="profile-info">
                    <div className="form-row">
                        <label htmlFor="name">Name:</label>
                        <input id="name" defaultValue={"Pedro"}/>
                    </div>

                    <div className="form-row">
                        <label htmlFor="email">Email:</label>
                        <input id="email" defaultValue={"Lazcano"} />
                    </div>
                </div>
            </div>
        </div>
    );
}