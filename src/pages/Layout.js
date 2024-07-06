import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../styles/styles.css'; // Import the CSS file

const Layout = () => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <nav>
        <ul>
          <li>
            <Link to="/game">Play Game</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
        </ul>
      </nav>
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
