import React, { useState } from 'react'
import "./sidebar.css"
import { MdLogout } from "react-icons/md";
import { sidebardata } from './sidebardata.jsx';
import { FaChevronUp , FaChevronDown } from "react-icons/fa";
import { TbBallFootball, TbSwimming, TbBallVolleyball } from "react-icons/tb";

function LogOut() {
  // Add Log Out functionalities

}

function Sidebar() {
  const [Eventopen, setEventOpen] = useState(true);
  const [nextPage, setNextPage] = "";

  return (
    <div className='Sidebar'>
    <ul className = 'SidebarList'>
    {sidebardata.map((val, key) => { //handle this with navigate
      return <li 
            key={key}
            className = "row"
            id = {window.location.pathname == val.link ? "active" : ""}
            onClick={()=> setNextPage(val.link)}>
        <div id="icon">{val.icon}</div>{" "}
        <div id="title">
          {val.title}
        </div>
      </li>
    })}
    <li className = "row" onClick={LogOut()}>
      <div id="icon"><MdLogout/></div>
      <div id="title">
        Logout
      </div>
    </li>
    <li className="events">
      <div 
        className={`events-header${Eventopen ? " active" : ""}`} 
        onClick={() => setEventOpen(o => !o)}
      >
        <div className="events-title" >
          Events
        </div>
        <div className ="events-icon">
          {Eventopen ? <FaChevronDown/> : <FaChevronUp/>}
        </div>
      </div>
      {Eventopen && (
      <ul className="events-list">
        <li>
          <div id="icon"><TbBallFootball/></div>
          <div id="title">Hand Ball</div>
        </li>
        <li>
          <div id="icon"><TbSwimming/></div>
          <div id="title">Swimming</div>
        </li>
        <li>
          <div id="icon"><TbBallVolleyball/></div>
          <div id="title">Volleyball</div>
        </li>
      </ul>
      )}
    </li>
    </ul>
  </div>  
  )
}

export default Sidebar