import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieRow({ title, movies, fetchUrl }) {
  const [movieList, setMovieList] = useState(movies || []);

  useEffect(() => {
    if (fetchUrl) {
      axios.get(fetchUrl).then(res => setMovieList(res.data));
    }
  }, [fetchUrl]);

  return (
    <div className="px-4 mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
        {movieList.map(movie => (
          <Link key={movie._id} to={`/movie/${movie._id}`}>
            <img src={movie.posterUrl} alt={movie.title} className="w-40 rounded" />
          </Link>
        ))}
      </div>
    </div>
  );
            }
