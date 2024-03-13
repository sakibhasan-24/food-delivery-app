import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <div>
        <Link to="">
          <span className="text-orange-400 text-3xl sm:text-6xl font-serif  font-bold">
            Food
          </span>
          <span className="ml-2 text-xl font-extrabold ">Affair</span>
        </Link>
      </div>
    </div>
  );
}
