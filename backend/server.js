
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect("mongodb+srv://sandhyak:Daddy@cluster0.rc1dc.mongodb.net/flutter?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => console.error("MongoDB connection error:", err));
db.once("open", () => console.log("Connected to MongoDB!"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB Database:", mongoose.connection.db.databaseName);
});


// Subject Schema
const subjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  description: {type: String, required: true},
  createdAt: { type: Date,default: Date.now}
});

const Subject = mongoose.model("Subjects", subjectSchema);

// Topic Schema
const topicSchema = new mongoose.Schema({
  // subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subjects", required: true },
  topicName: { type: String, required: true },
  subjectName: { type: String, required: true },
  description: {type: String, required: true},
  createdAt: { type: Date,default: Date.now}
});

const Topic = mongoose.model("Topics", topicSchema);

// Article Schema
const articleSchema = new mongoose.Schema({
  topicName: { type: mongoose.Schema.Types.ObjectId, ref: "Topics", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  topicName: {type: String, required: true},
  subjectName: {type: String, required: true},
  createdAt: { type: Date,default: Date.now}
});

const Article = mongoose.model("Articles", articleSchema);

// Test Route
app.get("/test", async (req, res) => {
  try {
    res.json({ message: "MongoDB connected successfully!" });
  } catch (error) {
    res.status(500).json({ error: "MongoDB connection failed" });
  }
});

// CRUD for Subjects
app.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
});

// app.post("/subjects", async (req, res) => {
//   try {
//     const { subjectName, description } = req.body;
//     if (!subjectName || !description) return res.status(400).json({ error: "Subject name is required" });

//     const newSubject = new Subject({ subjectName });
//     await newSubject.save();
//     res.status(201).json(newSubject);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to add subject" });
//   }
// });

app.post("/subjects", async (req, res) => {
  try {
    const { subjectName, description } = req.body;

    if (!subjectName || !description) {
      return res.status(400).json({ error: "Subject name and description are required" });
    }

    const newSubject = new Subject({ subjectName, description });
    await newSubject.save();
    res.status(201).json(newSubject);
  } catch (error) {
    console.error("Error adding subject:", error); // Helpful for debugging
    res.status(500).json({ error: "Failed to add subject" });
  }
});

app.put("/subjects/:id", async (req, res) => {
  try {
    const { subjectName, description } = req.body;

    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { subjectName, description },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    res.json(updatedSubject);
  } catch (error) {
    res.status(500).json({ error: "Failed to update subject" });
  }
});


app.delete("/subjects/:id", async (req, res) => {
  try {
    const subjectId = req.params.id;
    
    // Delete related topics and articles
    await Topic.deleteMany({ subjectId });
    await Article.deleteMany({ topicId: { $in: (await Topic.find({ subjectId })).map(t => t._id) } });
    await Subject.findByIdAndDelete(subjectId);

    res.json({ message: "Subject and related data deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete subject" });
  }
});

// CRUD for Topics

app.get("/topics", async (req, res) => {
  try {
    const { subjectName } = req.query; // Get subjectName from query params
    if (!subjectName) return res.status(400).json({ error: "Subject name is required" });

    const topics = await Topic.find({ subjectName });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

app.get("/topics/:subjectName", async (req, res) => {
  try {
    const { subjectName } = req.params;
    if (!subjectName) return res.status(400).json({ error: "Subject name is required" });

    const topics = await Topic.find({ subjectName });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch topics" });
  }
});

app.post("/topics", async (req, res) => {
  try {
    const { topicName, description, subjectName } = req.body;

    if (!topicName || !description || !subjectName) {
      return res.status(400).json({ error: "Topic name, description, and subject name are required" });
    }

    const newTopic = new Topic({ topicName, description, subjectName });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    console.error("Error adding topic:", error);
    res.status(500).json({ error: "Failed to add topic" });
  }
});



app.put("/topics/:id", async (req, res) => {
  try {
    const { topicName, subjectName, description } = req.body;

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      { topicName, subjectName, description },
      { new: true }
    );

    if (!updatedTopic) {
      return res.status(404).json({ error: "Topic not found" });
    }

    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ error: "Failed to update topic" });
  }
});

app.delete("/topics/:id", async (req, res) => {
  try {
    const topicId = req.params.id;
    await Article.deleteMany({ topicId }); // Delete related articles
    await Topic.findByIdAndDelete(topicId);

    res.json({ message: "Topic and related articles deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete topic" });
  }
});

// CRUD for Articles

app.get("/articles", async (req, res) => {
  const { topicName } = req.query;
  try {
    const articles = topicName
      ? await Article.find({ topicName }) 
      : await Article.find(); 

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error: error.message });
  }
}); 

// app.get("/articles/:subjectName", async (req, res) => {
//   try {
//       const article = await Article.findOne({ subjectName: req.params.subjectName });

//       if (!article) {
//           return res.status(404).json({ message: "Article not found" });
//       }

//       res.json(article);
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//   }
// });

app.get("/articles/:topicName", async (req, res) => {
  try {
      const article = await Article.findOne({ topicName: req.params.topicName });

      if (!article) {
          return res.status(404).json({ message: "Article not found" });
      }

      res.json(article);
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
});

app.post("/articles", async (req, res) => {
  try {
    const { topicName, title, description, subjectName } = req.body;

    if (!topicName || !title || !description || !subjectName) {
      return res.status(400).json({ error: "Topic Name, title, Subject Name and content are required" });
    }

    const newArticle = new Article({ topicName, title, description, subjectName });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ message: "Failed to add article", error: error.message });
  }
});

app.put("/articles/:id", async (req, res) => {
  try {
    const { topicName, title, description, subjectName } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { topicName, title, description, subjectName },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: "Failed to update article" });
  }
});


app.delete("/articles/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }

    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete article", error: error.message });
  }
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
