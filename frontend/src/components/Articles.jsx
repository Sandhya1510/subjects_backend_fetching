// import React, { useState, useEffect } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Articles.css";

// const Articles = () => {
//   const { topicName } = useParams();
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [newArticle, setNewArticle] = useState({ title: "", subjectName: "", content: "" });
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetchArticles();
//   }, [topicName]);

//   // Fetch articles based on topicName
//   const fetchArticles = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:5000/articles?topicName=${topicName}`);
//       setArticles(response.data);
//     } catch (err) {
//       setError("Error fetching articles.");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add new article
//   const handleAddArticle = async () => {
//     if (!newArticle.title.trim() || !newArticle.subjectName.trim() || !newArticle.descriptin.trim()) return;
//     try {
//       await axios.post("http://localhost:5000/articles", { ...newArticle, topicName });
//       setNewArticle({ title: "", subjectName: "", descriptin: "" });
//       fetchArticles();
//     } catch (error) {
//       console.error("Error adding article:", error);
//     }
//   };

//   // Delete article
//   const handleDeleteArticle = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/articles/${id}`);
//       fetchArticles();
//     } catch (error) {
//       console.error("Error deleting article:", error);
//     }
//   };


//   return (
//     <div>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>Articles for Topic: {topicName}</h2>
//         <button onClick={() => navigate(-1)}>Go Back</button>
//       </div>

//       {loading && <p>Loading articles...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       <div style={{display:"grid"}}>
//         <input
//           type="text"
//           placeholder="Title"
//           value={newArticle.title}
//           onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Subject"
//           value={newArticle.subjectName}
//           onChange={(e) => setNewArticle({ ...newArticle, subjectName: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Topic"
//           value={newArticle.topicName}
//           onChange={(e) => setNewArticle({ ...newArticle, topicName: e.target.value })}
//         />

//         <textarea
//           placeholder="Description"
//           value={newArticle.descriptin}
//           onChange={(e) => setNewArticle({ ...newArticle, descriptin: e.target.value })}
//         ></textarea>
//         <button onClick={handleAddArticle}>Add Article</button>
//       </div>

//       {/* List Articles */}
//       <ul>
//         {articles.length > 0 ? (
//           articles.map((article) => (
//             <li key={article._id}>
//               <p><strong>Title:</strong> {article.title}</p>
//               <p><strong>Subject:</strong> {article.subjectName}</p>
//               <p><strong>Topic:</strong> {article.topicName}</p>
//               <p><strong>Description:</strong> {article.description}</p>
//               <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
//             </li>
//           ))
//         ) : (
//           <p style={{ color: "red" }}>No articles available.</p>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Articles;



// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./Subjects.css";

// const Articles = () => {
//   const { topicName } = useParams();
//   const [articles, setArticles] = useState([]);
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescription, setNewDescription] = useState("");
//   const [showDescriptionInput, setShowDescriptionInput] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [editTitle, setEditTitle] = useState("");

//   useEffect(() => {
//     if (topicName) {
//       fetchArticles();
//     }
//   }, [topicName]);

//   const fetchArticles = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/articles/${topicName}`);
//       setArticles(response.data);
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     }
//   };

//   const handleAddArticle = async () => {
//     if (!showDescriptionInput) {
//       setShowDescriptionInput(true);
//       return;
//     }

//     if (!newTitle.trim() || !newDescription.trim()) return;

//     try {
//       await axios.post("http://localhost:5000/articles", {
//         title: newTitle,
//         description: newDescription,
//         topicName,
//       });
//       setNewTitle("");
//       setNewDescription("");
//       setShowDescriptionInput(false);
//       fetchArticles();
//     } catch (error) {
//       console.error("Error adding Article:", error);
//     }
//   };

//   const handleCancelAdd = () => {
//     setNewTitle("");
//     setNewDescription("");
//     setShowDescriptionInput(false);
//   };

//   const handleDeleteArticle = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/articles/${id}`);
//       fetchArticles();
//     } catch (error) {
//       console.error("Error deleting Article:", error);
//     }
//   };

