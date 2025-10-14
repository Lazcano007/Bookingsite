import "../styles/_NavbarButtons.scss";
import { Link, useNavigate } from "react-router-dom";

type NavItem = {
    label: string;
    to: string;
    onClick?: () => void;  
};

function NavButton({label, to, onClick}: NavItem) {

    const {pathname} = window.location;
    const isActive = pathname === to;

    return (
        <Link to={to} onClick={onClick} className={`navbtn ${isActive ? "navbtn--activate" :""}`}>{label}</Link>
    )
}

type NavbarButtonsProps = {
    items?: NavItem[];
};


export default function NavbarButtons({
    items = [
        { label: "BOOK", to: "/" },
        { label: "MY BOOKINGS", to: "/bookings" },
        { label: "HISTORY", to: "/history" },
        { label: "PROFILE", to: "/profile" },
    ],
    }: NavbarButtonsProps) {
        const navigate = useNavigate();
        const token = localStorage.getItem("token");
    
        const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("userName");
            navigate("/login")
            };

        const devMode = true;
        const shouldShowLogout = devMode || token;
        
        return (
            <div className="navbar-wrapper">
                <nav className="navbar">
                {items.map((item) => (
                    <NavButton key={item.to} {...item} />
                ))}
                {shouldShowLogout  && (
                    <button className="logout-btn" onClick={handleLogout}>LOG OUT</button>
                )}
                </nav>
            </div>
        
    );
}

    



