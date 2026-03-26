// components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/trending">Trending</Link>
        </li>
        <li>
          <Link to="/subscriptions">Subscriptions</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;