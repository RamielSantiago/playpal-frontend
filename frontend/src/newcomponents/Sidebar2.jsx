import React, { useState } from 'react';
import { FaChevronUp , FaChevronDown } from "react-icons/fa";
import { MdNotificationAdd } from "react-icons/md";
import { BiSolidChat } from "react-icons/bi";
import { BsListTask } from "react-icons/bs";
import "./sidebar2.css"
function Sidebar2() {
  const [Notifopen, setNotifOpen] = useState(false);
  const [Messageopen, setMessageOpen] = useState(false);
  const [Remindopen, setRemindOpen] = useState(false);
  return (
    <div className="Sidebar2">
      <ul className="Sidebar-List2">
           <li className="notif">
                 <div 
                  className={`notif-header${Notifopen ? " active" : ""}`}
                  onClick={() => setNotifOpen(o => !o)}
                 >
                   <div className="notif-logo">
                     <MdNotificationAdd/>
                   </div>
                   <div className="notif-title" >
                     Notification
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
            <li className="message">
                 <div
                  className={`message-header${Messageopen ? " active" : ""}`} 
                  onClick={() => setMessageOpen(o => !o)}
                  >
                   <div className="message-logo">
                     <BiSolidChat/>
                   </div>
                   <div className="message-title" >
                     Messages "View All"
                   </div>
                   <div className ="message-icon">
                     {Messageopen ? <FaChevronDown/> : <FaChevronUp/>}
                   </div>
                 </div>
                 {Messageopen && (
                 <ul className="flex-col message-list">
                   <li>
                     <div id="Name" className='flex-row'><div className="message-profileimg"></div>
                     <div className="flex-col info"><div className="username">Abraham Chen</div>
                     <div className="flex-row message-message">
                        <div className="latest-message">Hey Enzo! its me I was w...</div>
                        <div className=" flex-row time">&nbsp;-&nbsp;2m</div>
                      </div>
                    </div>
                    <div className='message-status'><div id="active"></div></div>
                     </div>
                   </li>
                   <li>
                     <div id="Name" className='flex-row'><div className="message-profileimg"></div>
                     <div className="flex-col info"><div className="username">John Doe</div>
                     <div className="flex-row message-message">
                        <div className="latest-message">Hey Enzo! its me I was w...</div>
                        <div className=" flex-row time">&nbsp;-&nbsp;2m</div>
                      </div>
                    </div>
                    <div className='message-status'><div id="active"></div></div>
                     </div>
                   </li>
                 </ul>
                 )}
            </li>
            <li className="remind">
                 <div 
                 className={`remind-header${Remindopen ? " active" : ""}`} 
                 onClick={() => setRemindOpen(o => !o)}
                 >
                   <div className="remind-logo">
                     <BsListTask />
                   </div>
                   <div className="remind-title" >
                     Reminders
                   </div>
                   <div className ="remind-icon">
                     {Remindopen ? <FaChevronDown/> : <FaChevronUp/>}
                   </div>
                 </div>
                 {Remindopen && (
                 <ul className="remind-list">
                   <li>
                     <div id="Name"></div>
                   </li>
                 </ul>
                 )}
            </li>
      </ul>
    </div>
  )
}

export default Sidebar2