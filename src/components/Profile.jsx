import React, { useState, useEffect } from 'react';

function Profile() {
  const [userData, setUserData] = useState({ username: '', email: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/user/profile', { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      } else {
        alert('Failed to fetch user data');
      }
    }
    fetchUser();
  }, []);

  const handleChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const res = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(userData),
    });
    if (res.ok) {
      alert('Profile updated');
      setEditMode(false);
    } else {
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      {editMode ? (
        <>
          <input name="username" value={userData.username} onChange={handleChange} />
          <input name="email" value={userData.email} onChange={handleChange} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </>
      )}
    </div>
  );
}

export default Profile;
