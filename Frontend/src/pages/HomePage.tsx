import React, { useState } from "react";
import ServiceCard, { type Service } from "../components/ServiceCard";
import Header from "../components/Header";
import "../styles/_HomePage.scss";
import BookButton from "../components/BookButton";
import NavbarButtons from "../components/NavbarButtons";
import Calender from "../components/Calender";
import ConfirmButton from "../components/ConfirmButton";


export default function Service() {
  const services: Service[] = [
    { id: "1", title: "Kids’ haircut (6–12 years)", price: 400 },
    { id: "2", title: "Men’s haircut", price: 650 },
    { id: "3", title: "Beard trim / Wet shave)", price: 400 },
    { id: "4", title: "Women’s haircut", price: 800 },
  ];

  const [expandedId, setExpandedId] = useState<string | null>(null); // Låter en services kort vara öppen åtgången 

  const [selectedDate, setSelectedDate] = useState<Date | null> (null)
  const [selectedTime, setSelectedTime] = useState<string | null> (null)


  return (
    <div className="home">
      <NavbarButtons />
      <h2 className="home_selection-title">BOOK</h2>

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
                  <ConfirmButton onClick={() => console.log("confirm click")}>CONFIRM</ConfirmButton>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}