import { useState } from 'react';
import './_leftSideBar.css';
import { FaChevronUp , FaChevronDown } from "react-icons/fa";
import { TbBallFootball, TbSwimming, TbBallVolleyball } from "react-icons/tb";
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { leftSideBarData } from './_leftSideBarData.js';

function LeftSideBar() {
  const [Eventopen, setEventOpen] = useState(true);
  const navigate = useNavigate();
  
  const setNextPage = (link) => {
    if (link === 'logout') {
      try {
        googleLogout();
        navigate("/");
        console.log('Logout successful');
      } catch (error) {
        console.error('Logout error:', error);
      }
    } else {
      navigate(link);
    }
  };

  const renderSideBarData = (val, key) => {
    return (
      <li 
        key={key}
        className = "row"
        id = {window.location.pathname == val.link ? "active" : ""}
        onClick={() => setNextPage(val.link)}
      >
        <div id="icon">{val.icon}</div>
        <div id="title">{val.title}</div>
      </li>
    );
  };

  return (
    <div className='left-sidebar'>
      <ul className='left-sidebar-list'>
        {leftSideBarData.map((item, index) => renderSideBarData(item, index))}
        
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
  );
};

export default LeftSideBar;
