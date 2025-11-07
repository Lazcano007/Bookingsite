import { useEffect, useState } from "react";
import NavbarButtons from "../components/NavbarButtons";
import "../styles/_AdminDashboardBookingPage.scss";
import { api } from "../api/axios";

type Booking = {
    _id:string;
    userId: {name: string; email: string};
    title: string;
    date: string;
    time: string;
    status: string;
};

export default function AdminDashboardBookingPage() {
    const [booking, setBookings] = useState<Booking[]>([]);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async() => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/admin/bookings", {
                    headers: { Authorization: `Bearer ${token}`}
                });

                const today = new Date();
                const upcoming = res.data.filter((b: Booking) => {
                    return new Date(b.date) >= today && b.status === "active"});
                upcoming.sort((a: Booking, b: Booking) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setBookings(upcoming);
            } catch (err: any) {
                setToastMessage(err.response?.data?.message || "Theres been a problem fetching all the bookings!");
            }
        };
        fetchBookings();
        }, []);

    return (
        <div className="home">
            <NavbarButtons />
            <h2 className="adminDashboardbooking_selection-title">Upcoming Appointments</h2>

            {toastMessage && <p className="toast">{toastMessage}</p>}
            <ul className="history-list"> 
                {booking.length > 0 ? (
                    booking.map((b) => (
                        <li key={b._id} className="admin_booking-item">
                            <span className="admin_booking-service"><strong>{b.userId?.name || "Unkown User" }</strong> - {b.title}</span>
                            <span className="admin_booking-date"> {new Date(b.date).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "short"})}{""} - kl {b.time}</span>
                        </li>
                    ))
                ):( <p className="no-users">No upcoming bookings found!</p>)}
            </ul>
        </div>
    );
}