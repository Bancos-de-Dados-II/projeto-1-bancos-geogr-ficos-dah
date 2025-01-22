import * as yup from 'yup';

export const registerValidationSchema = yup.object().shape({
  nome: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('Email inválido').required('Email é obrigatório'),
  senha: yup.string().min(6, 'Senha deve ter no mínimo 6 caracteres').required('Senha é obrigatória'),
  telefone: yup.string(),
  endereco: yup.string(),
});