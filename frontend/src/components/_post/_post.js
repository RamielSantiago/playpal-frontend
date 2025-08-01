import './_post.css';
import { GoKebabHorizontal } from "react-icons/go";
import { IoCalendarClear, IoPeople } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { FaClock } from "react-icons/fa";

function Post({ post, isEditing, onInputChange, onPostSubmit, onCancel }) {
  console.log(post);
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const datePart = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric'
    });
    const timePart = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
    return (
      <><IoCalendarClear />&nbsp;{datePart}&nbsp;&nbsp;
        <FaClock />&nbsp;{timePart}</>
    );
  };

  const currentPlayers = post.memberNames?.length || 0;
  const maxPlayers = 5; // assume 5 max players for now
  const isFull = currentPlayers >= maxPlayers;

  if (isEditing) {
    return (
      <div className="post-wrapper">
        <div className="post-header">
          <div className="left-header">
            <div className="form-rows">
              <div className="form-row">
                <input
                  type="text"
                  value={post.name}
                  onChange={(e) => onInputChange('name', e.target.value)}
                  placeholder="Event Name"
                  className="post-title-input"
                />
              </div>
              <div className="form-row details">
                <input
                  type="text"
                  value={post.sport}
                  onChange={(e) => onInputChange('sport', e.target.value)}
                  placeholder="Sport"
                  className="post-tag-input"
                />
                <input
                  type="text"
                  value={post.place}
                  onChange={(e) => onInputChange('place', e.target.value)}
                  placeholder="Location"
                  className="post-tag-input"
                />
                <input
                  type="datetime-local"
                  value={post.date ? new Date(new Date(post.date).getTime() - (new Date(post.date).getTimezoneOffset() * 60000)).toISOString().slice(0, 16) : ''}
                  onChange={(e) => onInputChange('date', e.target.value)}
                  className="post-date-input"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="post-profile">
          <div className="post-profileimg"></div>
          <div className="post-name">{post.organizerName || 'You'}</div>
        </div>
        <div className="post-content">
          <textarea
            value={post.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Event description..."
            className="post-textarea"
          />
        </div>
        <div className="post-footer">
          <div className="form-buttons">
            <button onClick={onCancel} className="post-button">Cancel</button>
            <button onClick={onPostSubmit} className="post-button">Post</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="post-wrapper">
      <div className="post-header">
        <div className="left-header">
          <div className="post-title"><h2>{post.name}</h2></div>
          <div className="details">
            <span>{post.sport}</span>
            <span>{post.place}</span>
            <span>
              {formatDate(post.date)}
            </span>
          </div>
        </div>
        <div className="right-header">
                 <div className="post-date">{formatDate(post.date)}</div> {/*change data to created date*/}
          <div className="post-view"><GoKebabHorizontal/></div> 
        </div>
      </div>
      <div className="post-profile">
        <div className="post-profileimg"></div>
        <div className="post-name">{post.organizerName || 'Unknown User'}</div>
      </div>
      <div className="post-content">{post.description}</div>
      <div className="post-footer">
        <div className="post-buttons">
              <button className={`post-message ${isFull ? 'active' : ''}`}><FaPlus/>&nbsp;&nbsp;Join Event</button>
        </div>
        <div className="post-model">
              <button className={`player_count ${isFull ? 'active' : ''}`}><IoPeople />{isFull ? 'FULL' : `${currentPlayers} / ${maxPlayers}`}</button>
        </div>
      </div>
    </div>
    )
};

export default Post;
