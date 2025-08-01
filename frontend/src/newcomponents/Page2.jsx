import './Homepage.css'
import './profile.css';
import Topbar from './topbar.jsx';
import Sidebar from './sidebar.jsx';
import Sidebar2 from './Sidebar2.js';
import Post from './post.jsx'
import { FaPlus } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
function Page2() {
  return (
     <>
    <Topbar />
    <div className="content-wrapper">
        <Sidebar />
        <div className="left-wrapper">
        </div>
        <div className="main-content">
            <div className="user-ewrapper">
                <div className="user-wrapper">
                    <div id="user-image"></div>
                    <div id="user-content">
                        <div className="username"><h2>Enzo Arkin Panugayan</h2></div>
                        <div className="tags"><span>Basketball</span><span>Badminton</span></div>
                        <div className="bio">
                            Baller<br/>
                            God is LOVE<br/>
                            Animo La Salle!<br/>
                        </div>
                    </div>
                    <div id="user-edit"><FaEdit/></div>
                </div>
            </div>
            <div className="home-buttons">
                <div className="user-post-title">
                  John's Posts
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

export default Page2