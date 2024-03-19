import React, { useState, useEffect, useRef } from "react";
import PopUp from "./PopUp";
import "./Result.css";

export default function Result({ posblSymptoms }) {
    const [seen, setSeen] = useState(false);
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [seen]);

    return (
        <div>
            <div className="result-button">
                <button onClick={() => setSeen(true)} type="res">
                    Result
                </button>
            </div>
            {seen ? <PopUp setSeen={setSeen} posblSymptoms={posblSymptoms} /> : null}
            <div ref={messagesEndRef} />
        </div>
    );
}
