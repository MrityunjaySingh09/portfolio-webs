require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET || 'secret123', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Schemas
const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  link: String,
  featured: Boolean,
});

const MessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  subject: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Project = mongoose.model('Project', ProjectSchema);
const Message = mongoose.model('Message', MessageSchema);

// Initial Seed Data for Projects
const seedProjects = async () => {
  const count = await Project.countDocuments();
  if (count === 0) {
    await Project.insertMany([
      {
        title: "Station Guide",
        description: "A comprehensive platform to guide users through station layouts, amenities, and real-time updates.",
        tags: ["ReactJS", "NodeJS", "MongoDB", "TailwindCSS"],
        link: "#",
        featured: true
      },
      {
        title: "100 Days 100 Web Projects",
        description: "A daily coding challenge documenting 100 unique web development projects built from scratch.",
        tags: ["ReactJS", "NodeJS"],
        link: "#",
        featured: true
      },
      {
        title: "Samvidhan Path",
        description: "An educational portal dedicated to spreading awareness about the Constitution and fundamental rights.",
        tags: ["ReactJS", "ExpressJS", "MongoDB"],
        link: "#",
        featured: false
      }
    ]);
    console.log("Seeded default projects");
  }
};
seedProjects();

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@admin.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'password123';
  
  if (email === adminEmail && password === adminPassword) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret123', { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.post('/api/projects', verifyToken, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
});

app.put('/api/projects/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/projects/:id', verifyToken, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Save to DB
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    // Send email notification (only if credentials are set)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Send to self
        subject: `New Portfolio Message: ${subject}`,
        text: `From: ${name} (${email})\n\nMessage:\n${message}`
      };
      
      await transporter.sendMail(mailOptions);
    } else {
      console.log('Email not sent: EMAIL_USER or EMAIL_PASS not configured.');
    }

    res.status(200).json({ success: true, message: 'Message sent and saved successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
