const express = require('express');
const router = express.Router();
const Contrato = require('../models/contrato');

// Página principal
router.get('/', async (req, res) => {
  try {
    const contratos = await Contrato.find();
    res.render('index', { contratos });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Página de contrato por id
router.get('/:id', async (req, res) => {
  try {
    const contrato = await Contrato.findOne({ idcontrato: req.params.id });
    if (contrato) {
      res.render('contrato', { contrato });
    } else {
      res.status(404).send('Contrato não encontrado');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Página de entidade por NIPC
router.get('/entidades/:nipc', async (req, res) => {
  try {
    const contratos = await Contrato.find({ NIPC_entidade_comunicante: req.params.nipc });
    if (contratos.length > 0) {
      const entidade = contratos[0].entidade_comunicante;
      const totalValor = contratos.reduce((sum, contrato) => sum + parseFloat(contrato.precoContratual), 0);
      res.render('entidade', { entidade, nipc: req.params.nipc, contratos, totalValor });
    } else {
      res.status(404).send('Entidade não encontrada');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
