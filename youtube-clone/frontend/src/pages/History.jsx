// pages/History.jsx
import React from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";

const History = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <main className="main-content">
        <h2>History</h2>
        <p>Previously watched videos will appear here.</p>
      </main>
    </>
  );
};

export default History;