import "../styles/_AdminAddProfilePage.scss";
import NavbarButtons from "../components/NavbarButtons";
import RegisterForm from "../components/RegisterForm";

export default function AdminAddProfilePage() {

    return (
        <div className="home">
            <NavbarButtons />
            <h2 className="adminAddProfilePage_selection-title">Upcoming Appointments</h2>

            <div className="adminAddProfile-container">
                <RegisterForm isAdmin/>
            </div>

        </div>
    )

}