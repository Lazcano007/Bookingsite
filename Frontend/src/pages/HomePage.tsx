import { useState, useCallback, useEffect } from "react";
import ServiceCard, { type Service } from "../components/ServiceCard";
import "../styles/_HomePage.scss";
import NavbarButtons from "../components/NavbarButtons";
import Calender from "../components/Calender";
import ConfirmButton from "../components/ConfirmButton";
import { useNavigate } from "react-router-dom";


export default function HomePage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

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

  const [expandedId, setExpandedId] = useState<string | null>(null); // Låter en services kort vara öppen åtgången 
  const [selectedDate, setSelectedDate] = useState<Date | null> (null)
  const [selectedTime, setSelectedTime] = useState<string | null> (null)
  const [confirmAction, setConfirmAction] = useState<(() => void) | null>(null);

  const handleConfirmSetup = useCallback(  // Sparar funktionen från calender-komponenten så att den inte skapas om vid varje rendering
    (cb: () => void) => setConfirmAction(() => cb),   // tar emot en funktion (callback/cb) från kalender och sparar den i state (confirmAction) så den kan köras senare när man klickar på confirm knappen
    []
  );

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
                    onConfirm={handleConfirmSetup}
                  />
                </div>
                {selectedDate && selectedTime && (
                  <ConfirmButton onClick={() => {
                    if (confirmAction) {
                      confirmAction(); 
                      setMessage("Your booking is confirmed!")
                    } else { 
                      setMessage ("No confirmation done!"); 
                    }}
                  } >CONFIRM</ConfirmButton>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}