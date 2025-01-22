import p from 'prop-types';

import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

export const AuthorityLayout = ({ children }) => {
  const { user, setUser } = useAuth();

  return (
    <AuthContext.Provider value={user, setUser}>
      {children}
    </AuthContext.Provider>
  )
};

AuthorityLayout.propTypes = { 
  children: p.node.isRequired,
};