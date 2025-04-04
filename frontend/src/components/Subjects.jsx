
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Articles.css"

// const Subjects = () => {
//   const [subjects, setSubjects] = useState([]);
//   const [newSubject, setNewSubject] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   // Fetch subjects from MongoDB
//   const fetchSubjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/subjects");
//       setSubjects(response.data);
//     } catch (error) {
//       console.error("Error fetching subjects:", error);
//     }
//   };

//   // Add a new subject
//   const handleAddSubject = async () => {
//     if (!newSubject.trim()) return;
//     try {
//       await axios.post("http://localhost:5000/subjects", { subjectName: newSubject });
//       setNewSubject("");
//       fetchSubjects();
//     } catch (error) {
//       console.error("Error adding subject:", error);
//     }
//   };

//   // Delete a subject
//   const handleDeleteSubject = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/subjects/${id}`);
//       fetchSubjects();
//     } catch (error) {
//       console.error("Error deleting subject:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Subjects</h2>
//       <div  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//       <input
//         type="text"
//         value={newSubject}
//         onChange={(e) => setNewSubject(e.target.value)}
//         placeholder="New Subject"
//       />
//       <button onClick={handleAddSubject}>Add</button>
//       </div>

//       <ul>
//         {subjects.map((subject) => (
//           <li key={subject._id} style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate(`/topics/${subject.subjectName}`)}>
//             {subject.subjectName}
//             <button onClick={(e) => { e.stopPropagation(); handleDeleteSubject(subject._id); }}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Subjects;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Subjects.css";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [editId, setEditId] = useState(null);
  const [editSubjectName, setEditSubjectName] = useState("");
  const navigate = useNavigate();
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newDescription, setNewDescription] = useState("");


  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  };

  const handleAddSubject = async () => {
    if (!showDescriptionInput) {
      setShowDescriptionInput(true);
      return;
    }

    if (!newSubject.trim() || !newDescription.trim()) return "True";

    try {
      await axios.post("http://localhost:5000/subjects", {
        subjectName: newSubject,
        description: newDescription,
      });
      setNewSubject("");
      setNewDescription("");
      setShowDescriptionInput(false);
      fetchSubjects();
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };

  const handleCancelAdd = () => {
    setNewSubject("");
    setNewDescription("");
    setShowDescriptionInput(false);
  };

  const handleDeleteSubject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/subjects/${id}`);
      fetchSubjects();
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  const handleEdit = (subject) => {
    setEditId(subject._id);
    setEditSubjectName(subject.subjectName);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/subjects/${editId}`, {
        subjectName: editSubjectName,
      });
      setEditId(null);
      setEditSubjectName("");
      fetchSubjects();
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditSubjectName("");
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Subjects</h2>
        {/* <div className="add-subject">
          {showDescriptionInput && (
            <>
              <input
                type="text"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="New Subject"
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Enter subject description"
                rows="4"
              />
              <div className="confirmation-buttons">
                <button onClick={handleAddSubject}>Confirm Add</button>
                <button className="cancel-btn" onClick={handleCancelAdd}>Cancel</button>
              </div>
            </>
          )}

          {!showDescriptionInput && (
            <button onClick={handleAddSubject}>Add</button>
          )}
        </div> */}

        <div className="add-subject">
          <button onClick={() => setShowDescriptionInput(true)}>Add</button>
          {showDescriptionInput && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add New Subject</h3>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="New Subject"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Enter subject description"
                  rows="4"
                />
                <div className="confirmation-buttons">
                  <button onClick={handleAddSubject}>Confirm Add</button>
                  <button className="cancel-btn" onClick={handleCancelAdd}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <table className="subjects-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Subject Name</th>
            <th>Description</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject, index) => (
            <tr key={subject._id}>
              <td>{index + 1}</td>
              <td>
                {editId === subject._id ? (
                  <>
                    <input
                      type="text"
                      value={editSubjectName}
                      onChange={(e) => setEditSubjectName(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={handleCancelEdit} className="cancel-btn">
                      Cancel
                    </button>
                  </>
                ) : (
                  <span
                    className="subject-link"
                    onClick={() => navigate(`/topics/${subject.subjectName}`)}
                  >
                    {subject.subjectName}
                  </span>
                )}
              </td>
              <td>{subject.description || "-"}</td>
              <td>{new Date(subject.createdAt).toLocaleDateString()}</td>
              <td>
                {editId !== subject._id && (
                  <>
                    <button onClick={() => handleEdit(subject)}>Edit</button>
                    <button
                      onClick={() => handleDeleteSubject(subject._id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>



    </div>
  );
};

export default Subjects;
