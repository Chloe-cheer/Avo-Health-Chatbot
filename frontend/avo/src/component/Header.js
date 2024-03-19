import React from "react";
import "./Header.css";
import "./chatbot/board/result/PopUp.css";
import formhelp from "../img/form-help.png";
import sendhelp from "../img/send-help.png";
import restartchelp from "../img/restartc-help.png";
import restarthelp from "../img/restart-help.png";
import sformhelp from "../img/sform-help.png";
import resulthelp from "../img/result-help.png";
import result1help from "../img/result1-help.png";
import result2help from "../img/result2-help.png";
import { withRouter } from "react-router-dom";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSection: "home",
        };

        this.handleToggleSection = this.handleToggleSection.bind(this);
    }

    handleToggleSection(e) {
        const { name } = e.target;
        this.setState(() => ({
            activeSection: name,
        }));
    }
    render() {
        return (
            <div className="header">
                <Buttons onToggle={this.handleToggleSection} />
                <Main activeSection={this.state.activeSection} />
            </div>
        );
    }
}

const Main = ({ activeSection }) => (
    <React.Fragment>
        <HomePage activeSection={activeSection} />
        <AboutPage activeSection={activeSection} />
        <HelpPage activeSection={activeSection} />
    </React.Fragment>
);

class HomePage extends React.Component {
    get show() {
        return this.props.activeSection === "home";
    }
    render() {
        if (this.show) {
            return (
                <div className="header2">
                    <br />
                    <h1>Symptom ✨ Checker ✨</h1>
                    <br />
                    <h3>Chat with Dr Avocado today</h3>
                    <p>Foot pain? Headache? Sore throat? Skin rash? Ask Dr Avocado to find out!</p>
                </div>
            );
        } else {
            return null;
        }
    }
}

const Buttons = ({ onToggle }) => (
    <div className="all-buttons">
        <button type="res" name="home" onClick={onToggle}>
            Home
        </button>
        <button type="res" name="about" onClick={onToggle}>
            About
        </button>
        <button type="res" name="help" onClick={onToggle}>
            Help
        </button>
    </div>
);

class AboutPage extends React.Component {
    get show() {
        return this.props.activeSection === "about";
    }

    render() {
        if (this.show) {
            return (
                <div className="header2">
                    <br />
                    <h2>About Symptom Checker ✨</h2>
                    <br />
                    <p>
                        This application asks the user what symptoms they have and then asks questions on they have
                        other symptoms associated with diseases associated with confirmed symptoms. With each confirmed
                        symptom adding to probability of diseases, a predicted disease will be displayed when its
                        probability reaches 95%.
                    </p>
                    <h5>Our Team</h5>
                    <p>Mentor</p>
                    <div className="people">
                        <div className="txt">
                            <p>Dr. Hamzah Osop</p>
                            <div
                                class="dp-h"
                                onClick={() => window.open("http://linkedin.com/in/hamzahosop", "_blank")}
                            ></div>
                        </div>
                    </div>
                    <p>Frontend</p>
                    <div className="people">
                        <div className="txt">
                            <p>Chloe Chen</p>
                        </div>
                        <div className="txt">
                            <p>Faye Xie</p>
                        </div>
                        <div className="txt">
                            <p>Michael Mai</p>
                        </div>
                    </div>
                    <div className="people">
                        <div className="txt">
                            <div
                                class="dp-c"
                                onClick={() => window.open("http://linkedin.com/in/chloe-chen-ba9b6a1a3", "_blank")}
                            ></div>
                        </div>
                        <div className="txt">
                            <div
                                class="dp-f"
                                onClick={() => window.open("https://www.linkedin.com/in/faye-x-460815174/", "_blank")}
                            ></div>
                        </div>
                        <div className="txt">
                            <div
                                class="dp-m"
                                onClick={() => window.open("http://linkedin.com/in/tiancheng-mai", "_blank")}
                            ></div>
                        </div>
                    </div>
                    <p>Backend</p>
                    <div className="people">
                        <div className="txt">
                            <p>Jiahao Wu</p>
                            <div
                                class="dp-j"
                                onClick={() => window.open("http://linkedin.com/in/jiahao-wu-b51641200", "_blank")}
                            ></div>
                        </div>
                        <div className="txt">
                            <p>Scarlett Hu</p>
                            <div class="dp-s" onClick={() => window.open("https://google.com", "_blank")}></div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

class HelpPage extends React.Component {
    get show() {
        return this.props.activeSection === "help";
    }
    render() {
        if (this.show) {
            return (
                <div className="header2">
                    <br />
                    <center>
                        <h2>Help Page ✨</h2>
                    </center>
                    <div className="helperItem">
                        <br />
                        <h5>Press "start" to start</h5>
                        <br />
                        <h5>Please fill in your information and click submit</h5>
                        <img className="photo" src={formhelp} />
                        <br />
                    </div>
                    <div className="helperItem">
                        <br />
                        <h5>Start chatting with Dr Avocado</h5>
                        <p>Please type here to input your first symptom and press send/enter</p>
                        <img className="photo" src={sendhelp} />
                        <br />
                        <p>Tick YES/NO for whether you have this symptom, then click confirm</p>
                        <img className="photo" src={sformhelp} />
                        <br />
                    </div>
                    <div className="helperItem">
                        <br />
                        <h5>Press here for menu</h5>
                        <p>Press here to restart chat only</p>
                        <img className="photo" src={restartchelp} />
                        <br />
                        <p>Press here to restart</p>
                        <img className="photo" src={restarthelp} />
                        <br />
                    </div>
                    <br />
                    <p>Press here for result</p>
                    <img className="photo" src={resulthelp} />
                    <br />
                    <p>Press here to close result</p>
                    <img className="photo" src={result1help} />
                    <br />
                    <p>You will see disease predictions with probability</p>
                    <img className="photo" src={result2help} />
                </div>
            );
        } else {
            return null;
        }
    }
}
