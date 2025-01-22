import { Router } from 'express';

import { createDenuncia, getAllDenuncias, getDenunciaById } from '../controllers/denunciaController.js';
import { login } from '../controllers/loginController.js';
import { createUsuario, getAllUsuarios, getUsuarioById } from '../controllers/usuarioController.js';
import { authMiddleware } from '../middlewares/loginMiddleware.js';

const router = Router();
// Rotas de usuários
router.get('/users', authMiddleware ,getAllUsuarios);
router.get('/users/:id', authMiddleware ,getUsuarioById);
router.post('/users', createUsuario);

// Rotas de denúncias
router.get('/denuncias', authMiddleware, getAllDenuncias);
router.get('/denuncias/:id', authMiddleware, getDenunciaById);
router.post('/denuncias', authMiddleware, createDenuncia);

// Rota de login
router.post('/login', login);

export default router;