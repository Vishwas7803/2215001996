import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('https://api.socialmedia.com/posts');
      setPosts(response.data);
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000); // Fetch posts every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h2>Feed</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <img src={`https://source.unsplash.com/random/200x200/?post-${post.id}`} alt="Post" />
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Comments:</strong> {post.comments.length}</p>
          </div>
        ))
      ) : (
        <p>Loading posts...</p>
      )}
    </div>
  );
};

export default Feed;
