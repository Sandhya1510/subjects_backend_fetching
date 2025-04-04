import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const getSubjects = async () => {
  const res = await axios.get(`${API_BASE_URL}/subjects`);
  return res.data;
};

export const addSubject = async (subjectName) => {
  const res = await axios.post(`${API_BASE_URL}/subjects`, { subjectName });
  return res.data;
};

export const deleteSubject = async (id) => {
  await axios.delete(`${API_BASE_URL}/subjects/${id}`);
};

export const getTopics = async (subjectId) => {
  const res = await axios.get(`${API_BASE_URL}/topics/${subjectId}`);
  return res.data;
};

export const addTopic = async (subjectId, topicName) => {
  const res = await axios.post(`${API_BASE_URL}/topics`, { subjectId, topicName });
  return res.data;
};

export const deleteTopic = async (id) => {
  await axios.delete(`${API_BASE_URL}/topics/${id}`);
};

export const getArticles = async (topicId) => {
  const res = await axios.get(`${API_BASE_URL}/articles/${topicId}`);
  return res.data;
};

export const addArticle = async (topicId, title, content) => {
  const res = await axios.post(`${API_BASE_URL}/articles`, { topicId, title, content });
  return res.data;
};

export const deleteArticle = async (id) => {
  await axios.delete(`${API_BASE_URL}/articles/${id}`);
};
