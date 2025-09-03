import { useState } from 'react';
import api from '../api/api';

export default function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/login', { email, password });
      localStorage.setItem('jwt', res.data.token);
      onNavigate('dashboard'); // navigue vers le dashboard après login
    } catch (err) {
      alert('Erreur de connexion');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
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
      <button>Se connecter</button>
      <p>
        Pas encore inscrit ?{' '}
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => onNavigate('register')}
        >
          Inscription
        </span>
      </p>
    </form>
  );
}
