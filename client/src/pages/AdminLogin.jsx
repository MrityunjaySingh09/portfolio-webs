import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <div className="absolute top-4 left-4">
        <button onClick={() => navigate('/')} className="text-sm text-brand-neon-blue hover:underline">← Back to Portfolio</button>
      </div>
      <div className="glass p-8 rounded-2xl w-full max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-brand-neon-purple/50">
            <Lock className="text-brand-neon-purple w-8 h-8" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-8 text-gradient">Admin Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon-purple transition-colors"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0f1d]/50 border border-brand-glass-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-neon-purple transition-colors"
              required 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-brand-neon-purple to-brand-neon-blue text-white font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
