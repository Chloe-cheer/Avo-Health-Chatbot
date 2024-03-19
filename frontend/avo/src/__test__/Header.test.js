import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Header from '../component/Header.js';


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

test('render test 1', () => {
    act(() => {
        render(<Header headerText = "test headerText"/>, container);
    });
    expect(container.innerHTML).toBe("<div class=\"header\"><div class=\"all-buttons\"><button type=\"res\" name=\"home\">Home</button><button type=\"res\" name=\"about\">About</button><button type=\"res\" name=\"help\">Help</button></div><div class=\"header2\"><br><h1>Symptom ✨ Checker ✨</h1><br><h3>Chat with Dr Avocado today</h3><p>Foot pain? Headache? Sore throat? Skin rash? Ask Dr Avocado to find out!</p></div></div>");
});
