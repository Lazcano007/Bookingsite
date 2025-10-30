import { useEffect, useMemo, useState } from "react";
import { api } from "../api/axios";
import NavbarButtons from "../components/NavbarButtons";

type HistoryItem = {
    _id:string;
    title: string;
    date: string;
    time: string;
    userId?: {name: string};
};

export default function AdminHistoryPage() {
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null)

    useEffect(() => {
        const fetchHistory = async() => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/bookings/history", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setHistory(res.data);
            } catch (err: any) {
                setToastMessage(err.response?.data?.message || "Theres been an error fetching history!");
            }
        };
        fetchHistory();
    }, []);
    const filtered = useMemo(()=> {
    const q = search.toLocaleLowerCase();
    return history.filter((it) => it.title.toLowerCase().includes(q) || it.date.toLowerCase().includes(q) || it.time.toLowerCase().includes(q));
    }, [search, history]);

    return (
        <div className="home">
            <NavbarButtons/>
        
        <h2 className="history_selection-title">Admin Booking History</h2>
        <div className="history-search">
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        
        {toastMessage && <p className="toast">{toastMessage}</p>}

        {filtered.length === 0 ? (
                <div className="history-empty"> <p>There is no past history!</p></div>
            ) : (
            <ul className="history-list"> {filtered.map((it) => (
                <li key={it._id} className="history-item">
                    <span className="history_item-service"> <strong>{it.userId?.name}</strong> - {it.title}</span>
                    <span className="history_item-date">{new Date(it.date).toLocaleDateString()} - {it.time}</span>
                </li>
                ))}
            </ul>
            )}
        </div>
    );
}