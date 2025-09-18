import React from "react";
import "../styles/_NavbarButtons.scss";
import { Link } from "react-router-dom";

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
        return (
       
       <nav className="navbar">
        {items.map((item) => (
            <NavButton key={item.to} {...item} />
        ))}
        </nav>
    );
}

    



