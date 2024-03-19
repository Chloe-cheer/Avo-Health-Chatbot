import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import ChatHeader from '../component/chatbot/header/Header.js';


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
        render(<ChatHeader/>, container);
    });
    expect(container.innerHTML).toBe("<div class=\"chat-header\"><div class=\"profile\"><div class=\"icon\"></div><div class=\"text\"><h4>Dr Avocado</h4></div></div><div><div class=\"dropdown-container\"><div class=\"dropdown\"><div aria-haspopup=\"true\" class=\"\" aria-expanded=\"false\"><div class=\"dots\"></div></div><div class=\"dropdown-list\"><div tabindex=\"-1\" role=\"menu\" aria-hidden=\"true\" class=\"dropdown-menu\"><a href=\"/Chatbot\" style=\"text-decoration: none;\"><button type=\"button\" style=\"width: 60%;\" tabindex=\"0\" role=\"menuitem\" class=\"dropdown-item\">Restart Chat</button></a><a href=\"/\" style=\"text-decoration: none;\"><button type=\"button\" style=\"width: 60%;\" tabindex=\"0\" role=\"menuitem\" class=\"dropdown-item\">Restart</button></a></div></div></div></div></div></div>");
});
