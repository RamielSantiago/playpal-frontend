import './Homepage.css'
import Topbar from './topbar.jsx';
import Sidebar from './sidebar.jsx';
import Sidebar2 from './Sidebar2.js';
import Post from './post.jsx'
import { FaRunning } from "react-icons/fa";
import { IoLocationSharp, IoCalendarClear } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
function Page() {
  return (
     <>
    <Topbar />
    <div className="content-wrapper">
        <Sidebar />
        <div className="left-wrapper">
        </div>
        <div className="main-content">
            <div className="home-buttons">
                <div className="filters">
                  <button id="sport" className="filter"><span id="icon"><FaRunning/></span><span id="title">Sport</span></button>
                  <button id="location" className="filter"><span id="icon"><IoLocationSharp/></span><span id="title">Location</span></button>
                  <button id="calendar" className="filter"><span id="icon"><IoCalendarClear /></span><span id="title">Date and Time</span></button>
                </div>
                <div className="extra">
                  <button id="createpost"><span id="icon"><FaPlus/></span><span id="title">Create Post</span></button>
                </div>
            </div>
            <div className="post-list">
              <Post/>
              <Post/>
              <Post/>
            </div>
        </div>
        <div className="right-wrapper"style={{marginLeft: "300px"}}>
        <Sidebar2 />
        </div>
    </div>
    </>
  )
}

export default Page