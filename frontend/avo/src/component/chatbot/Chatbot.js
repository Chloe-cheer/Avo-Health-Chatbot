import React, { useState, createContext } from "react";
import Header from "./header/Header.js";
import Input from "./input/Input.js";
import "./Chatbot.css";
import { BOT_GREETING_MESSAGE, BOT_QUESTION, CHAT_ENDING_MESSAGE } from "../../constants.js";
import Board from "./board/Board.js";
import { USERID } from "../App.js";

export const PostContext = createContext({});
export default function Chatbot() {
    const [userMessages, setUserMessages] = useState([]);
    const [validAnswers, setValidAnswers] = useState({}); // Valid symptoms/selections users chose
    const [botMessages, setBotMessages] = useState([{ content: BOT_GREETING_MESSAGE, isGreeting: true }]);
    const [posblSymptoms, setPosblSymptoms] = useState([]);
    const [isDiagComplete, setIsDiagComplete] = useState(false);
    const [isDisableInput, setIsDisableInput] = useState(false);

    const post = (
        url,
        database_url,
        validAnswers,
        setValidAnswers,
        setBotMessages,
        isDiagComplete,
        setIsDiagComplete,
        setPosblSymptoms,
        setIsDisableInput
    ) => {
        // POST request using fetch with error handling
        console.log("id" + USERID);
        var cleanAnswers = {};
        for (const [key, value] of Object.entries(validAnswers)) {
            console.log(key, value);
            cleanAnswers[key.replaceAll(" ", "_")] = value;
        }
        validAnswers = cleanAnswers;
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
            },
            body: JSON.stringify({ validAnswers, USERID }),
        };
        fetch(url, requestOptions)
            .then(async (response) => {
                const isJson = response.headers.get("content-type")?.includes("application/json");
                const data = isJson && (await response.json());

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                setIsDisableInput(true);

                if (data.endDiagnose) {
                    setIsDiagComplete(true);
                    console.log("isDiagComplete: " + isDiagComplete);
                    setPosblSymptoms(data.probability);
                    setBotMessages((oldMessages) => [
                        ...oldMessages,
                        { content: CHAT_ENDING_MESSAGE, isGreeting: true },
                    ]);

                    // post to database when diagnose finishes
                    const databaseRequestOptions = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
                        },
                        body: JSON.stringify({ validAnswers, data, USERID }),
                    };
                    fetch(database_url, databaseRequestOptions)
                        .then(async (response) => {
                            // check for error response
                            if (!response.ok) {
                                // get error message from body or default to response status
                                const error = response.status;
                                return Promise.reject(error);
                            }
                        })
                        .catch((error) => {
                            console.error("There was an error!", error);
                        });

                } else {
                    setBotMessages((oldMessages) => [...oldMessages, { content: data.question[0], isGreeting: false }]);
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
                setValidAnswers({});
                setBotMessages((oldMessages) => [...oldMessages, { content: BOT_QUESTION, isGreeting: true }]);
            });
    };

    const postContextValue = {
        post,
        validAnswers,
        setValidAnswers,
        setBotMessages,
        isDiagComplete,
        setIsDiagComplete,
        setPosblSymptoms,
        setIsDisableInput,
    };

    return (
        <div className="chat-container">
            <Header />
            <PostContext.Provider value={postContextValue}>
                <Board
                    userMessages={userMessages}
                    setUserMessages={setUserMessages}
                    botMessages={botMessages}
                    posblSymptoms={posblSymptoms}
                />
                <Input setUserMessages={setUserMessages} isDisableInput={isDisableInput} />
            </PostContext.Provider>
        </div>
    );
}
