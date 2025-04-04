
import React, { useState, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import "./Articles.css";

const Articles = () => {
  const { topicName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newArticle, setNewArticle] = useState({ title: "", subjectName: "", content: "" });
  const navigate = useNavigate();
  useEffect(() => {
    fetchArticles();
  }, [topicName]);

  // Fetch articles based on topicName
  const fetchArticles = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/articles?topicName=${topicName}`);
      setArticles(response.data);
    } catch (err) {
      setError("Error fetching articles.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add new article
  const handleAddArticle = async () => {
    if (!newArticle.title.trim() || !newArticle.subjectName.trim() || !newArticle.content.trim()) return;
    try {
      await axios.post("http://localhost:5000/articles", { ...newArticle, topicName });
      setNewArticle({ title: "", subjectName: "", content: "" });
      fetchArticles();
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  // Delete article
  const handleDeleteArticle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/articles/${id}`);
      fetchArticles();
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Articles for Topic: {topicName}</h2>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>

      {loading && <p>Loading articles...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div style={{display:"grid"}}>
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
        <input
          type="text"
          placeholder="Topic"
          value={newArticle.topicName}
          onChange={(e) => setNewArticle({ ...newArticle, topicName: e.target.value })}
        />

        <textarea
          placeholder="Content"
          value={newArticle.content}
          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
        ></textarea>
        <button onClick={handleAddArticle}>Add Article</button>
      </div>

      {/* List Articles */}
      <ul>
        {articles.length > 0 ? (
          articles.map((article) => (
            <li key={article._id}>
              <p><strong>Title:</strong> {article.title}</p>
              <p><strong>Subject:</strong> {article.subjectName}</p>
              <p><strong>Topic:</strong> {article.topicName}</p>
              <p><strong>Content:</strong> {article.content}</p>
              <button onClick={() => handleDeleteArticle(article._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p style={{ color: "red" }}>No articles available.</p>
        )}
      </ul>
    </div>
  );
};

export default Articles;
