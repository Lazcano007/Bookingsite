import React from "react";
import NavbarButtons from "../components/NavbarButtons";
import "../styles/_AdminDashboardBookingPage.scss";


type HistoryItem = {
    id:string;
    dateLabel: string;
    service: string;
};




export default function AdminDashboardBookingPage() {

    
        const items: HistoryItem[] = [
            { id: "1", dateLabel: "Wednesday 20 aug kl 13:30", service: "Kids’ haircut (6–12 years)" },
            { id: "2", dateLabel: "Monday 13 sep kl 11:00", service: "Men’s haircut" },
            { id: "3", dateLabel: "Friday 2 dec kl 18:30", service: "Beard trim / Wet shave)"},
            { id: "4", dateLabel: "Wednesday 11 feb kl 10:00", service: "Women’s haircut"},
            
        ];
    

    return (
        <div className="home">
            <NavbarButtons />
            <h2 className="adminDashboardbooking_selection-title">Upcoming Appointments</h2>

            <ul className="history-list"> {items.map((it) => (
                <li key={it.id} className="admin_booking-item">
                    <span className="admin_booking-date">{it.dateLabel}</span>
                    <span className="admin_booking-service">{it.service}</span>
                </li>
                ))}
            </ul>

        </div>
    )
}