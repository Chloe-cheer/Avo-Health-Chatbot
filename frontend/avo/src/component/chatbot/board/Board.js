import React, { useEffect, useRef, useContext } from "react";
import "./Board.css";
import BotBubble from "./bubbles/BotBubble";
import UserBubble from "./bubbles/UserBubble";
import Result from "../board/result/Result";
import { PostContext } from "../Chatbot";

export default function Board({ userMessages, setUserMessages, botMessages, posblSymptoms }) {
    const { isDiagComplete } = useContext(PostContext);
    const allMessages = [];
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [userMessages, botMessages]);

    for (let i = 0; i < botMessages.length; i++) {
        if (i === botMessages.length - 1) {
            //if bot replied to last message
            if (userMessages[i]) {
                allMessages.push(<BotBubble message={botMessages[i]} setUserMessages={setUserMessages} />);
                allMessages.push(<UserBubble message={userMessages[i]} />);
            } else {
                allMessages.push(<BotBubble message={botMessages[i]} setUserMessages={setUserMessages} />);
            }
            break;
        }
        allMessages.push(<BotBubble message={botMessages[i]} setUserMessages={setUserMessages} />);
        allMessages.push(<UserBubble message={userMessages[i]} />);
    }

    if (isDiagComplete) {
        return (
            <div className="msg-container">
                {allMessages}
                <Result posblSymptoms={posblSymptoms} />
                <div ref={messagesEndRef} />
            </div>
        );
    }
    return (
        <div className="msg-container">
            {allMessages}
            <div ref={messagesEndRef} />
        </div>
    );
}
