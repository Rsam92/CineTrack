import React from "react";

export default function Navbar({ onNavigate }) {
  return (
    <nav>
      <button onClick={() => onNavigate("dashboard")}>Dashboard</button>
      <button onClick={() => onNavigate("films")}>Films</button>
      <button onClick={() => onNavigate("series")}>Séries</button>
      <button onClick={() => onNavigate("logout")}>Déconnexion</button>
    </nav>
  );
}
