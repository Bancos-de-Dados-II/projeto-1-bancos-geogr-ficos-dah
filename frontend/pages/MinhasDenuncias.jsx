import { Button } from '@material-tailwind/react';
import { Header } from '../components/Header';
import { TableDenuncias } from '../components/TableDenuncias';
import { useAuth } from '../hooks/useAuth';

function MinhasDenundiasPage() {
  const { user, logout } = useAuth();
  return (
    <>
      <Header/>

      <main className='container p-8'>
        <h1 className='text-6xl w-full text-center'>Minhas Denúncias</h1>

        <div className='flex flex-col md:flex-row gap-8 items-center justify-between w-1/2 mx-auto'>
          <div className=''>
            <div className='flex flex-col items-center justify-between gap-8 p-12'>
              <img src="/default.jpeg" alt="Avatar" className='w-48 h-48 rounded-full' />
              <h4 className='text-3xl font-bold'>{user?.nome}</h4>
              <Button onClick={logout} variant='outlined' color='red' className='min-w-72 text-left'>
                Sair
              </Button>
            </div>
          </div>
          <div className='flex-1'>
            <TableDenuncias />
          </div>
        </div>
      </main>
    </>
  )
}

export default MinhasDenundiasPage;