import NavbarButtons from "../components/NavbarButtons";
import "../styles/_MyBookings.scss";
import { api } from "../api/axios";
import { useEffect, useState } from "react";

type Booking = {
    _id: string;
    title: string;
    date: string;
    time: string;

}

export default function MyBooking() {

    const [booking, setBookings] = useState<Booking[]>([]);
    const [message, setMessage] = useState("");

    useEffect(()=> {
        async function fetchBookings() {
            try {
                const res = await api.get("/bookings/upcoming");
                setBookings(res.data);
            } catch (err: any) {
                setMessage(err.response?.data?.message || "We couldnt fetch your bookings")
            }
        }
        fetchBookings();
    }, []);


    async function handleCancelBooking(id: string) {
        if (!confirm("Are you sure you want to cancel this appointment")) return;

        try {
            await api.delete(`/bookings/${id}`);
            setBookings((prev) => prev.filter((b) => b._id !== id));
            setMessage("Your booking has been cancelled!")
        } catch (err: any) {
            setMessage(err.response?.data?.message || "We couldnt cancel your booking");
        }
    }

    return (
        <div className="home">
            <div className="bookings">
                <NavbarButtons />

                <h2 className="booking_selection-title">My bookings</h2>

                {message && <p className="booking-message">{message}</p>}

                {booking.length === 0 ? (
                    <div className="booking-empty"> You have no upcoming bookings!</div>
                ) : (
                <div className="booking-list">
                    {booking.map((b)=> (
                        <div key= {b._id} className="booking-card">
                            <div className="booking-row">
                                <span className="booking-date">
                                    {new Date(b.date).toLocaleDateString()} kl {b.time}
                                </span>
                                <span className="booking-service">{b.title}</span>
                            </div>
                            <button className="booking-cancel" onClick={() => handleCancelBooking(b._id)}>CANCEL APPOINTMENT</button>
                        </div>
                        ))}
                    </div>
                )}
            </div>  
        </div>
    );
}