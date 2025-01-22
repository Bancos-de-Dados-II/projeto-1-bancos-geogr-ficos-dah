import axios from '../config/axios';

import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { CustomizedLogo } from '../components/CustomizedLogo';
import { useYupValidationResolver } from '../hooks/useYupValidationSchema';
import { registerValidationSchema } from '../validators/register';

function Register() {
  const resolver = useYupValidationResolver(registerValidationSchema);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      endereco: '',
    },
    resolver
  });

  const handleRegister = async (nome, email, senha, telefone, endereco) => {
    try {
      await axios.post('/users', {
        nome,
        email,
        senha,
        telefone,
        endereco,
        tipo_usuario: 'cidadão'
      });

      alert('Usuário cadastrado com sucesso!');

      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className='bg-background min-h-screen flex flex-col items-center justify-center'>
      <div className='bg-secondary w-[80%] p-8 rounded-lg shadow-lg flex flex-col gap-4 items-center justify-center'>
        <div className='flex gap-4 items-center justify-between w-full'>
          <h1 className='text-6xl font-medium'>CADASTRO</h1>

          <CustomizedLogo />
        </div>

        <form className='flex flex-col gap-4 w-full' onSubmit={handleSubmit((data) => handleRegister(data.nome, data.email, data.senha, data.telefone, data.endereco))}>
          <p className='text-xl font-bold text-left'>1. Dados pessoais</p>

          <div className='grid grid-cols-3 grid-rows-3 gap-4 w-full'>
            <div className='flex flex-col gap-2 col-span-3'>
              <label htmlFor='nome' className='text-base'>Nome</label>
              <input id='nome' {...register('nome')} className='border border-black p-2 rounded-md w-full h-12' />
              {errors.nome && <span className='text-red-500 text-sm'>{ errors.nome.message }</span>}
            </div>

            <div className='flex flex-col gap-2 col-span-2'>
              <label htmlFor='email' className='text-base'>Email</label>
              <input id='email' {...register('email')} className='border border-black p-2 rounded-md w-full h-12' />
              {errors.email && <span className='text-red-500 text-sm'>{ errors.email.message }</span>}
            </div>

            <div className='flex flex-col gap-2 col-span-1'>
              <label htmlFor='telefone' className='text-base'>Telefone</label>
              <input id='telefone' {...register('telefone')} className='border border-black p-2 rounded-md w-full h-12' />
              {errors.telefone && <span className='text-red-500 text-sm'>{ errors.telefone.message }</span>}
            </div>

            <div className='flex flex-col gap-2 col-span-3'>
              <label htmlFor='senha' className='text-base'>Senha</label>
              <input type='password' id='senha' {...register('senha')} className='border border-black p-2 rounded-md w-full h-12' />
              {errors.senha && <span className='text-red-500 text-sm'>{ errors.senha.message }</span>}
            </div>
          </div>

          <p className='text-xl font-bold text-left'>2. Endereço</p>

          <div> 
            <div className='flex flex-col gap-2'>
              <label htmlFor='endereco' className='text-base'>Endereço</label>
              <input id='endereco' {...register('endereco')} className='border border-black p-2 rounded-md w-full h-12' />
              {errors.endereco && <span className='text-red-500 text-sm'>{ errors.endereco.message }</span>}
            </div>
          </div>

          <button className='bg-primary text-secondary w-full mt-8 h-12 rounded-md' type='submit'>
            Cadastrar
          </button>
        </form>

        <p className='text-center text-sm w-full'>
          Já possui uma conta? <Link to='/login' className='text-primary'>Faça login</Link>
        </p>
      </div>
    </main>
  )
}

export default Register;