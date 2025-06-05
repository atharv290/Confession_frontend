// src/components/PostConfession.jsx
import React, { useState } from 'react';

const PostConfession = ({ onPost }) => {
  const [confessionText, setConfessionText] = useState('');
  const [message, setMessage] = useState('');

  const handleConfessionSubmit = async (e) => {
    e.preventDefault();
    if (!confessionText.trim()) {
      setMessage('❗ Confession cannot be empty.');
      return;
    }

    try {
      const response = await fetch("https://confession-frontend.vercel.app/confession", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: confessionText })
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Confession posted anonymously!");
        setConfessionText('');
        onPost && onPost(); // Optional callback for refresh
      } else {
        setMessage("❌ Failed to post confession.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error while posting.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2>Post Your Confession 💬</h2>
      <form onSubmit={handleConfessionSubmit}>
        <textarea
          value={confessionText}
          onChange={(e) => setConfessionText(e.target.value)}
          placeholder="Write your confession anonymously..."
          rows={5}
          style={styles.textarea}
        />
        <br />
        <button type="submit" style={styles.button}>Submit Confession</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

const styles = {
  wrapper: {
    marginTop: '40px',
    textAlign: 'center',
    color: '#444',
  },
  textarea: {
    width: '90%',
    maxWidth: '500px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'none',
    fontFamily: 'inherit',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#ff4081',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    marginTop: '10px',
    color: '#777',
  }
};

export default PostConfession;
