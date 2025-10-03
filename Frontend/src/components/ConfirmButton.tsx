import React from "react";
import "../styles/_ConfirmButton.scss";

type ConfirmButtonProps = {
    onClick: () => void;
    children?: React.ReactNode;
};


export default function CorfirmButton({onClick, children}: ConfirmButtonProps) {
    return (
        <button className="confirm-button" onClick={onClick}>{children|| "CONFIRM"}</button>
    );
}