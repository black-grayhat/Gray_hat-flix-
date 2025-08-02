import React, { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [form, setForm] = useState({ title: "", description: "", category: "", posterUrl: "", videoUrl: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5000/api/movies", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Movie added!");
    } catch (err) {
      alert("❌ Not authorized or error adding movie.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👑 Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input name="posterUrl" placeholder="Poster URL" onChange={handleChange} required />
        <input name="videoUrl" placeholder="Video URL" onChange={handleChange} required />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
         }
