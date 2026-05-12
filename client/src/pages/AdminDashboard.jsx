import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trash2, Edit2, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ title: '', description: '', tags: '', link: '', featured: false });
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }
    fetchProjects();
  }, [navigate]);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      if (editingId) {
        await axios.put(`/api/projects/${editingId}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/projects', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormData({ title: '', description: '', tags: '', link: '', featured: false });
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project', error);
      if(error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      } else {
        alert('Failed to save project. Ensure API is running and token is valid.');
      }
    }
  };

  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      tags: (project.tags || []).join(', '),
      link: project.link || '',
      featured: project.featured || false
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await axios.delete(`/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project', error);
      if(error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gradient">Admin Dashboard</h1>
        <div className="flex gap-4">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors">View Site</button>
          <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-300 transition-colors">
            <LogOut size={18} className="mr-2" /> Logout
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-1 glass p-6 rounded-2xl h-fit">
          <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded px-3 py-2 text-white text-sm" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded px-3 py-2 text-white text-sm resize-none" rows="3" required></textarea>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
              <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded px-3 py-2 text-white text-sm" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Project Link</label>
              <input type="text" name="link" value={formData.link} onChange={handleInputChange} className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded px-3 py-2 text-white text-sm" required />
            </div>
            <div className="flex items-center">
              <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange} className="mr-2" />
              <label htmlFor="featured" className="text-sm text-gray-400">Featured Project</label>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="flex-1 py-2 rounded bg-brand-neon-purple text-white font-medium text-sm hover:opacity-90 transition-opacity">
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', description: '', tags: '', link: '', featured: false }); }} className="py-2 px-4 rounded border border-gray-600 text-gray-300 font-medium text-sm hover:bg-white/5 transition-colors">
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold mb-6">Existing Projects</h2>
          {loading ? (
            <p className="text-gray-400">Loading projects...</p>
          ) : projects.length === 0 ? (
            <p className="text-gray-400">No projects found.</p>
          ) : (
            projects.map(project => (
              <div key={project._id} className="glass p-5 rounded-xl flex justify-between items-center group">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    {project.title} 
                    {project.featured && <span className="text-[10px] bg-brand-neon-blue/20 text-brand-neon-blue px-2 py-0.5 rounded-full border border-brand-neon-blue/30">Featured</span>}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 max-w-xl truncate">{project.description}</p>
                </div>
                <div className="flex gap-3 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(project)} className="p-2 bg-white/5 rounded text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(project._id)} className="p-2 bg-red-500/10 rounded text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
