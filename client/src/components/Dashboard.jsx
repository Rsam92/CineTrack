import React, { useEffect, useState } from "react";
import { getMedias } from "../services/mediaService";

export default function Dashboard() {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    loadMedias();
  }, []);

  const loadMedias = async () => {
    const res = await getMedias();
    setMedias(res.data["hydra:member"] || res.data);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {medias.map(m => (
          <li key={m.id}>{m.title} ({m.type})</li>
        ))}
      </ul>
    </div>
  );
}
