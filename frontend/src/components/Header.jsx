import { Link, useLocation } from 'react-router';

export const Header = () => {
  const location = useLocation();
  return (
    <header className='absolute z-[1000] top-16 left-16 w-72 h-12 bg-background shadow-xl rounded-full flex items-center justify-between p-8'>
      <img src="/default.jpeg" alt="Sem foto" className='w-8 h-8 rounded-full' />

      <Link to={location.pathname === '/' ? 'minhas-denuncias' : '/'} className='font-medium hover:underline'>
        {
          location.pathname === '/' ?
            'Minhas denúncias' : 'Voltar ao mapa'
        }
      </Link>
    </header>
  )
};