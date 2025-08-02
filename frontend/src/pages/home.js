import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieRow from "../components/MovieRow";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

export default function Home() {
  const { profileId } = useParams();
  const [recommendations, setRecommendations] = useState([]);
  const [continueWatching, setContinueWatching] = useState([]);
  const [myList, setMyList] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`/api/recommendations/${profileId}`).then(res => setRecommendations(res.data));
    axios.get(`/api/profiles/${profileId}/continue`).then(res => setContinueWatching(res.data));
    axios.get(`/api/profiles/${profileId}/mylist`).then(res => setMyList(res.data));
    axios.get("/api/categories").then(res => setCategories(res.data));
  }, [profileId]);

  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <MovieRow title="Continue Watching" movies={continueWatching} />
        <MovieRow title="Recommended for You" movies={recommendations} />
        <MovieRow title="My List" movies={myList} />
        {categories.map(cat => (
          <MovieRow key={cat} title={cat} fetchUrl={`/api/movies/category/${cat}`} />
        ))}
      </div>
    </div>
  );
    }
