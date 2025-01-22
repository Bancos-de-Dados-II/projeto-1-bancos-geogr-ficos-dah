import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.js';

export const login = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({
      where: { email },
    });
    
    if (!usuario) {
      return res.status(404).json({ message: 'Invalid fields' });
    }

    bcrypt.compare(senha, usuario.senha, (err, result) => {
      if (!result) {
        console.log(err);
        
        return res.status(401).json({ message: 'Invalid fields' });
      }
    });

    const token = jwt.sign({ email }, process.env.JWT_SECRET || '', {
      expiresIn: '8h',
    });

    const { senha: _, ...userWithoutPassword } = usuario.dataValues;
    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};