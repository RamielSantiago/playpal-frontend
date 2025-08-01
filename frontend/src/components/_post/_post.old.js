import './_post.css';
import { FaThumbsUp, FaThumbsDown, FaBookmark } from 'react-icons/fa';

const Post = ({ post, isEditing, onInputChange, onPostSubmit, onCancel }) => {
  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-title">{post.name}</h3>
        <div className="post-user">
          <div className="user-left">
            <img src="/user-placeholder.svg" alt="Profile" className="profile-pic" />
            <span className="username">{post.organizerName}</span>
          </div>
          <div className="inline-tags">
            <span className="tag">{post.sport}</span>
            <span className="tag">{post.place}</span>
            <span className="tag">{new Date(post.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
      <div className="post-body">
        {isEditing ? (
          <div className="form-rows">
            <div className="form-row">
              <div className="form-label">Event Name</div>
              <input type="text" value={post.name}
                onChange={(e) => onInputChange('name', e.target.value)}
                placeholder="Enter event name"
                className="post-title-input"
              />
            </div>
            <div className="form-row">
              <div className="form-label">Description</div>
              <textarea value={post.description}
                onChange={(e) => onInputChange('description', e.target.value)}
                placeholder="Enter event description"
                className="post-text-input"
              />
            </div>
            <div className="form-row">
              <div className="form-label">Sport</div>
              <input type="text" value={post.sport}
                onChange={(e) => onInputChange('sport', e.target.value)}
                placeholder="Enter sport"
                className="post-tags-input"
              />
            </div>
            <div className="form-row">
              <div className="form-label">Place</div>
              <input type="text" value={post.place}
                onChange={(e) => onInputChange('place', e.target.value)}
                placeholder="Enter place"
                className="post-tags-input"
              />
            </div>
            <div className="form-row">
              <div className="form-label">Date</div>
              <input type="date"
                value={typeof post.date === 'string' && post.date.match(/^\d{4}-\d{2}-\d{2}$/) ? post.date : (post.date ? new Date(post.date).toISOString().slice(0, 10) : '')}
                onChange={(e) => onInputChange('date', e.target.value)}
                className="post-title-input"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="post-text">
              {post.description}
            </p>
            <div className="post-members">
              {/*move this somewhere else*/}
              Members:{post.memberNames.join(', ')}
            </div>
          </div>
        )}
      </div>
      <div className="post-footer">
        {isEditing ? (
          <div className="form-buttons">
            <button onClick={onCancel} className="post-button">Cancel</button>
            <button onClick={onPostSubmit} className="post-button">Post</button>
          </div>
        ) : (
          <div className="post-votes">
            
          </div>
        )}
        <span><FaBookmark className="bookmark-icon" /></span>
      </div>
    </div>
  );
};

export default Post;
