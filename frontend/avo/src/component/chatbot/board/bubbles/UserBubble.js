import React from "react";
import "./UserBubble.css";

/*this class makes the messages sent by user */
export default function UserBubble({ message }) {
    return (
        <div className="user-message-container">
            <div className="chat-bubble user">{message}</div>
        </div>
    );
}
