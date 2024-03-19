import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Chatbot from "./chatbot/Chatbot";
import Header from "./Header";
import { StartForm, StartForm2 } from "./Form";
import "./Styles.css";



export const USERID = Math.floor(Math.random()*999999);


class Start extends React.Component {
    render() {
        return (
            <Link to="/Form">
                <div className="centered2">
                    <div className="big-icon" />
                </div>
                <div className="centered2">
                    <button type="submit">Start</button>
                </div>
            </Link>
        );
    }
}
export { Start as Start };

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="app-container">
                    <Header/>
                    <div className="chat-container2">
                        <Switch>
                            <Route exact path="/" component={Start}></Route>
                            <Route path="/Form" component={StartForm}></Route>
                            <Route path="/Form2" component={StartForm2}></Route>
                            <Route path="/Chatbot" component={Chatbot}></Route>
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;
