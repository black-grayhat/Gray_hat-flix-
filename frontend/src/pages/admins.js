import React, { useState } from "react";
import axios from "axios";

export default function Admin() {
  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [poster, setPoster] = useState(null);
  const [video, setVideo] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("category", form.category);
    if (poster) formData.append("poster", poster);
    if (video) formData.append("video", video);

    try {
      await axios.post("http://localhost:5000/api/movies", formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Movie uploaded!");
    } catch (err) {
      alert("❌ Upload failed.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>👑 Add New Movie</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} required />
        <input name="description" placeholder="Description" onChange={handleChange} required />
        <input name="category" placeholder="Category" onChange={handleChange} required />
        <input type="file" onChange={e => setPoster(e.target.files[0])} accept="image/*" required />
        <input type="file" onChange={e => setVideo(e.target.files[0])} accept="video/*" required />
        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}
