
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Articles.css"

// const Topics = () => {
//   const { subjectName } = useParams(); // Get subjectName from URL
//   const [topics, setTopics] = useState([]);
//   const [newTopic, setNewTopic] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (subjectName) {
//       fetchTopics();
//     }
//   }, [subjectName]);

//   // Fetch topics based on subjectName
//   const fetchTopics = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/topics/${subjectName}`);
//       console.log("Fetched topics:", response.data); // Debugging log
//       setTopics(response.data);
//     } catch (error) {
//       console.error("Error fetching topics:", error);
//     }
//   };

//   // Add new topic
//   const handleAddTopic = async () => {
//     if (!newTopic.trim()) return;
//     try {
//       await axios.post("http://localhost:5000/topics", { topicName: newTopic, subjectName });
//       setNewTopic("");
//       fetchTopics();
//     } catch (error) {
//       console.error("Error adding topic:", error);
//     }
//   };

//   // Delete a topic
//   const handleDeleteTopic = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/topics/${id}`);
//       fetchTopics();
//     } catch (error) {
//       console.error("Error deleting topic:", error);
//     }
//   };

//   // Navigate to Articles page when a topic is selected
//   const handleSelectTopic = (topicName) => {
//     navigate(`/articles/${encodeURIComponent(topicName)}`); // Pass topicName safely
//   };

//   return (
//     <div className="container">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>Topics for {subjectName}</h2>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>

//       {/* Input and Button to Add Topic */}
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <input
//           type="text"
//           value={newTopic}
//           onChange={(e) => setNewTopic(e.target.value)}
//           placeholder="New Topic"
//         />
//         <button onClick={handleAddTopic}>Add </button>

//       </div>

//       {/* List of Topics */}
//       <ul>
//         {topics.length > 0 ? (
//           topics.map((topic) => (
//             <li
//               key={topic._id}
//               style={{ cursor: "pointer", color: "blue" }}
//               onClick={() => handleSelectTopic(topic.topicName)}
//             >
//               {topic.topicName || "Unnamed Topic"}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleDeleteTopic(topic._id);
//                 }}
//               >
//                 Delete
//               </button>
//             </li>
//           ))
//         ) : (
//           <p style={{ color: "red" }}>Loading topics or no topics available.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Topics;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Topics.css";

const Topics = () => {
  const { subjectName } = useParams();
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editTopicName, setEditTopicName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (subjectName) {
      fetchTopics();
    }
  }, [subjectName]);

  const fetchTopics = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/topics/${subjectName}`);
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  };

  const handleAddTopic = async () => {
    if (!showDescriptionInput) {
      setShowDescriptionInput(true);
      return;
    }

    if (!newTopic.trim() || !newDescription.trim()) return;

    try {
      await axios.post("http://localhost:5000/topics", {
        topicName: newTopic,
        description: newDescription,
        subjectName,
      });
      setNewTopic("");
      setNewDescription("");
      setShowDescriptionInput(false);
      fetchTopics();
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };

  const handleCancelAdd = () => {
    setNewTopic("");
    setNewDescription("");
    setShowDescriptionInput(false);
  };

  const handleDeleteTopic = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/topics/${id}`);
      fetchTopics();
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const handleEdit = (topic) => {
    setEditId(topic._id);
    setEditTopicName(topic.topicName);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/topics/${editId}`, {
        topicName: editTopicName,
      });
      setEditId(null);
      setEditTopicName("");
      fetchTopics();
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditTopicName("");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Topics for {subjectName}</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
      <table className="topics-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Topic Name</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <tr key={topic._id}>
                <td>{index + 1}</td>
                <td>
                  {editId === topic._id ? (
                    <>
                      <input
                        type="text"
                        value={editTopicName}
                        onChange={(e) => setEditTopicName(e.target.value)}
                      />
                      <button onClick={handleUpdate}>Save</button>
                      <button onClick={handleCancelEdit} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <span
                      className="topic-link"
                      onClick={() => navigate(`/articles/${topic.topicName}`)}
                    >
                      {topic.topicName}
                    </span>
                  )}
                </td>
                <td>{topic.description || "-"}</td>
                <td>{new Date(topic.createdAt).toLocaleDateString()}</td>
                <td>
                  {editId !== topic._id && (
                    <>
                      <button onClick={() => handleEdit(topic)}>Edit</button>
                      <button
                        onClick={() => handleDeleteTopic(topic._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ color: "red", textAlign: "center" }}>
                No topics found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="add-topic">
        {showDescriptionInput && (
          <>
            <input
              type="text"
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="New Topic"
            />
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Enter topic description"
              rows="4"
            />
            <div className="confirmation-buttons">
              <button onClick={handleAddTopic}>Confirm Add</button>
              <button className="cancel-btn" onClick={handleCancelAdd}>
                Cancel
              </button>
            </div>
          </>
        )}

        {!showDescriptionInput && (
          <button onClick={handleAddTopic}>Add</button>
        )}
      </div>

    </div>
  );
};

export default Topics;
