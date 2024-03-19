import React, { useState, useEffect, useContext } from "react";
import { DATABASE_URL, MOCK_API_URL } from "../../../../../constants";
import "./Selection.css";
import { PostContext } from "../../../Chatbot";

export default function Selection({ symptom, setUserMessages }) {
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
    let [isChecked_0, setIsChecked_0] = useState(false);
    let [isChecked_1, setIsChecked_1] = useState(false);
    let [isClicked, setIsClicked] = useState(false);
    const [reqSendingRequired, setReqSendingRequired] = useState(false);

    const handleOnChange_0 = () => {
        setIsChecked_0(!isChecked_0);
        if (isChecked_1) {
            setIsChecked_1(!isChecked_1);
        }
    };

    const handleOnChange_1 = () => {
        setIsChecked_1(!isChecked_1);
        if (isChecked_0) {
            setIsChecked_0(!isChecked_0);
        }
    };

    const handleConfirm = () => {
        if ((isChecked_0 || isChecked_1) && !isClicked) {
            setIsClicked(!isClicked);
            setUserMessages((oldMessages) => [...oldMessages, isChecked_1 ? "yes" : "no"]);
            setReqSendingRequired(true);
            setValidAnswers((oldAnswers) => {
                oldAnswers[symptom] = isChecked_1 ? 1 : 0;
                return oldAnswers;
            });
        }
    };

    useEffect(() => {
        if (reqSendingRequired) {
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
    }, [reqSendingRequired]);
    let btn_class = isClicked ? "selected-pressed" : "select-form";
    return (
        <div className="selection">
            <h5>Do you have {symptom.replaceAll("_", " ")}?</h5>
            <div className="choices">
                <div className="line">
                    <input
                        type="checkbox"
                        class="cb"
                        name="Yes"
                        value="1"
                        checked={isChecked_1}
                        onChange={handleOnChange_1}
                    />
                    Yes
                </div>
                <div className="line">
                    <input
                        type="checkbox"
                        class="cb"
                        name="No"
                        value="0"
                        checked={isChecked_0}
                        onChange={handleOnChange_0}
                    />
                    No
                </div>
            </div>
            <button class={btn_class} onClick={handleConfirm} disabled={isClicked ? "disabled" : ""}>
                Confirm
            </button>
        </div>
    );
}
