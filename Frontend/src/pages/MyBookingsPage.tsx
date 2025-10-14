import NavbarButtons from "../components/NavbarButtons";
import "../styles/_MyBookings.scss";

type Booking = {
    id: string;
    service: string;
    dateLabel: string;
    timeLabel: string;
}

export default function MyBooking() {

    const booking: Booking[] = [
        { id: "b1", service: "Men's haircut", dateLabel: "Monday 20 sep", timeLabel: "13.00",},
    ];

    return (
        <div className="home">
            <div className="bookings">
                <NavbarButtons />

                <h2 className="booking_selection-title">My bookings</h2>

                <div className="booking-list">
                    {booking.map((b)=> (
                        <div key= {b.id} className="booking-card">
                            <div className="booking-row">
                                <span className="booking-date">
                                    {b.dateLabel} kl {b.timeLabel}
                                </span>
                                <span className="booking-service">{b.service}</span>
                            </div>
                            <button className="booking-cancel" onClick={() => { 
                                console.log("Cancel clicked:", b.id); 
                                alert("Your cancelled your appointment (Fake)")}}>CANCEL APPOINTMENT</button>
                        </div>
                    ))}
                    {booking.length === 0 && (
                        <div className="booking-empty"> You have no upcoming bookings.</div>
                    )}
                </div>
            </div>  
        </div>
    );
}