import "../styles/_ServiceCard.scss";
import BookButton from "./BookButton";


export type Service = {
    id:string;
    title: string;
    description?: string;
    price: number
};

type ServiceCard = {
    service: Service;
    onSelect?: (service: Service) => void;
}


export default function ServiceCard({service, onSelect }: ServiceCard) {
    const {title, price} = service;


    return (
        <div className ="service-card" role = "group" >
            <h3 className="service-card_title">{title}</h3>
            <p className="service-card_price">{price} kr</p>

            <BookButton onClick={() => onSelect?.(service)} />

        </div>
    )
}