import React, { useState } from 'react';

function FeedbackForm({ imageId }) {
  const [commenter, setCommenter] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      imageId,
      commenter,
      comment,
      rating: Number(rating),
    };

    try {
      const res = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage('Feedback submitted successfully!');
        setCommenter('');
        setComment('');
        setRating(5);
      } else {
        const errorData = await res.json();
        setMessage('Error: ' + (errorData.message || 'Failed to submit feedback'));
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      <h3>Submit Feedback</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={commenter}
              onChange={(e) => setCommenter(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Comment:
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Rating (1-5):
            <input
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FeedbackForm;
