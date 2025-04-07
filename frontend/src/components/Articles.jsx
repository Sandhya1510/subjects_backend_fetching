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


// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Articles.css";

// const Articles = () => {
//   const { topicName } = useParams();
//   const [articles, setArticles] = useState([]);
//   const [newArticle, setNewArticle] = useState({ title: "", subjectName: "", description: "" });
//   const [showInputs, setShowInputs] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [editArticle, setEditArticle] = useState({ title: "", subjectName: "", description: "" });
//   const navigate = useNavigate();
//   const [showDescriptionInput, setShowDescriptionInput] = useState(false);


//   useEffect(() => {
//     fetchArticles();
//   }, [topicName]);

//   const fetchArticles = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/articles?topicName=${topicName}`);
//       setArticles(response.data);
//     } catch (error) {
//       console.error("Error fetching articles:", error);
//     }
//   };

//   // const handleAddClick = () => {
//   //   setShowInputs(true);
//   // };

//   const handleAddArticle = async () => {
//     if (!newArticle.title.trim() || !newArticle.subjectName.trim() || !newArticle.description.trim()) return;

//     try {
//       await axios.post("http://localhost:5000/articles", { ...newArticle, topicName });
//       // setNewArticle({ title: "", subjectName: "", description: "" });
//       setNewArticle(" ");
//       setShowDescriptionInput(false);
//       setShowInputs(false);
//       fetchArticles();
//     } catch (error) {
//       console.error("Error adding article:", error);
//     }
//   };

//   // const handleCancelAdd = () => {
//   //   setShowInputs(false);
//   //   setNewArticle({ title: "", subjectName: "", description: "" });
//   // };
//   const handleCancelAdd = () => {
//     setShowInputs(false);
//     setNewArticle(" ");
//     setShowDescriptionInput(false);
//   };

//   const handleDeleteArticle = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/articles/${id}`);
//       fetchArticles();
//     } catch (error) {
//       console.error("Error deleting article:", error);
//     }
//   };

//   const handleEdit = (article) => {
//     setEditId(article._id);
//     setEditArticle({
//       title: article.title,
//       subjectName: article.subjectName,
//       description: article.description,
//     });
//   };

//   const handleUpdate = async () => {
//     try {
//       await axios.put(`http://localhost:5000/articles/${editId}`, editArticle);
//       setEditId(null);
//       setEditArticle({ title: "", subjectName: "", description: "" });
//       fetchArticles();
//     } catch (error) {
//       console.error("Error updating article:", error);
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditId(null);
//     setEditArticle({ title: "", subjectName: "", description: "" });
//   };

//   return (
//     <div className="container">
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <h2>Articles for Topic: {topicName}</h2>
//         <div className="add-article">
//           <button onClick={() => setShowDescriptionInput(true)}>Add</button>
//           {showDescriptionInput && (
//             <div className="modal-overlay">
//               <div className="modal-content">
//                 <h3>Add New Article</h3>
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={newArticle.title}
//                   onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Subject"
//                   value={newArticle.subjectName}
//                   onChange={(e) => setNewArticle({ ...newArticle, subjectName: e.target.value })}
//                 />
//                 <textarea
//                   placeholder="Description"
//                   value={newArticle.description}
//                   onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
//                   rows="4"
//                 />
//                 <div className="confirmation-buttons">
//                   <button onClick={handleAddArticle}>Confirm Add</button>
//                   <button className="cancel-btn" onClick={handleCancelAdd}>
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       <table className="articles-table">
//         <thead>
//           <tr>
//             <th>S.No</th>
//             <th>Title</th>
//             <th>Description</th>
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
//                     <input
//                       type="text"
//                       value={editArticle.title}
//                       onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
//                     />
//                   ) : (
//                     article.title
//                   )}
//                 </td>
//                 <td>
//                   {editId === article._id ? (
//                     <textarea
//                       value={editArticle.description}
//                       onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })}
//                       rows="2"
//                     />
//                   ) : (
//                     article.description
//                   )}
//                 </td>
//                 <td>
//                   {editId === article._id ? (
//                     <>
//                       <button onClick={handleUpdate}>Save</button>
//                       <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
//                     </>
//                   ) : (
//                     <>
//                       <button onClick={() => handleEdit(article)}>Edit</button>
//                       <button className="delete-btn" onClick={() => handleDeleteArticle(article._id)}>
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" style={{ textAlign: "center", color: "red" }}>
//                 No articles available.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//       {/* <div className="add-article">
//         {showInputs && (
//           <>
//             <input
//               type="text"
//               placeholder="Title"
//               value={newArticle.title}
//               onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
//             />
//             <input
//               type="text"
//               placeholder="Subject"
//               value={newArticle.subjectName}
//               onChange={(e) => setNewArticle({ ...newArticle, subjectName: e.target.value })}
//             />
//             <textarea
//               placeholder="Description"
//               value={newArticle.description}
//               onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
//               rows="4"
//             />
//             <div className="confirmation-buttons">
//               <button onClick={handleAddArticle}>Confirm Add</button>
//               <button className="cancel-btn" onClick={handleCancelAdd}>
//                 Cancel
//               </button>
//             </div>
//           </>
//         )}
//         {!showInputs && <button onClick={handleAddClick}>Add</button>}
//       </div> */}
//     </div>
//   );
// };