//   const handleEdit = (article) => {
//     setEditId(article._id);
//     setEditTitle(article.title);
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:5000/articles/${editId}`, {
//         title: editTitle,
//       });
//       setEditId(null);
//       setEditTitle("");
//       fetchArticles();
//     } catch (error) {
//       console.error("Error updating Article:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     setEditTitle("");
//   };

//   return (
//     <div className="container">
//       <h2>Articles for {topicName}</h2>

//       <div className="add-subject">
//         <input
//           type="text"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//           placeholder="New Article Title"
//         />

//         {showDescriptionInput ? (
//           <>
//             <textarea
//               value={newDescription}
//               onChange={(e) => setNewDescription(e.target.value)}
//               placeholder="Enter article description"
//               rows="4"
//             />
//             <div className="confirmation-buttons">
//               <button onClick={handleAddArticle}>Confirm Add</button>
//               <button className="cancel-btn" onClick={handleCancelAdd}>
//                 Cancel
//               </button>
//             </div>
//           </>
//         ) : (
//           <button onClick={handleAddArticle}>Add</button>
//         )}
//       </div>

//       <table className="subjects-table">
//         <thead>
//           <tr>
//             <th>#</th>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Created Date</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {articles.length > 0 ? (
//             articles.map((article, index) => (
//               <tr key={article._id}>
//                 <td>{index + 1}</td>
//                 <td>
//                   {editId === article._id ? (
//                     <>
//                       <input
//                         type="text"
//                         value={editTitle}
//                         onChange={(e) => setEditTitle(e.target.value)}
//                       />
//                       <button onClick={handleUpdate}>Save</button>
//                       <button onClick={handleCancelEdit} className="cancel-btn">
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     article.title
//                   )}
//                 </td>
//                 <td>{article.description || "-"}</td>
//                 <td>{new Date(article.createdAt).toLocaleDateString()}</td>
//                 <td>
//                   {editId !== article._id && (
//                     <>
//                       <button onClick={() => handleEdit(article)}>Edit</button>
//                       <button
//                         onClick={() => handleDeleteArticle(article._id)}
//                         className="delete-btn"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" style={{ color: "red", textAlign: "center" }}>
//                 No articles found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Articles;


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Articles.css";

const Articles = () => {
  const { topicName } = useParams();
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: "", subjectName: "", description: "" });
  const [showInputs, setShowInputs] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editArticle, setEditArticle] = useState({ title: "", subjectName: "", description: "" });
  const navigate = useNavigate();
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    fetchArticles();
  }, [topicName]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/articles?topicName=${topicName}`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // const handleAddClick = () => {
  //   setShowInputs(true);
  // };

  const handleAddArticle = async () => {
    if (!newArticle.title.trim() || !newArticle.subjectName.trim() || !newArticle.description.trim()) return;

    try {
      await axios.post("http://localhost:5000/articles", { ...newArticle, topicName });
      // setNewArticle({ title: "", subjectName: "", description: "" });
      setNewArticle(" ");
      setShowDescriptionInput(false);
      setShowInputs(false);
      fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  // const handleCancelAdd = () => {
  //   setShowInputs(false);
  //   setNewArticle({ title: "", subjectName: "", description: "" });
  // };
  const handleCancelAdd = () => {
    setShowInputs(false);
    setNewArticle(" ");
    setShowDescriptionInput(false);
  };

  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleEdit = (article) => {
    setEditId(article._id);
    setEditArticle({
      title: article.title,
      subjectName: article.subjectName,
      description: article.description,
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/articles/${editId}`, editArticle);
      setEditId(null);
      setEditArticle({ title: "", subjectName: "", description: "" });
      fetchArticles();
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditArticle({ title: "", subjectName: "", description: "" });
  };

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Articles for Topic: {topicName}</h2>
        <div className="add-article">
          <button onClick={() => setShowDescriptionInput(true)}>Add</button>
          {showDescriptionInput && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h3>Add New Article</h3>
                <input
                  type="text"
                  placeholder="Title"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={newArticle.subjectName}
                  onChange={(e) => setNewArticle({ ...newArticle, subjectName: e.target.value })}
                />
                <textarea
                  placeholder="Description"
                  value={newArticle.description}
                  onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
                  rows="4"
                />
                <div className="confirmation-buttons">
                  <button onClick={handleAddArticle}>Confirm Add</button>
                  <button className="cancel-btn" onClick={handleCancelAdd}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <table className="articles-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <tr key={article._id}>
                <td>{index + 1}</td>
                <td>
                  {editId === article._id ? (
                    <input
                      type="text"
                      value={editArticle.title}
                      onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
                    />
                  ) : (
                    article.title
                  )}
                </td>
                <td>
                  {editId === article._id ? (
                    <textarea
                      value={editArticle.description}
                      onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })}
                      rows="2"
                    />
                  ) : (
                    article.description
                  )}
                </td>
                <td>
                  {editId === article._id ? (
                    <>
                      <button onClick={handleUpdate}>Save</button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(article)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDeleteArticle(article._id)}>
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
                No articles available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <div className="add-article">
        {showInputs && (
          <>
            <input
              type="text"
              placeholder="Title"
              value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              value={newArticle.subjectName}
              onChange={(e) => setNewArticle({ ...newArticle, subjectName: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newArticle.description}
              onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
              rows="4"
            />
            <div className="confirmation-buttons">
              <button onClick={handleAddArticle}>Confirm Add</button>
              <button className="cancel-btn" onClick={handleCancelAdd}>
                Cancel
              </button>
            </div>
          </>
        )}
        {!showInputs && <button onClick={handleAddClick}>Add</button>}
      </div> */}
    </div>
  );
};

export default Articles;
