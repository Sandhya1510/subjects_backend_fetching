import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Subjects from "./components/Subjects";
import Topics from "./components/Topics";
import Articles from "./components/Articles";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Subjects />} />
        <Route path="/topics/:subjectName" element={<Topics />} />
        {/* <Route path="/articles/:subjectName" element={<Articles />} /> */}
        <Route path="/articles/:topicName" element={<Articles />} />
      </Routes>
    </Router>
  );
};

export default App;

