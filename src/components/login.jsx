import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required 💡");
      return;
    }
    console.log("https://confession-backend-o21o.onrender.com/login")
    const response = await fetch("https://confession-backend-o21o.onrender.com/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // REQUIRED TO RECEIVE COOKIE
    body: JSON.stringify({ name: email, pass: password })
  });
  if(!response){
    alert("Something wents wrong.....!");
  }else{
    setSuccess('Welcome back, gorgeous! 💘');
      // Navigate to Home after 1s
      setTimeout(() => {
        navigate('/home');
      }, 1000);
  }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>💕 Welcome Back to Lovify</h2>
      <p style={styles.tagline}>Log in and let the sparks fly ✨</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          name="email"
          placeholder="Email 📧"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Password 🔐"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button type="submit" style={styles.button}>
          Log In 💫
        </button>
        <p style={{ marginTop: "10px", color: "#fff" }}>
          Don’t have an account?{" "}
          <Link
            to="/signup"
            style={{ color: "#fff", textDecoration: "underline" }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "auto",
    padding: "25px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    fontFamily: "'Comic Neue', cursive",
    textAlign: "center",
    marginTop: "60px",
  },
  heading: {
    fontSize: "2em",
    color: "#fff",
    marginBottom: "10px",
  },
  tagline: {
    color: "#fff",
    fontStyle: "italic",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    fontSize: "1em",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  button: {
    backgroundColor: "#fc5c7d",
    backgroundImage: "linear-gradient(45deg, #fc5c7d 0%, #6a82fb 100%)",
    color: "#fff",
    padding: "12px",
    fontSize: "1em",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "transform 0.2s ease-in-out",
  },
  error: {
    color: "#fff",
    backgroundColor: "#ff4d4d",
    padding: "6px",
    borderRadius: "6px",
    fontSize: "0.9em",
  },
  success: {
    color: "#fff",
    backgroundColor: "#00c853",
    padding: "6px",
    borderRadius: "6px",
    fontSize: "0.9em",
  },
};

export default Login;