// export default Articles;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Articles.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const Articles = () => {
  const { topicName } = useParams();
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({ title: "", subjectName: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [editArticle, setEditArticle] = useState({ title: "", subjectName: "", description: "" });
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [topicName]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/articles?topicName=${topicName}`);
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Failed to fetch articles.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddArticle = async () => {
    if (!newArticle.title.trim() || !newArticle.subjectName.trim() || !newArticle.description.trim()) {
      alert("All fields are required!");
      return;
    }

    try {
      await axios.post("http://localhost:5000/articles", { ...newArticle, topicName });
      setNewArticle({ title: "", subjectName: "", description: "" });
      setShowDescriptionInput(false);
      fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error);
      alert("Failed to add article.");
    }
  };

  const handleCancelAdd = () => {
    setShowDescriptionInput(false);
    setNewArticle({ title: "", subjectName: "", description: "" });
  };

  const confirmDeleteArticle = (id) => {
    setArticleToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteArticle = async () => {
    try {
      await axios.delete(`http://localhost:5000/articles/${articleToDelete}`);
      setShowDeleteConfirm(false);
      setArticleToDelete(null);
      fetchArticles(); 
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Failed to delete article.");
    }
  };

  const handleEdit = (article) => {
    setEditId(article._id);
    setEditArticle({
      title: article.title,
      subjectName: article.subjectName,
      description: article.description,
    });
    setShowEditPopup(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/articles/${editId}`, editArticle);
      setEditId(null);
      setEditArticle({ title: "", subjectName: "", description: "" });
      setShowEditPopup(false);
      fetchArticles();
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article.");
    }
  };

  const handleCancelEdit = () => {
    setEditId(null);
    setEditArticle({ title: "", subjectName: "", description: "" });
    setShowEditPopup(false);
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Articles for Topic: {topicName}</h2>
        <button onClick={() => setShowDescriptionInput(true)}>Add</button>
      </div>

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
              <button className="cancel-btn" onClick={handleCancelAdd}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Article</h3>
            <input
              type="text"
              value={editArticle.title}
              onChange={(e) => setEditArticle({ ...editArticle, title: e.target.value })}
            />
            <input
              type="text"
              value={editArticle.subjectName}
              onChange={(e) => setEditArticle({ ...editArticle, subjectName: e.target.value })}
            />
            <textarea
              value={editArticle.description}
              onChange={(e) => setEditArticle({ ...editArticle, description: e.target.value })}
              rows="4"
            />
            <div className="confirmation-buttons">
              <button onClick={handleUpdate}>Save</button>
              <button className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <table className="articles-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Title</th>
              <th>Description</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.description}</td>
                  <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                  <td>
                    <FaEdit
                      className="icon-btn edit-icon"
                      onClick={() => handleEdit(article)}
                      title="Edit"
                    />
                    <FaTrashAlt
                      className="icon-btn delete-icon"
                      onClick={() => confirmDeleteArticle(article._id)}
                      title="Delete"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "red" }}>
                  No articles available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete?</h3>
            <div className="confirmation-buttons">
              <button onClick={handleDeleteArticle}>Yes, Delete</button>
              <button onClick={() => setShowDeleteConfirm(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;
