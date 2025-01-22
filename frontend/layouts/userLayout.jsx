import p from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export const UserLayout = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate, user, isAuthenticated]);

  return (
    <div>
      {children}
    </div>
  );
};

UserLayout.propTypes = {
  children: p.node.isRequired,
};