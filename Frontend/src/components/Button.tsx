import React from "react";
import "../styles/_Button.scss";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button"| "submit"| "reset";
    disabled?: boolean;
};

export default function Button ({children, type = "button", onClick, disabled}: ButtonProps) {

    return (
        <button type={type} onClick={onClick} disabled={disabled} className="btn">{children}</button>
    );
}
