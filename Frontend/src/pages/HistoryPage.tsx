import {useEffect, useMemo, useState} from "react";
import "../styles/_HistoryPage.scss"
import NavbarButtons from "../components/NavbarButtons";
import { api } from "../api/axios";

type HistoryItem = {
    _id:string;
    title: string;
    date: string;
    time: string;
    price: string;
};

export default function HistoryPage() {
    const [query, setQuery] = useState("");
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHistory() {
            try {
                const token = localStorage.getItem("token");
                
                const res = await api.get("/bookings/history", {
                    headers: { Authorization: `Bearer ${token}`},
                });
                setHistory(res.data);
            } catch (err: any) {
                setToastMessage(err.response?.data?.message || "Theres been an error fetching your booking history!");
            }  
        }
        fetchHistory();
    },[]);

    const filtered = useMemo (()=> {
        const q = query.toLowerCase();
        return history.filter((it) =>
            it.title.toLowerCase().includes(q) || it.date.toLowerCase().includes(q) || it.time.toLowerCase().includes(q)
        );
    }, [query, history]);

    return (
        <div className="home">
            <NavbarButtons/>
            <h2 className="history_selection-title">History</h2>
            
            <div className="history-search">
                <input type="text" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            
            {toastMessage && <div className="history-error">{toastMessage}</div>}

            {filtered.length === 0 ? (
                <div className="history-empty"> <p>You dont have no past history!</p></div>
            ) : (
            <ul className="history-list"> {filtered.map((it) => (
                <li key={it._id} className="history-item">
                    <span className="history_item-service">{it.title}</span>
                    <span className="history_item-date">{new Date(it.date).toLocaleDateString()} - {it.time}</span>
                </li>
                ))}
            </ul>
            )}
        </div>
    );
}