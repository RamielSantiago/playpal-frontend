import './Profile.css';
import { useState, useEffect } from 'react';
import { useUser } from '../../hooks/useUser.js';
import { API_BASE_URL } from '../../config.js';
import axios from 'axios';
import PostsList from '../../components/_postsList/_postsList.js';
import SearchBar from '../../components/_searchBar/_searchBar.js';
import LeftSideBar from '../../components/_leftSideBar/_leftSideBar.js';
import RightSideBar from '../../components/_rightSideBar/_rightSideBar.js';
import { FaEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

function ProfilePage() {
  const { user, loading, error } = useUser();
  const [posts, setPosts] = useState([]);
  const [mappedPosts, setMappedPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const userName = (user?.givenName + '\'s') || 'Your';
  const fullName = user?.fullName || (user?.givenName && user?.familyName ? `${user.givenName} ${user.familyName}` : 'Not available');

    useEffect(() => {
        if (user && user.emails && user.emails.length > 0) {
            fetchUserEvents();
        }
    }, [user]);

  const fetchUserEvents = async () => {
      try {
          const response = await axios.get(`${API_BASE_URL}/crud/eventlist`);
          setPosts(response.data);
          // Filter events joined or created by user
          const userEvents = response.data.filter(
              event => event.organizerEmail === user?.emails?.[0]?.value || 
                       event.memberEmails.includes(user?.emails?.[0]?.value)
          );
          setPosts(userEvents);
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
      organizerEmail: user?.emails?.[0]?.value || '',
      memberEmails: [user?.emails?.[0]?.value || ''],
      organizerName: fullName
    });
  };

    const handlePostSubmit = async () => {
    if (!currentPost.name.trim() || !currentPost.description.trim()) {
      alert('Event name and description cannot be empty.');
      return;
    }
    try {
      await axios.post(`${API_BASE_URL}/crud/addEvent`, currentPost);
      fetchUserEvents && fetchUserEvents();
    } catch (err) {
      console.error('Error adding event:', err);
    }
    setIsEditing(false);
  };

  return (
    <>
      <SearchBar userFullName={fullName} />
      <div className="content-wrapper">
        <div className="left-wrapper">
          <LeftSideBar />
        </div>
        <div className="main-content">
          <div className="user-ewrapper">
            <div className="user-wrapper">
              <div id="user-image" alt="Profile" className="profile-pic"></div>
              <div id="user-content">
                <div className="username">
                  <h2>{fullName}</h2>
                </div>
                <div className="tags">
                  {/* Change these to joined/created sports */}
                  <span>Basketball</span><span>Badminton</span>
                </div>
                <div className="bio">
                  {/* Change to bio 
                  {user?.bio || 'No bio available'}*/}
                  Baller<br/>
                  God is LOVE<br/>
                  Animo La Salle!<br/>
                </div>
              </div>
              <div id="user-edit"><FaEdit /></div>
            </div>
          </div>
          <div className="home-buttons">
            <div className="user-post-title">
              {userName} Events
            </div>
            <div className="extra">
              <button id="createpost" onClick={handleCreateEvent}><span id="icon"><FaPlus/></span><span id="title">Create an Event</span></button>
            </div>
          </div>
          <div className="post-list">
              <PostsList
                user={user} posts={mappedPosts} isEditing={isEditing}
                setIsEditing={setIsEditing} currentPost={currentPost}
                setCurrentPost={setCurrentPost} onPostSubmit={handlePostSubmit}
              />
          </div>
        </div>
        <div className="right-wrapper" style={{ marginLeft: "300px" }}>
          <RightSideBar />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;