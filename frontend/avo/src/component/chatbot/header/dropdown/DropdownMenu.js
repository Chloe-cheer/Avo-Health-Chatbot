import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./DropdownMenu.css"

const DropdownMenuIcon = (s) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [seen, setseen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);

    const togglePop = () => {
        setseen(prevState => !prevState);
    };
    s = seen;
    return (
    <div>
      <div className="dropdown-container">
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle tag='div'>
        <div className="dots"/>
        </DropdownToggle>
        <div className="dropdown-list">
            <DropdownMenu >
                <a href='/Chatbot' style={{textDecoration: "none"}}><DropdownItem style={{width: "60%"}}>Restart Chat</DropdownItem></a>
                <a href='/' style={{textDecoration: "none"}}><DropdownItem style={{width: "60%"}}>Restart</DropdownItem></a>
            </DropdownMenu>
        </div>
      </Dropdown>
      </div>  
    </div>
    );
}
export default DropdownMenuIcon
