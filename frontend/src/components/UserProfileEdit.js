import React, { useState, useEffect } from 'react';
import api from '../api';
import './UserProfileEdit.css';

const UserProfileEdit = () => {
  const [user, setUser] = useState({ name: '', email: '', avatar: '' });
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const res = await api.get('/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setAvatarPreview(res.data.avatar);
      } catch (err) {
        setError('Failed to load profile');
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div className="user-profile-edit-container">
      <h2>User Profile</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="profile-form">
        <div className="form-group">
          <label>Avatar</label>
          {avatarPreview && <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />}
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfileEdit;
