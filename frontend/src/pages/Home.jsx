import { useNavigate } from 'react-router-dom';
import useUserStore from '../features/user';
import { useEffect } from 'react';

function Home() {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Home;