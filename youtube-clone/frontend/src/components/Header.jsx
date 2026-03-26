// components/Header.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    alert("Search: " + query);
  };

  return (
    <header className="header">
      <div className="logo">YouTube Clone</div>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <button onClick={() => navigate("/signin")} className="sign-in-btn">
        Sign In
      </button>
    </header>
  );
};

export default Header;