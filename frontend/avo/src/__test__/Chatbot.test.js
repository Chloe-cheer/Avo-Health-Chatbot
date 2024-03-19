import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import '../component/chatbot/Chatbot.js';
import Chatbot from '../component/chatbot/Chatbot.js';


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
        window.HTMLElement.prototype.scrollIntoView = function() {};
        render(<Chatbot/>, container);
    });
    expect(container.innerHTML).toBe("<div class=\"chat-container\"><div class=\"chat-header\"><div class=\"profile\"><div class=\"icon\"></div><div class=\"text\"><h4>Dr Avocado</h4></div></div><div><div class=\"dropdown-container\"><div class=\"dropdown\"><div aria-haspopup=\"true\" class=\"\" aria-expanded=\"false\"><div class=\"dots\"></div></div><div class=\"dropdown-list\"><div tabindex=\"-1\" role=\"menu\" aria-hidden=\"true\" class=\"dropdown-menu\"><a href=\"/Chatbot\" style=\"text-decoration: none;\"><button type=\"button\" style=\"width: 60%;\" tabindex=\"0\" role=\"menuitem\" class=\"dropdown-item\">Restart Chat</button></a><a href=\"/\" style=\"text-decoration: none;\"><button type=\"button\" style=\"width: 60%;\" tabindex=\"0\" role=\"menuitem\" class=\"dropdown-item\">Restart</button></a></div></div></div></div></div></div><div class=\"msg-container\"><div class=\"bot-message-container\"><div class=\"bot-avatar\"></div><div class=\"chat-bubble bot\">Thanks for providing your personal information. Now can you describe the most severe symptom in for me? Don't worry! We will ask for more symptoms in the order of severity later.</div></div><div></div></div><div class=\"input-container\"><form action=\"/Diagnosis\" method=\"post\"><input id=\"chat\" autocomplete=\"off\" placeholder=\"Please leave your message here\" value=\"\"><button type=\"submit\" class=\"input-submit-norm\" disabled=\"\"><img src=\"sendDisabled.png\" alt=\"\"></button></form></div></div>");
});
