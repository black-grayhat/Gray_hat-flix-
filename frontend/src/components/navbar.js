import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-black bg-opacity-80 fixed w-full z-50">
      <Link to="/" className="text-2xl font-bold text-red-600">Gray_Hat Flix</Link>
    </nav>
  );
    }
