import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      const response = await axios.get('https://api.socialmedia.com/posts');
      const posts = response.data;

      const maxComments = Math.max(...posts.map(post => post.comments.length));
      const trending = posts.filter(post => post.comments.length === maxComments);

      setTrendingPosts(trending);
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <h2>Trending Posts</h2>
      {trendingPosts.length > 0 ? (
        trendingPosts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p><strong>Comments:</strong> {post.comments.length}</p>
          </div>
        ))
      ) : (
        <p>Loading trending posts...</p>
      )}
    </div>
  );
};

export default TrendingPosts;
