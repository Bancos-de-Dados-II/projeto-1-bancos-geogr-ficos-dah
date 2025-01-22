import { UserLayout } from '../layouts/userLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import MinhasDenundiasPage from '../pages/MinhasDenuncias';
import Register from '../pages/Register';

/**
 * @type {RouteConfig[]}
 */
const routes = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: (
      <UserLayout>
        <Home />
      </UserLayout>
    )
  },
  {
    path: '/minhas-denuncias',
    element: (
      <UserLayout>
        <MinhasDenundiasPage />
      </UserLayout>
    )
  }
];

export default routes;