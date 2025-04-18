import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchTopUsers = async () => {
      const response = await axios.get('https://api.socialmedia.com/users');
      const userPostData = response.data;

      const usersWithMostComments = userPostData
        .map((user) => ({
          ...user,
          commentCount: user.posts.reduce((sum, post) => sum + post.comments.length, 0),
        }))
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5);

      setTopUsers(usersWithMostComments);
    };

    fetchTopUsers();
  }, []);

  return (
    <div>
      <h2>Top Users</h2>
      {topUsers.length > 0 ? (
        topUsers.map((user) => (
          <div key={user.id}>
            <h3>{user.name}</h3>
            <p>Comments Count: {user.commentCount}</p>
          </div>
        ))
      ) : (
        <p>Loading top users...</p>
      )}
    </div>
  );
};

export default TopUsers;
