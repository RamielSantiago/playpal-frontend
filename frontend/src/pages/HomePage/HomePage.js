import PostsList from '../../components/_postsList/_postsList.js';
import SearchBar from '../../components/_searchBar/_searchBar.js';
import LeftSideBar from '../../components/_leftSideBar/_leftSideBar.js';
import RightSideBar from '../../components/_rightSideBar/_rightSideBar.js';
import './HomePage.css';
import { FaRunning } from "react-icons/fa";
import { IoLocationSharp, IoCalendarClear } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser.js';
import { API_BASE_URL } from '../../config.js';
import axios from 'axios';

function HomePage() {
  const { user, loading, error } = useUser();
  const [posts, setPosts] = useState([]);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
      fetchEvents();
  }, []);

  const fetchEvents = async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/crud/eventlist`);
          setPosts(response.data);
      } catch (err) {
          console.error('Error fetching events:', err);
      }
  };
  
 if (error) console.log(error);

  useEffect(() => {
    const fetchNamesAndMapPosts = async () => {
      if (posts.length === 0) {
        setMappedPosts([]);
        return;
      }
      // Get all unique emails, get full name for each, map names to posts
      const emails = Array.from(new Set(
        posts.flatMap(post => [post.organizerEmail, ...(post.memberEmails || [])])
      ));
      const names = {};
      await Promise.all(emails.map(async (email) => {
        if (!email) return;
        try {
          const response = await axios.get(`${API_BASE_URL}/crud/searchPlayer`, { params: { email } });
          names[email] = response.data.fullName || email;
        } catch {
          names[email] = email;
        }
      }));
      const mapped = posts.map(post => ({
        ...post,
        organizerName: names[post.organizerEmail] || post.organizerEmail,
        memberNames: (post.memberEmails || []).map(email => names[email] || email)
      }));
      setMappedPosts(mapped);
    };
    fetchNamesAndMapPosts();
  }, [posts]);

  const handleCreateEvent = () => {
    setIsEditing(true);
    setCurrentPost({
      name: '',
      description: '',
      sport: '',
      date: Date.now(),
      place: '',
      organizerEmail: user?.email || '',
      memberEmails: [user?.email || ''],
      organizerName: user?.fullName || (user?.givenName && user?.familyName) ? `${user.givenName} ${user.familyName}` : 'Unknown'
    });
  };

    const handlePostSubmit = async () => {
    if (!currentPost.name.trim() || !currentPost.description.trim()) {
      alert('Event name and description cannot be empty.');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/crud/addEvent`, currentPost);
      fetchEvents && fetchEvents();
    } catch (err) {
      console.error('Error adding event:', err);
    }
    setIsEditing(false);
  };

  return (
     <>
    <SearchBar userFullName={user?.fullName || (user?.name?.givenName && user?.name?.familyName) ? `${user.name.givenName} ${user.name.familyName}` : 'Unknown'} />
    <div className="content-wrapper">
        <div className="left-wrapper">
          <LeftSideBar />
        </div>
        <div className="main-content">
            <div className="home-buttons">
                <div className="filters">
                  <button id="sport" className="filter"><span id="icon"><FaRunning/></span><span id="title">Sport</span></button>
                  <button id="location" className="filter"><span id="icon"><IoLocationSharp/></span><span id="title">Location</span></button>
                  <button id="calendar" className="filter"><span id="icon"><IoCalendarClear /></span><span id="title">Date and Time</span></button>
                </div>
                <div className="extra">
                  <button id="createpost" onClick={handleCreateEvent}><span id="icon"><FaPlus/></span><span id="title">Create an Event</span></button>
                </div>
            </div>
            <div className="post-list">
              <PostsList
                posts={mappedPosts} isEditing={isEditing}
                setIsEditing={setIsEditing} currentPost={currentPost}
                setCurrentPost={setCurrentPost} onPostSubmit={handlePostSubmit}
              />
            </div>
        </div>
        <div className="right-wrapper"style={{marginLeft: "300px"}}>
        <RightSideBar />
        </div>
    </div>
    </>
  );
}

export default HomePage;