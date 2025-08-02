import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/api/movies/${movieId}`).then(res => setMovie(res.data));
    axios.get(`/api/reviews/${movieId}`).then(res => setReviews(res.data));
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <img src={movie.posterUrl} alt={movie.title} className="w-full max-h-[500px] object-cover rounded" />
      <h1 className="text-3xl mt-4">{movie.title}</h1>
      <p className="mt-2">{movie.description}</p>
      <div className="flex space-x-4 mt-4">
        <Link to={`/player/demoProfileId/${movieId}`} className="bg-red-600 px-4 py-2 rounded">
          ▶ Play
        </Link>
        <Link to={`/watch/${Date.now()}`} className="bg-blue-600 px-4 py-2 rounded">
          🎥 Watch Together
        </Link>
      </div>
      <div className="mt-4">
        <h3 className="text-xl">Reviews</h3>
        {reviews.map(r => (
          <p key={r._id}><strong>{r.rating}⭐</strong> - {r.comment}</p>
        ))}
      </div>
    </div>
  );
              }
