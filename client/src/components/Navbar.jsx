import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">CineTrack</Link>
      </div>
      <div className="space-x-4">
        <Link to="/films" className="hover:text-indigo-400">Films</Link>
        <Link to="/series" className="hover:text-indigo-400">Séries</Link>
        <Link to="/login" className="hover:text-indigo-400">Login</Link>
        <Link to="/register" className="hover:text-indigo-400">Register</Link>
      </div>
    </nav>
  );
}
