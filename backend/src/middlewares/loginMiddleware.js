import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.js';

export const authMiddleware = async (
  req, res, next
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).send({ message: 'Token not provided' });
    }
    const [, token] = authorization.split(' ');
    const { email } = jwt.verify(token, process.env.JWT_SECRET || '');

    const user = await Usuario.findOne({
      where: { email },
    })
    if (!user) {
      return res.status(401).send({ message: 'User not found' });
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.dataValues;
    req.user = userWithoutPassword;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};