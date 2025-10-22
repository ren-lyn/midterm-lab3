import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    occupation: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setError('');
    } catch (error) {
      setError('Error fetching users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      if (editingId) {
        // Update user
        await axios.put(`${API_URL}/${editingId}`, formData);
        setEditingId(null);
      } else {
        // Create new user
        await axios.post(API_URL, formData);
      }

      // Reset form and refresh users
      setFormData({ name: '', email: '', age: '', occupation: '' });
      await fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || 'Error saving user');
      console.error('Error saving user:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle edit button click
  const handleEdit = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age.toString(),
      occupation: user.occupation
    });
    setEditingId(user._id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/${id}`);
        await fetchUsers();
        setError('');
      } catch (error) {
        setError('Error deleting user');
        console.error('Error deleting user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({ name: '', email: '', age: '', occupation: '' });
    setEditingId(null);
    setError('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1>MERN CRUD Operations</h1>
        
        {error && <div className="error-message">{error}</div>}
        
        {/* User Form */}
        <div className="form-container">
          <h2>{editingId ? 'Edit User' : 'Add New User'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                min="0"
                required
              />
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" disabled={loading}>
                {loading ? 'Processing...' : (editingId ? 'Update User' : 'Add User')}
              </button>
              {editingId && (
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Users List */}
        <div className="users-container">
          <h2>Users List</h2>
          {loading && !users.length && <div className="loading">Loading...</div>}
          
          {users.length === 0 && !loading ? (
            <div className="no-users">No users found. Add some users to get started!</div>
          ) : (
            <div className="users-grid">
              {users.map((user) => (
                <div key={user._id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Age:</strong> {user.age}</p>
                    <p><strong>Occupation:</strong> {user.occupation}</p>
                    <p className="created-date">
                      <strong>Created:</strong> {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="user-actions">
                    <button 
                      onClick={() => handleEdit(user)}
                      className="edit-btn"
                      disabled={loading}
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(user._id)}
                      className="delete-btn"
                      disabled={loading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
