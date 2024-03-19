import React from "react";
import Selection from "./selection/Selection";
import "./BotBubble.css";

/*this class makes the messages sent from chatbot */
export default function BotBubble({ message, setUserMessages }) {
    console.log(`botMessages inside bubble: ${JSON.stringify(message)}`);
    if (message.isGreeting) {
        return (
            <div className="bot-message-container">
                <div className="bot-avatar" />
                <div className="chat-bubble bot">{message.content}</div>
            </div>
        );
    }
    return (
        <div className="bot-message-container">
            <div className="bot-avatar" />
            <div className="chat-bubble bot select-form">
                <Selection symptom={message.content} setUserMessages={setUserMessages} />
            </div>
        </div>
    );
}
