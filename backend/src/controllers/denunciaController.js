import { Denuncia } from '../models/denuncia.js';

export const getAllDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.findAll();
    res.status(200).json(denuncias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDenunciaById = async (req, res) => {
  const { id } = req.params;
  try {
    const denuncia = await Denuncia.findByPk(id);
    res.status(200).json(denuncia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDenuncia = async (req, res) => {
  const { categoria, descricao, latitude, longitude, usuarioId, data_denuncia } = req.body;
  try {
    const denuncia = await Denuncia.create({
      descricao,
      latitude,
      longitude,
      usuarioId,
      categoria,
      status: "pendente",
      data_denuncia
    });
    res.status(201).json(denuncia);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}