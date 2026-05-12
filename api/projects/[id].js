const connectDB = require('../lib/db');
const { Project } = require('../lib/models');
const { verifyToken } = require('../lib/auth');

module.exports = async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const user = verifyToken(req);
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  await connectDB();
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(project);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update project' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await Project.findByIdAndDelete(id);
      return res.json({ message: 'Project deleted' });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete project' });
    }
  }

  res.status(405).json({ error: 'Method not allowed' });
};
