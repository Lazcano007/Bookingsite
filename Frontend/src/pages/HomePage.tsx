import { useState, useEffect } from "react";
import ServiceCard, { type Service } from "../components/ServiceCard";
import "../styles/_HomePage.scss";
import NavbarButtons from "../components/NavbarButtons";
import Calender from "../components/Calender";
import ConfirmButton from "../components/ConfirmButton";
import { useNavigate } from "react-router-dom";
import { api } from "../api/axios";


export default function HomePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null); // Låter en services kort vara öppen åtgången 
  const [selectedDate, setSelectedDate] = useState<Date | null> (null)
  const [selectedTime, setSelectedTime] = useState<string | null> (null)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token) {
      navigate("/login")
    }
  }, [navigate]);

  const services: Service[] = [
    { id: "1", title: "Kids’ haircut (6–12 years)", price: 400 },
    { id: "2", title: "Men’s haircut", price: 650 },
    { id: "3", title: "Beard trim / Wet shave)", price: 400 },
    { id: "4", title: "Women’s haircut", price: 800 },
  ];

  async function handleConfirmBooking() { 
      try {
        const token = localStorage.getItem("token");
        const selectedService = services.find((s) => s.id === expandedId)!;   
        
        const res = await api.post(
          "/bookings",
          {
            title: selectedService.title,
            price: selectedService.price,
            date: selectedDate!.toISOString(),
            time: selectedTime!,
          }, {
            headers: { Authorization: `Bearer ${token}`}
          },
        );
        
        setMessage(`Your booking is confirmed at ${selectedTime}`)
        console.log("booking cerated", res.data);

        setSelectedDate(null);
        setSelectedTime(null);
        setExpandedId(null);
        
      } catch (err: any) {
            setMessage(err.response?.data?.message || "Theres been an eroor creating your booking");
        }

  }



  return (
    <div className="home">
      <NavbarButtons />
      <h2 className="home_selection-title">BOOK</h2>

      {message && <p className="home-message">{message}</p>}

      <div className="service-grid">
        {services.map((svc) => (
          <div key={svc.id} className="service-with-drawer">
            <ServiceCard
              service={svc}
              onSelect={() => {
                const willOpen = expandedId !== svc.id;
                setExpandedId(willOpen ? svc.id : null);

                //Nollställer om nytt service kort öppnas
                if(willOpen) {
                  setSelectedDate(null);
                  setSelectedTime(null);
                } 
              }}
            />

            {expandedId === svc.id && (
              <div className="drawer">
                <div className="calender-wrap">
                  <Calender
                    onSelect={(date, time) => {
                      setSelectedDate(date);
                      if (time) setSelectedTime(time);  //visar knappen efter tiden e vald
                    }}
                  />
                </div>
                {selectedDate && selectedTime && (
                  <ConfirmButton onClick={handleConfirmBooking}>CONFIRM</ConfirmButton>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}