import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function RefreshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true);
      if (location.pathname === '/login' || location.pathname === '/signup') {
        navigate('/products', { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]); // Corrected dependency array and syntax

  return null;
}

export default RefreshHandler;
