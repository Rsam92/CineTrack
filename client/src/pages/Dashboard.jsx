import { useEffect, useState } from 'react';
import api from '../api/api';
import Navbar from '../components/Navbar';
import MediaList from '../components/MediaList';
import MediaForm from '../components/MediaForm';

export default function Dashboard() {
  const [medias, setMedias] = useState([]);
  const [editingMedia, setEditingMedia] = useState(null);

  const fetchMedias = async () => {
    try {
      const res = await api.get('/media');
      setMedias(res.data['hydra:member'] || res.data);
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la récupération des médias');
    }
  };

  useEffect(() => {
    fetchMedias();
  }, []);

  const handleEdit = (media) => setEditingMedia(media);
  const handleSaved = () => {
    setEditingMedia(null);
    fetchMedias();
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce média ?')) return;
    try {
      await api.delete(`/media/${id}`);
      fetchMedias();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div>
      <Navbar onNavigate={() => { localStorage.removeItem('jwt'); window.location.reload(); }} />
      <h2>Mes Médias</h2>
      <MediaList medias={medias} onEdit={handleEdit} onDelete={handleDelete} />
      <MediaForm media={editingMedia} onSaved={handleSaved} />
    </div>
  );
}
