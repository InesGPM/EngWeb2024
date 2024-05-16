const mongoose = require('mongoose');

const contratoSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  idcontrato: { type: Number, required: true, unique: true },
  nAnuncio: String,
  tipoprocedimento: String,
  objectoContrato: String,
  dataPublicacao: String,
  dataCelebracaoContrato: String,
  precoContratual: String,
  prazoExecucao: Number,
  NIPC_entidade_comunicante: Number,
  entidade_comunicante: String,
  fundamentacao: String,
});

module.exports = mongoose.model('Contrato', contratoSchema);
