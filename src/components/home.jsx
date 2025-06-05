import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [confessions, setConfessions] = useState([]);
  const navigate = useNavigate();

  // Check login and load confessions
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch("https://confession-frontend.vercel.app/get", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Token verification failed", error);
        setUserData(null);
      }
    };

    const fetchConfessions = async () => {
      try {
        const res = await fetch("https://confession-frontend.vercel.app/confessions",
            {
                credentials: "include"
            });
        const data = await res.json();
        if (Array.isArray(data)) {
          setConfessions(data);
        } else {
          console.error("Expected an array but got:", data);
        }
      } catch (err) {
        console.error("Failed to load confessions", err);
      }
    };

    checkToken();
    fetchConfessions();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("https://confession-frontend.vercel.app/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        navigate('/login')
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const handlePostClick = () => {
    navigate('/post-confession');
  };

  return (
    <div>
      {userData && (
        <nav style={styles.navbar}>
          <h2 style={styles.logo}>💖 Lovify</h2>
          <div style={styles.navItems}>
            <span style={styles.user}>Welcome, {userData.user}</span>
            <button onClick={handlePostClick} style={styles.navButton}>Post Confession</button>
            <button onClick={handleLogout} style={styles.navButton}>Logout</button>
          </div>
        </nav>
      )}

      <div style={styles.container}>
        <h1>💬 Confession Room</h1>
        <p>Share your thoughts anonymously... 🎭</p>

        {Array.isArray(confessions) && confessions.length > 0 ? (
          confessions.map((conf, index) => (
            <div key={index} style={styles.confessionBox}>
              <p>{conf.text}</p>
              <small>{new Date(conf.createdAt).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No confessions yet.</p>
        )}

        {!userData && <p>Please login to continue.</p>}
      </div>
    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ff4081',
    padding: '15px 30px',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontFamily: "'Comic Neue', cursive",
    fontSize: '24px',
    margin: 0,
  },
  navItems: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  user: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  navButton: {
    backgroundColor: 'white',
    color: '#ff4081',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  container: {
    fontFamily: "'Comic Neue', cursive",
    textAlign: 'center',
    marginTop: '50px',
    color: '#ff4081',
    padding: '20px',
  },
  confessionBox: {
    background: '#ffe4ec',
    margin: '20px auto',
    padding: '15px',
    borderRadius: '12px',
    maxWidth: '500px',
    boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
    textAlign: 'left'
  }
};

export default Home;
