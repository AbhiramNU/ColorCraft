import React, { useState } from 'react';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const captchaAnswer = 7; // “What is 3 + 4?”

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseInt(captchaInput) !== captchaAnswer) {
      alert('Captcha answer incorrect');
      return;
    }
    const payload = { username, password };
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload),
    });
    if (res.ok) alert('Signup successful');
    else {
      const err = await res.text();
      alert('Signup failed: ' + err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <label>What is 3 + 4?</label>
      <input value={captchaInput} onChange={e => setCaptchaInput(e.target.value)} placeholder="Captcha" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default Signup;
