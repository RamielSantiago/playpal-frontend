import React, { useState } from 'react';
import { FaChevronUp , FaChevronDown } from "react-icons/fa";
import { MdNotificationAdd } from "react-icons/md";
import "./_rightSideBar.css";
function RightSideBar() {
  const [Notifopen, setNotifOpen] = useState(false);
  return (
    <div className="right-sidebar">
      <ul className="right-sidebar-list">
           <li className="notif">
                 <div 
                  className={`notif-header${Notifopen ? " active" : ""}`}
                  onClick={() => setNotifOpen(o => !o)}
                 >
                   <div className="notif-logo">
                     <MdNotificationAdd/>
                   </div>
                   <div className="notif-title" >
                     Notifications
                   </div>
                   <div className ="notif-icon">
                     {Notifopen ? <FaChevronDown/> : <FaChevronUp/>}
                   </div>
                 </div>
                 {Notifopen && (
                 <ul className="notif-list">
                   <li>
                     <div id="title">Your recent post just hit 3 views!</div>
                   </li>
                   <li>
                     <div id="title">Your recent post was saved 3 times!</div>
                   </li>
                 </ul>
                 )}
            </li>
      </ul>
    </div>
  )
}

export default RightSideBar;