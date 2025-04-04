
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Articles.css"

const Topics = () => {
  const { subjectName } = useParams(); // Get subjectName from URL
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (subjectName) {
      fetchTopics();
    }
  }, [subjectName]);

  // Fetch topics based on subjectName
  const fetchTopics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/topics/${subjectName}`);
      console.log("Fetched topics:", response.data); // Debugging log
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  // Add new topic
  const handleAddTopic = async () => {
    if (!newTopic.trim()) return;
    try {
      await axios.post("http://localhost:5000/topics", { topicName: newTopic, subjectName });
      setNewTopic("");
      fetchTopics();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  // Delete a topic
  const handleDeleteTopic = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/topics/${id}`);
      fetchTopics();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  // Navigate to Articles page when a topic is selected
  const handleSelectTopic = (topicName) => {
    navigate(`/articles/${encodeURIComponent(topicName)}`); // Pass topicName safely
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Topics for {subjectName}</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>

      {/* Input and Button to Add Topic */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="New Topic"
        />
        <button onClick={handleAddTopic}>Add </button>

      </div>

      {/* List of Topics */}
      <ul>
        {topics.length > 0 ? (
          topics.map((topic) => (
            <li
              key={topic._id}
              style={{ cursor: "pointer", color: "blue" }}
              onClick={() => handleSelectTopic(topic.topicName)}
            >
              {topic.topicName || "Unnamed Topic"}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTopic(topic._id);
                }}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p style={{ color: "red" }}>Loading topics or no topics available.</p>
        )}
      </ul>
    </div>
  );
};

export default Topics;


