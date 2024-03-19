import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import {data} from '../component/App.js';
import App from '../component/App.js';
import Start from '../component/App.js';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });


// data test
test('data correctness 1', () => {
    // expect(data.headerText).toBe("Symptom✨ Checker ✨");
    // expect(data.pText).toBe("Draft 2");
    // expect(data.botGreeting).toBe("Thanks for providing your personal information. Now can you describe the most sever symptom in one word for me? Don't worry! We will ask for more symptoms in the order of severity later.");
});

test('data correctness 2', () => {
    var data_expect = {
        headerText: "Symptom🤮 Checker ✨",
        pText: "Draft 2",
        p2Text: "Foot pain? Headache? Sore throat? Skin rash? Ask Avene to find out what's causing your symptom.",
        userMessages: [],
        botMessages: [],
        botGreeting: "Thanks for providing your personal information. Now can you describe the most sever symptom in one word for me? Don't worry! We will ask for more symptoms in the order of severity later.",
        botLoading: false
      };
    // expect(data).toMatchObject(data_expect);
});

// render test
test('component start render test', () => {
    act(() => {
        render(<Start/>, container);
    });
    expect(container.getElementsByClassName("centered2")[0].innerHTML).toBe('<div class=\"big-icon\"></div>');
    expect(container.getElementsByClassName("centered2")[1].innerHTML).toBe('<button type="submit">Start</button>');
    expect(container.textContent).toBe("HomeAboutHelpSymptom ✨ Checker ✨Chat with Dr Avocado todayFoot pain? Headache? Sore throat? Skin rash? Ask Dr Avocado to find out!Start");
});

test('component App render test', () => {
    var data = {
        headerText: "Symptom🤮 Checker ✨",
        pText: "Draft 2",
        p2Text: "Foot pain? Headache? Sore throat? Skin rash? Ask Avene to find out what's causing your symptom.",
        userMessages: [],
        botMessages: [],
        botGreeting: "Thanks for providing your personal information. Now can you describe the most sever symptom in one word for me? Don't worry! We will ask for more symptoms in the order of severity later.",
        botLoading: false
    };

    act(() => {
        render(React.createElement(App,data), container);
    });
    // console.log(container.getElementsByClassName("app-container")[0].innerHTML);
    expect(container.getElementsByTagName("h1")[0].textContent).toBe('Symptom ✨ Checker ✨');
    // expect(container.getElementsByTagName("h2")[0].textContent).toBe('Draft 2');
});
