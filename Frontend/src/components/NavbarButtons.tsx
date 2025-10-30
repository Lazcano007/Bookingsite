import "../styles/_NavbarButtons.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFetchUser } from "../hooks/useFetchUser";


export default function NavbarButtons() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, loading } = useFetchUser();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    
}

    let navItems = [
        { label: "BOOK", to: "/" },
        { label: "MY BOOKINGS", to: "/bookings" },
        { label: "HISTORY", to: "/history" },
        { label: "PROFILE", to: "/profile" },
    ];

    if(user?.role === "admin") {
        navItems = [
            {label: "MY BOOKINGS", to: "/admin/bookings"},
            {label: "HISTORY", to: "/admin/history"},
            {label: "PROFILES", to: "/admin/profiles"},
        ];
    }

        return (
            <div className="navbar-wrapper">
                <nav className="navbar">
                {navItems.map((item) => (
                    <Link key={item.to} to={item.to} className={`navbtn ${location.pathname === item.to ? "navbtn--active" : ""}`}> {item.label}</Link>
                ))}

                
                {!loading && user && (
                    <>
                    <button className="logout-btn" onClick={handleLogout}>LOG OUT</button>
                    <span className="navbar-user">Welcome {user.name}!</span>
                    </>
                )}
                </nav>
            </div>
        
    );
}


