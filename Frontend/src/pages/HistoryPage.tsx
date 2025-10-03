import React, {useMemo, useState} from "react";
import "../styles/_HistoryPage.scss"
import NavbarButtons from "../components/NavbarButtons";


type HistoryItem = {
    id:string;
    dateLabel: string;
    service: string;
};




export default function HistoryPage() {

    const [query, setQuery] = useState("");

    const items: HistoryItem[] = [
        { id: "1", dateLabel: "Wednesday 20 aug kl 13:30", service: "Kids’ haircut (6–12 years)" },
        { id: "2", dateLabel: "Monday 13 sep kl 11:00", service: "Men’s haircut" },
        { id: "3", dateLabel: "Friday 2 dec kl 18:30", service: "Beard trim / Wet shave)"},
        { id: "4", dateLabel: "Wednesday 11 feb kl 10:00", service: "Women’s haircut"}
    ];

    const filtered = useMemo (()=> {
        const q = query.toLowerCase();
        return items.filter(it =>
            it.dateLabel.toLowerCase().includes(q) || it.service.toLowerCase().includes(q)
        );
    }, [query, items]);

    return (
    
        <div className="home">
            <NavbarButtons/>
            <h2 className="history_selection-title">History</h2>

            <div className="history-search">
                <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>

            <ul className="history-list"> {filtered.map((it) => (
                <li key={it.id} className="history-item">
                    <span className="history_item-date">{it.dateLabel}</span>
                    <span className="history_item-service">{it.service}</span>
                </li>
                ))}
            </ul>
        </div>
    );
}