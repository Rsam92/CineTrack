import { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import MediaForm from "./components/MediaForm";
import FilmForm from "./components/FilmForm";
import SeriesForm from "./components/SeriesForm";

export default function App() {
  const [view, setView] = useState("dashboard");

  const handleNavigate = page => setView(page);
  const handleCreated = () => setView("dashboard");

  return (
    <div>
      <Navbar onNavigate={handleNavigate} />
      {view === "dashboard" && <Dashboard />}
      {view === "mediaForm" && <MediaForm onCreated={handleCreated} />}
      {view === "films" && <FilmForm onCreated={handleCreated} />}
      {view === "series" && <SeriesForm onCreated={handleCreated} />}
    </div>
  );
}
