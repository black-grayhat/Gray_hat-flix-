import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/profiles").then(res => setProfiles(res.data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl mb-8">Who's watching?</h1>
      <div className="grid grid-cols-2 gap-8">
        {profiles.map(profile => (
          <div
            key={profile._id}
            className="cursor-pointer text-center"
            onClick={() => navigate(`/home/${profile._id}`)}
          >
            <img
              src={profile.avatar}
              alt="avatar"
              className="w-32 h-32 rounded-full border-4 border-red-600"
            />
            <p className="mt-2">{profile.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
