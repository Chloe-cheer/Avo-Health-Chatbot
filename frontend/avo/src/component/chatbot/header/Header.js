import React from "react";
import "./Header.css";
import DropdownMenuIcon from "./dropdown/DropdownMenu";

/*used to create the header that has avo icon and name*/
export default class ChatHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            hide: true,
        };
    }

    onClick = () => {
        this.setState({
            hide: !this.state.hide,
        });
    };

    render() {
        return (
            <div className="chat-header">
                <div className="profile">
                    <div className="icon" />
                    <div className="text">
                        <h4>Dr Avocado</h4>
                    </div>
                </div>
                <DropdownMenuIcon />
            </div>
        );
    }
}
