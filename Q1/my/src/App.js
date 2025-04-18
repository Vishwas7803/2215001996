import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TopUsers from './pages/TopUsers';
import TrendingPosts from './pages/TrendingPosts';
import Feed from '../pages/Feed';

function App() {
  return (
    <Router>
      <div>
        <h1>Social Media Analytics</h1>
        <nav>
          <ul>
            <li><a href="/">Feed</a></li>
            <li><a href="/top-users">Top Users</a></li>
            <li><a href="/trending-posts">Trending Posts</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/top-users" element={<TopUsers />} />
          <Route path="/trending-posts" element={<TrendingPosts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
