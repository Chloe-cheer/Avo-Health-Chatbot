import React from "react";
import "../result/PopUp.css";
import {
  MainContainer,
  MainContainer2,
  Container,
  BarChartContainer,
  Number,
  BlackLine,
  MakeBar,
  BlackLineVert
} from "./styles";

export default function PopUp({ setSeen, posblSymptoms }) {

    return (
        <div className="modal">
            <div className="close" onClick={() => setSeen(false)}>
                &times;
            </div>
            <div className="popup-box">
            <h5>You may have the following diseases with those probabilities:</h5>
            <Container>
            <MainContainer>
                {Object.keys(posblSymptoms).slice(0, 5).map((key, index) =>
                    <BarChartContainer key={index}>
                        <Number color={"#05a081"}>{key.replaceAll("_", " ")}</Number>
                        <Number color={posblSymptoms[key].toFixed(0) > 50 ? "red" : "orange"}>{posblSymptoms[key].toFixed(0) > 50 ? "high chance" : "fair chance"} with {posblSymptoms[key].toFixed(2)}% probability</Number>
                        <MakeBar width={posblSymptoms[key].toFixed(0)} colors={["#05a081", "#05a081"]} />
                    </BarChartContainer>
                )}
                <BlackLine/>
                <Number color={"black"}>Take care!</Number>
            </MainContainer>
            </Container>
            </div>

        </div>
    );
}

//0-50 fair, >50 high
