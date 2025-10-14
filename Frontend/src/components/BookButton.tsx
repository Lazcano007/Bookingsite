import "../styles/_BookButton.scss";

type BookButtonProps = {
    onClick?: () => void;
    type?: "button"| "submit"| "reset";
};

export default function BookButton({onClick, type = "button",}: BookButtonProps) {
    return (
        <button type={type} onClick={onClick} className="book-btn">BOOK</button>
    );
}