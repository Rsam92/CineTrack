export default function Navbar({ onNavigate }) {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    onNavigate();
  };

  return (
    <nav style={{ marginBottom: '1rem' }}>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}
