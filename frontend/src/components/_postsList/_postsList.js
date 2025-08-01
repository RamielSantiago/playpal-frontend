import Post from '../_post/_post.js';

const PostsList = ({ user, posts, isEditing, setIsEditing, currentPost, setCurrentPost, onPostSubmit  }) => {
  return (
      <div className="Cards-List">
        {isEditing ? (
          <Post post={currentPost} isEditing={true}
            onInputChange={(field, value) => {
              setCurrentPost({ ...currentPost, [field]: value });
            }}
            onPostSubmit={onPostSubmit}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          posts.length === 0 ? (
            <div>No events yet!</div>
          ) : (
            posts.map((post, index) => (
              <Post key={index} post={post} />
            ))
          )
        )}
    </div>
  );
};

export default PostsList;
