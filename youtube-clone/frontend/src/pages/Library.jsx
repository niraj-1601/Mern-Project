// pages/Library.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const Library = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main-content">
        <h2>Library</h2>
        <p>Saved videos will appear here.</p>
      </main>
    </>
  );
};

export default Library;