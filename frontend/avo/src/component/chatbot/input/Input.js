import React, { useState, useEffect, useContext } from "react";
import "./Input.css";
import sendEnabled from "../../../img/sendEnabled.png";
import sendDisabled from "../../../img/sendDisabled.png";
import { MOCK_API_URL, DATABASE_URL } from "../../../constants";
import { PostContext } from "../Chatbot";

export default function Input({ setUserMessages, isDisableInput }) {
    const [currentInput, setCurrentInput] = useState("");
    const [sendIcon, setSendIcon] = useState(sendDisabled);
    const [reqSendingRequired, setReqSendingRequired] = useState(false);
    const {
        post,
        validAnswers,
        setValidAnswers,
        setBotMessages,
        isDiagComplete,
        setIsDiagComplete,
        setPosblSymptoms,
        setIsDisableInput,
    } = useContext(PostContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUserMessages((oldMessages) => [...oldMessages, currentInput]);
        setValidAnswers((oldAnswers) => {
            oldAnswers[currentInput] = 1;
            return oldAnswers;
        });
        setReqSendingRequired(true);
        setCurrentInput("");
    };
    const handleInput = (event) => {
        setCurrentInput(event.target.value);
    };

    useEffect(() => {
        // Deal with submit button update
        if (currentInput.length > 0) {
            setSendIcon(sendEnabled);
        } else {
            setSendIcon(sendDisabled);
        }
        // Deal with sending post reqeust
        console.log(reqSendingRequired);
        if (reqSendingRequired) {
            console.log(`validAnsers: ${JSON.stringify(validAnswers)}`);
            post(
                MOCK_API_URL,
                DATABASE_URL,
                validAnswers,
                setValidAnswers,
                setBotMessages,
                isDiagComplete,
                setIsDiagComplete,
                setPosblSymptoms,
                setIsDisableInput
            );
            setReqSendingRequired(false);
        }
    }, [currentInput, reqSendingRequired]);

    return (
        <div className="input-container">
            <form action="/Diagnosis" method="post" onSubmit={handleSubmit}>
                <input
                    id="chat"
                    autoComplete="off"
                    onChange={handleInput}
                    placeholder="Please leave your message here"
                    value={currentInput}
                    disabled={isDisableInput ? "disabled" : ""}
                />
                <button
                    type="submit"
                    className="input-submit-norm"
                    disabled={isDisableInput || currentInput.length === 0 ? "disabled" : ""}
                >
                    <img src={sendIcon} alt="" />
                </button>
            </form>
        </div>
    );
}
