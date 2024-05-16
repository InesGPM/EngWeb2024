const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const PORT = 16000;

// Conexão com o MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url, { useUnifiedTopology: true });

app.use(express.json());

// Middleware para reutilizar a conexão do MongoDB
app.use(async (req, res, next) => {
    if (!client.isConnected()) {
        await client.connect();
    }
    req.db = client.db("contratos");
    next();
});

// Rota para obter todos os contratos ou filtrar por entidade ou tipo
app.get('/contratos', async (req, res) => {
    try {
        const { entidade, tipo } = req.query;
        let query = {};
        if (entidade) {
            query.entidade_comunicante = entidade;
        }
        if (tipo) {
            query.tipoprocedimento = tipo;
        }
        const contratos = await req.db.collection("contratos").find(query).toArray();
        res.status(200).json(contratos);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Rota para obter um contrato pelo ID
app.get('/contratos/:id', async (req, res) => {
    try {
        const contrato = await req.db.collection("contratos").findOne({ idcontrato: req.params.id });
        if (contrato) {
            res.status(200).json(contrato);
        } else {
            res.status(404).send('Contrato não encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Rota para adicionar um novo contrato
app.post('/contratos', async (req, res) => {
    try {
        const resultado = await req.db.collection("contratos").insertOne(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Rota para atualizar um contrato pelo ID
app.put('/contratos/:id', async (req, res) => {
    try {
        const result = await req.db.collection("contratos").updateOne({ idcontrato: req.params.id }, { $set: req.body });
        if (result.matchedCount === 1) {
            res.status(200).send('Contrato atualizado');
        } else {
            res.status(404).send('Contrato não encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Rota para excluir um contrato pelo ID
app.delete('/contratos/:id', async (req, res) => {
    try {
        const result = await req.db.collection("contratos").deleteOne({ idcontrato: req.params.id });
        if (result.deletedCount === 1) {
            res.status(200).send('Contrato excluído');
        } else {
            res.status(404).send('Contrato não encontrado');
        }
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Rota para listar todas as entidades únicas
app.get('/contratos/entidades', async (req, res) => {
    try {
        const entidades = await req.db.collection("contratos").distinct("entidade_comunicante");
        entidades.sort();
        res.status(200).json(entidades);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Rota para listar todos os tipos de procedimento únicos
app.get('/contratos/tipos', async (req, res) => {
    try {
        const tipos = await req.db.collection("contratos").distinct("tipoprocedimento");
        tipos.sort();
        res.status(200).json(tipos);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});


