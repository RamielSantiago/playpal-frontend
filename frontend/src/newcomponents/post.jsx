import './post.css'
import Player_count from "./player_count.jsx"
import { GoKebabHorizontal } from "react-icons/go";
import { IoCalendarClear, IoEyeSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { IoPeople } from "react-icons/io5";
 // postdata pass the params for the post data here
 
function Post(val) {
  const post_players = {
  player: 5,
  total: 5
  }
  const isFull = post_players.player === post_players.total;
  return (
    <div className="post-wrapper">
        <div className="post-header">
            <div className="left-header">
              <div className="post-title"><h2>Lf 4 Kasama!</h2></div>
              <div className="details"><span>Basketball</span><span>Razon</span><span><IoCalendarClear/> &nbsp; July 4, 2025 &nbsp; <FaClock/> &nbsp;16:20</span></div>
            </div>
            <div className="right-header">
               <div className="post-date">28 Jun 2025, 2:30 PM</div>
               <div className="post-view"><GoKebabHorizontal/></div> 
            </div>
        </div>
        <div className="post-profile">
          <div className="post-profileimg"></div>
          <div className="post-name">Abraham Chen</div>
        </div>
        <div className="post-content">...
        </div>
        <div className="post-footer">
          <div className="post-buttons">
            <button className={`post-message ${isFull ? 'active' : ''}`}><FaPlus/>&nbsp;&nbsp;Join Event</button>
          </div>
          <div className="post-model">
            <button className={`player_count ${isFull ? 'active' : ''}`}><IoPeople />{isFull ? 'FULL' : `${post_players.player} / ${post_players.total}`}</button>
          </div>
        </div>
    </div>
  )
}

export default Post