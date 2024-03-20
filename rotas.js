//rotas.js

var express = require('express');
var router = express.Router();
var axios = require('axios');

// Função para lidar com requisições GET
function handleGetRequest(res, page, data) {
    var d = new Date().toISOString().substring(0, 16);
    res.status(200).render(page, { ...data, date: d });
}


router.get('/', function(req, res, next) {
    res.render("index");
  });

// Rota para listar compositores
router.get('/compositores', function(req, res, next) {
    axios.get("http://localhost:3000/compositores?_sort=nome")
        .then(resp => {
            handleGetRequest(res, "menuC", { lCompositores: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para exibir formulário de registro de compositor
router.get('/compositores/adicionarC', function(req, res, next) {
    handleGetRequest(res, "adicionarC");
});

// Rota para exibir informações de um compositor
router.get('/compositores/:idCompositor', function(req, res, next) {
    axios.get(`http://localhost:3000/compositores/${req.params.idCompositor}`)
        .then(resp => {
            handleGetRequest(res, "compositor", { compositor: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para exibir formulário de edição de compositor
router.get('/compositores/editarC/:idCompositor', function(req, res, next) {
    axios.get(`http://localhost:3000/compositores/${req.params.idCompositor}`)
        .then(resp => {
            handleGetRequest(res, "editarC", { compositor: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para exibir formulário de edição de compositor
router.get('/compositores/apagarC/:idCompositor', function(req, res, next) {
    axios.get(`http://localhost:3000/compositores/${req.params.idCompositor}`)
        .then(resp => {
            handleGetRequest(res, "apagarC", { compositor: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

router.post('/compositores/adicionarC', function(req, res, next) {
    axios.get(`http://localhost:3000/compositores`)
        .then(resp => {
            const numCompositores = resp.data.length; // Obtém o número de compositores existentes
            console.log("Informações su:", numCompositores);
            const novoID = "C" + (numCompositores + 1); // Gera o novo ID do compositor
            req.body.id = novoID; // Define o ID do novo compositor nos dados recebidos do formulário
            console.log("Informações submetidas:", req.body);
            axios.post("http://localhost:3000/compositores", req.body)
                .then(response => {
                    res.redirect("/compositores");
                })
                .catch(error => {
                    res.status(502).render('error', { error: error });
                });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});



// Rota para lidar com a edição de um compositor
router.post('/compositores/editarC/:idCompositor', function(req, res, next) {
    axios.put(`http://localhost:3000/compositores/${req.params.idCompositor}`, req.body)
        .then(response => {
            res.redirect("/compositores");
        })
        .catch(error => {
            res.status(502).render('error', { error: error });
        });

});



// Rota para lidar com a exclusão de um compositor
router.post('/compositores/apagarC/:idCompositor', function(req, res, next) {
    axios.delete(`http://localhost:3000/compositores/${req.params.idCompositor}`)
        .then(resp => {
            res.redirect("/compositores");
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});




// Rota para listar períodos
router.get('/periodos', function(req, res, next) {
    axios.get("http://localhost:3000/periodos?_sort=nome")
        .then(resp => {
            handleGetRequest(res, "menuP", { lPeriodos: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para exibir formulário de registro de período
router.get('/periodos/adicionarP', function(req, res, next) {
    handleGetRequest(res, "adicionarP");
});

// Rota para exibir informações de um período
router.get('/periodos/:idPeriodo', function(req, res, next) {
    axios.get(`http://localhost:3000/periodos/${req.params.idPeriodo}`)
        .then(resp => {
            handleGetRequest(res, "periodo", { periodo: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para exibir formulário de edição de período
router.get('/periodos/editarP/:idPeriodo', function(req, res, next) {
    axios.get(`http://localhost:3000/periodos/${req.params.idPeriodo}`)
        .then(resp => {
            handleGetRequest(res, "editarP", { periodo: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para exibir formulário de edição de período
router.get('/periodos/apagarP/:idPeriodo', function(req, res, next) {
    axios.get(`http://localhost:3000/periodos/${req.params.idPeriodo}`)
        .then(resp => {
            handleGetRequest(res, "apagarP", { periodo: resp.data });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

router.post('/periodos/adicionarP', function(req, res, next) {
    axios.get(`http://localhost:3000/periodos`)
        .then(resp => {
            const numPeriodos = resp.data.length; // Obtém o número de períodos existentes
            console.log("Informações su:", numPeriodos);
            const novoID = "P" + (numPeriodos + 1); // Gera o novo ID do período
            req.body.id = novoID; // Define o ID do novo período nos dados recebidos do formulário
            console.log("Informações submetidas:", req.body);
            axios.post("http://localhost:3000/periodos", req.body)
                .then(response => {
                    res.redirect("/periodos");
                })
                .catch(error => {
                    res.status(502).render('error', { error: error });
                });
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

// Rota para lidar com a edição de um período
router.post('/periodos/editarP/:idPeriodo', function(req, res, next) {
    axios.put(`http://localhost:3000/periodos/${req.params.idPeriodo}`, req.body)
        .then(response => {
            res.redirect("/periodos");
        })
        .catch(error => {
            res.status(502).render('error', { error: error });
        });
});

// Rota para lidar com a exclusão de um período
router.post('/periodos/apagarP/:idPeriodo', function(req, res, next) {
    axios.delete(`http://localhost:3000/periodos/${req.params.idPeriodo}`)
        .then(resp => {
            res.redirect("/periodos");
        })
        .catch(erro => {
            res.status(500).render('error', { error: erro });
        });
});

    module.exports = router;
    