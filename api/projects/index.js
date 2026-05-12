const connectDB = require('./lib/db');
const { Project } = require('./lib/models');
const { verifyToken } = require('./lib/auth');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await connectDB();

  if (req.method === 'GET') {
    try {
      const projects = await Project.find();
      return res.json(projects);
    } catch (error) {
      return res.status(500).json({ error: 'Server Error' });
    }
  }

  if (req.method === 'POST') {
    const user = verifyToken(req);
    if (!user) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const project = new Project(req.body);
      await project.save();
      return res.status(201).json(project);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create project' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
