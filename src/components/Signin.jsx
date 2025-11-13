import React, { useState } from 'react';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { username, password };
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
      credentials: 'include',
    });
    if (res.ok) alert('Signin successful');
    else {
      const err = await res.text();
      alert('Signin failed: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default Signin;
