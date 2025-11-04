import { useState } from "react";
import "../styles/_Calender.scss"

type CalenderProps = {
    onSelect?: (date: Date, time?: string) => void;
}

export default function Calender({ onSelect } : CalenderProps) {
    const [view, setView] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    
        // Uppbyggnad calender 
    const year = view.getFullYear();
    const month = view.getMonth();
    const first = new Date(year, month, 1); 
    const startDay = (first.getDay() + 6) % 7;  // Detta hämtar alla veckodagar men eftersom vi vill att måndagen ska börja på nr 1 (index) måste vi rotera tbx ett steg och det gör vi med modulen 7 (% 7). 7 för alladagar i veckan.
    const daysInMonth = new Date(year, month + 1, 0).getDate();  // 1 visar index för månaden. 0 visar dagen innan den första på månaden men eftersom det inte finns feb 0:e backar vi till januari 31 istället
    const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;  

    function stripTime(d: Date) {
        const x = new Date(d);
        x.setHours(0,0,0,0); // Sätter dagens tid till 00:00 (midnatt) så att vi kan jämnföra bara datumet o inte tiden 
        return x;
    }

    // Detta jämför 2 datum utan att ta hänsyn till tiden så att man kan markera rätt dag i kalendern.
    function sameDate(a: Date, b: Date) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    // Loopar igenom alla celler i kalendern (dagar & tomrutor) för att skapa varje datum ruta
    const cells = [];
    for (let i = 0; i <totalCells; i++) {
        const day = i - startDay +1;
        const d = new Date(year, month, day);

        const inMonth = d.getMonth() === month;   // Detta kollar om dagen "d" tillhör den aktuela månaden som visas i kalendern.
        const past = stripTime(d) < stripTime(new Date());  // Detta kollar om dagen "d" före dagens datum så du inte kan boka gamla datum coh striptime tar bort tiden.
        const today = sameDate(d, new Date());  // Detta kollar om det är idag
        const isSelected = selectedDate && sameDate(d, selectedDate);  // Detta kollar ifall "d" är dagen som usern har klickat på. SelectedDate är datuemt usern valde och sameDate jämför utan hänsyn till tiden.

        // Detta styr hur datumrutan ska se ut beroende på status
        const classes = [
            "cal-cell",
            inMonth ? "" : "muted",   // Gråar ("mutar") om det inte är i aktuell månad.
            (inMonth && past) ? "muted": "",  // Samma gäller datumet som har redan varit.
            today ? "today" : "",  // Om dagen är idag då ska detta ej gråas
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