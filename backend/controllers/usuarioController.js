import bcrypt from 'bcrypt';
import { Usuario } from '../models/usuario.js';

export const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  const { nome, email, senha, telefone, endereco, tipo_usuario } = req.body;

  const senhaCriptografada = bcrypt.hashSync(senha, 10);
  try {
    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      telefone,
      endereco,
      tipo_usuario,
    });
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};