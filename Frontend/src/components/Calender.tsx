import { useState, useEffect } from "react";
import "../styles/_Calender.scss"



export default function Calender({
    onSelect, onConfirm }: {
    onSelect?: (date: Date, time?: string) => void;
    onConfirm?: (callback: () => void) => void;
    }) {
    const [view, setView] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    function handleConfirm() {
        if(!selectedDate || !selectedTime) {
            return;
        }
        alert(`Appointment booked for ${selectedDate?.toLocaleDateString()} at ${selectedTime}`);
        setSelectedDate(null);
        setSelectedTime(null);

    }    
    useEffect(() => {
        if (onConfirm ) {
            onConfirm(() => handleConfirm());
        }
    },[onConfirm, selectedDate, selectedTime]);
    

        // calender 
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1); 
    const startDay = (first.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;


    function stripTime(d: Date) {
        const x = new Date(d);
        x.setHours(0,0,0,0);
        return x;
    }

    function sameDate(a: Date, b: Date) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    const cells = [];
    for (let i = 0; i <totalCells; i++) {
        const day = i - startDay +1;
        const d = new Date(year, month, day);

        const inMonth = d.getMonth() === month;
        const past = stripTime(d) < stripTime(new Date());
        const today = sameDate(d, new Date());
        const isSelected = selectedDate && sameDate(d, selectedDate);

        const classes = [
            "cal-cell",
            inMonth ? "" : "muted",
            (inMonth && past) ? "muted": "",
            today ? "today" : "",
            isSelected ? "selected" : ""
        ]
        .filter(Boolean)
        .join(" ");

        const clickable = inMonth && !past;

        cells.push (
            <div key={i} className={classes} onClick={() => {
                if (!clickable) 
                    return;
                setSelectedDate(d);
                setSelectedTime(null);
            }}>{d.getDate()}
            </div>
        );
    }

    const timeSlots = [
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
    ];


    return (
        <div className="cal">
            <div className="cal-header">
                <button onClick={() => setView(new Date(year, month - 1, 1))}>‹</button>
                <div className="cal-title"> 
                    {first.toLocaleString("en", {month: "long"})} {year}
                </div>
                <button onClick={() => setView(new Date(year, month + 1, 1))}>›</button>
            </div>

            <div className="cal-grid">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                    <div key={d} className="cal-week"> 
                        {d}
                    </div>
                ))}
                {cells}
            </div>


            {selectedDate && (
                <div className="time-slots">
                    <h4>Choose a time{" "} {selectedDate.toLocaleDateString("en", { weekday: "long", month: "short", day: "numeric",})}</h4>

                    <div className="time-grid">
                        {timeSlots.map((time) => ( 
                            <button key={time} className={time === selectedTime ? "time selected" : "time"} onClick={()=> {setSelectedTime(time); onSelect?.(selectedDate, time)}}>{time}</button>
                    ))}
                    </div>
                </div> 
            )}
            
        </div>
    );
}