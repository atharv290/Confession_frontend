import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    const { username, email, password, confirmPassword } = formData;

    const response = await fetch("https://confession-frontend.vercel.app/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include", // REQUIRED TO RECEIVE COOKIE
    body: JSON.stringify({ name: username,email:email ,password: password})
  });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>✨ Join Lovify ✨</h2>
      <p style={styles.tagline}>Find your vibe. Match your tribe. 💞</p>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Username 💁‍♀️"
          value={formData.username}
          onChange={handleChange}
          style={styles.input}
        />
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
          placeholder="Password 🔒"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password ✅"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={styles.input}
        />
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <button type="submit" style={styles.button}>
          Get Started 💘
        </button>
        <p style={{ marginTop: "10px", color: "#fff" }}>
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Log in
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
    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    fontFamily: "'Comic Neue', cursive",
    textAlign: "center",
    animation: "fadeIn 1s ease-in-out",
  },
  heading: {
    fontSize: "2em",
    color: "#fff",
    marginBottom: "5px",
  },
  tagline: {
    color: "#fff",
    marginBottom: "20px",
    fontStyle: "italic",
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
    backgroundColor: "#ff6ec4",
    backgroundImage: "linear-gradient(45deg, #ff6ec4 0%, #7873f5 100%)",
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

export default SignUp;
