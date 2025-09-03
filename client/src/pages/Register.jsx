import { useState } from 'react';
import api from '../api/api';

export default function Register({ onNavigate }) { // <- props ajoutée
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await api.post('/register', { email, password });
      alert('Utilisateur créé !');
      onNavigate('login'); // retourne au login après inscription
    } catch (err) {
      alert('Erreur lors de l’inscription');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button>S’inscrire</button>
      <p>
        Déjà inscrit ?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => onNavigate('login')}
        >
          Login
        </span>
      </p>
    </form>
  );
}
