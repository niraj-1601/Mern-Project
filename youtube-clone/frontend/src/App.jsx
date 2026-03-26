// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Trending from "./pages/Trending.jsx";
import Subscriptions from "./pages/Subscriptions.jsx";
import Library from "./pages/Library.jsx";
import History from "./pages/History.jsx";
import SignIn from "./pages/SignIn.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/library" element={<Library />} />
      <Route path="/history" element={<History />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;