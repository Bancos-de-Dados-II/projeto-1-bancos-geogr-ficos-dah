
import { Button, IconButton, Input, Option, Select, Textarea, Typography } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import axios from '../config/axios';
import { useAuth } from '../hooks/useAuth';
import { getToken } from '../utils';

export const CreateDenuncia = ({latlng}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, setValue,handleSubmit } = useForm({
    defaultValues: {
      descricao: '',
      categoria: 'roubo',
      status: "pendente",
      data_denuncia: new Date(),
      latitude: 0,
      longitude: 0,
      endereco: ''
    }
  });
  const navigate = useNavigate();
  const { user } = useAuth();

  const handelOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const ButtonRef = useRef(null);

  useEffect(() => {
    if (!latlng) return;
    
    (async () => {      
      const {data} = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latlng?.lat || 0}&lon=${latlng?.lng || 0}`);

      const {road, neighbourhood, state} = data.address;
      
      setValue("endereco", `${road}, ${neighbourhood} - ${state}`)
      setValue('latitude', latlng?.lat || 0);
      setValue('longitude', latlng?.lng || 0);
    })()
  }, [latlng]);

  const handleCreateDenuncia = async (descricao, categoria, status, data_denuncia, latitude, longitude) => {
    try {
      await axios.post('/denuncias', {
        descricao,
        categoria,
        status,
        data_denuncia,
        latitude,
        longitude,
        usuarioId: user.id
      }, {
        headers: {
          'Authorization': `Bearer ${await getToken()}`
        }
      });

      alert('Denuncia criada com êxito');

      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }

  console.log(isOpen);
  

  return (
    <>
      {
        isOpen ? (
          <div className='absolute z-[1000] p-2 bg-background border border-primary rounded-md w-[30rem] h-[25rem] bottom-10 right-10 flex flex-col'>
            <IconButton className='bg-primary w-4 h-4 p-4 rounded-full text-secondary font-medium self-end m-2 text-center' onClick={handleCloseModal}>
              X
            </IconButton>

            <form className='flex flex-col gap-4 items-center justify-between' onSubmit={handleSubmit((data) => handleCreateDenuncia(data.descricao, data.categoria, data.status, data.data_denuncia, latlng.lat, latlng.lng))}>
              <Select {...register('categoria')} label='Tipo da denuncia' onChange={(val) => setValue(val)}>
                <Option value='roubo'>Roubo</Option>
                <Option value='violencia'>Violência</Option>
                <Option value='trafico'>Tráfico</Option>
              </Select>

              <Input {...register('data_denuncia')} type='date' label='Data do ocorrido' />

              <Textarea {...register('descricao')} type='text' label='Descrição' />

              <Typography variant='small'>Selecione o lugar no mapa</Typography>
              <Input disabled {...register('endereco')} type='text' label='Endereço' />

              <Button type='submit' className='bg-primary text-secondary font-medium w-full'>
                Criar denúncia
              </Button>
            </form>
          </div>
        )
        :
        (
          <button
            onClick={handelOpenModal}
            ref={ButtonRef}
            className='absolute z-[1000] bottom-16 right-16 bg-primary w-60 h-16 rounded-full p-2 text-base text-secondary font-medium'
          >
            CADASTRAR DENUNCIA
          </button>
        )
      }

    </>
  )
};