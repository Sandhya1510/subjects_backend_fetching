
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Articles.css"

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Fetch subjects from MongoDB
  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  // Add a new subject
  const handleAddSubject = async () => {
    if (!newSubject.trim()) return;
    try {
      await axios.post("http://localhost:5000/subjects", { subjectName: newSubject });
      setNewSubject("");
      fetchSubjects();
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  // Delete a subject
  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  return (
    <div className="container">
      <h2>Subjects</h2>
      <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <input
        type="text"
        value={newSubject}
        onChange={(e) => setNewSubject(e.target.value)}
        placeholder="New Subject"
      />
      <button onClick={handleAddSubject}>Add</button>
      </div>
      
      <ul>
        {subjects.map((subject) => (
          <li key={subject._id} style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate(`/topics/${subject.subjectName}`)}>
            {subject.subjectName}
            <button onClick={(e) => { e.stopPropagation(); handleDeleteSubject(subject._id); }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Subjects;
