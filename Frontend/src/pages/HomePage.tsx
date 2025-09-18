import React from "react";
import ServiceCard, {type Service} from "../components/ServiceCard";
import Header from "../components/Header";
import "../styles/_HomePage.scss";
import BookButton from "../components/BookButton";


export default function Service() {

  const services: Service[] = [
    {id: "1", title: "Kids’ haircut (6–12 years)", price: 400 },
    {id: "2", title: "Men’s haircut", price: 650 },
    {id: "3", title: "Beard trim / Wet shave)", price: 400 },
    {id: "4", title: "Women’s haircut", price: 800 },
  ];

    const handleSelect = (service: Service) => {
      console.log("Selected service:", service);
    };


  return (
    <div className="home">

      <nav className="home_nav">
    
        <button className="pill_btn">BOOK</button>
        <button className="pill_btn">MY BOOKING</button>
        <button className="pill_btn">HISTORY</button>
        <button className="pill_btn">PROFILE</button>
      </nav>


      <h2 className="home_selection-title">BOOK</h2>

      <div className="service_grid">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  );
}