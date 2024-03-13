const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const axios = require('axios'); // Adicione esta linha para importar o Axios


http.createServer(function(req, res) {
    var q = url.parse(req.url, true).pathname.slice(1);
    if (q === '') {
        serveFile('index.html', 'text/html; charset=utf-8', res);
    } else if (/C\d+/.test(q)) {
        // Lógica para visualizar um compositor específico
        fs.readFile('compositores.json', function(err, data) {
            if (err) {
                sendError(res);
            } else {
                try {
                    // Tenta parsear o JSON
                    const jsonData = JSON.parse(data);

                    // Verifica se a propriedade 'compositores' existe no JSON
                    if (jsonData && jsonData.compositores) {
                        var ids = jsonData.compositores.map(compositor => compositor.id);

                        if (ids.includes(q)) {
                            serveFile('compositores/compositor.html', 'text/html; charset=utf-8', res);
                        } else {
                            serveFile('erro.html', 'text/html; charset=utf-8', res);
                        }
                    } else {
                        // Se 'compositores' não existir, trata como um erro
                        sendError(res);
                    }
                } catch (error) {
                    // Se houver um erro ao fazer o parse do JSON, trata como um erro
                    sendError(res);
                }
            }
        });
    } else if (q === 'compositores') {
        if (req.method === 'POST') {
            // Lógica para adicionar um compositor
            handleAddComposer(req, res);
        } else if (req.method === 'GET') {
            // Lógica para visualizar a lista de compositores
            serveFile('compositores/menuC.html', 'text/html; charset=utf-8', res);
        }
    } else if (q.startsWith('adicionarC')) {
        // Rota para exibir o formulário de adicionar um compositor
        serveFile('compositores/adicionarC.html', 'text/html; charset=utf-8', res);
    } else if (q.startsWith('editarC')) {
        // Rota para editar um compositor específico
        serveFile('compositores/editarC.html', 'text/html; charset=utf-8', res);
    } else if (q.startsWith('apagarC')) {
        // Rota para apagar um compositor específico
        serveFile('compositores/apagarC.html', 'text/html; charset=utf-8', res);
    } else if (q === 'editarc') {
        if (req.method === 'POST') {
            // Lógica para adicionar um compositor
            handleEditComposer(req, res);
        }
    }
    
    
    
    
    
    else if (/P\d+/.test(q)) {
        // Lógica para visualizar um período específico
        fs.readFile('compositores.json', function(err, data) {
            if (err) {
                sendError(res);
            } else {
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData && jsonData.periodos) {
                        var ids = jsonData.periodos.map(periodo => periodo.id);
                        if (ids.includes(q)) {
                            serveFile('periodo/periodo.html', 'text/html; charset=utf-8', res);
                        } else {
                            serveFile('erro.html', 'text/html; charset=utf-8', res);
                        }
                    } else {
                        sendError(res);
                    }
                } catch (error) {
                    sendError(res);
                }
            }
        });
    } else if (q === 'periodos') {
        if (req.method === 'POST') {
            handleAddPeriod(req, res);
        } else if (req.method === 'GET') {
            serveFile('periodo/menuP.html', 'text/html; charset=utf-8', res);
        }
    } else if (q.startsWith('adicionarP')) {
        serveFile('periodo/adicionarP.html', 'text/html; charset=utf-8', res);
    } else if (q.startsWith('editarP')) {
        serveFile('periodo/editarP.html', 'text/html; charset=utf-8', res);
    } else if (q.startsWith('apagarP')) {
        serveFile('periodo/apagarP.html', 'text/html; charset=utf-8', res);
    } else if (q === 'editarp') {
        if (req.method === 'POST') {
            handleEditPeriodo(req, res);
        }
    } else {
        serveFile('erro.html', 'text/html; charset=utf-8', res);
    }
}).listen(7777);

function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            sendError(res);
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
}

function sendError(res) {
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.write('Error reading file');
    res.end();
}

function handleAddComposer(req, res) {
    let requestBody = '';
    req.on('data', function(chunk) {
        requestBody += chunk;
    });
    req.on('end', function() {
        const formData = querystring.parse(requestBody);
        axios.post('http://localhost:3000/compositores', formData)
            .then(function (response) {
                res.writeHead(302, {'Location': '/compositores'});
                res.end();
            })
            .catch(function (error) {
                sendError(res);
            });
    });
}

function handleAddPeriod(req, res) {
    let requestBody = '';
    req.on('data', function(chunk) {
        requestBody += chunk;
    });
    req.on('end', function() {
        const formData = querystring.parse(requestBody);
        axios.post('http://localhost:3000/periodos', formData)
            .then(function (response) {
                res.writeHead(302, {'Location': '/periodos'});
                res.end();
            })
            .catch(function (error) {
                sendError(res);
            });
    });
}

function handleEditComposer(req, res) {
    let requestBody = '';
    req.on('data', function(chunk) {
        requestBody += chunk;
    });
    req.on('end', function() {
        const formData = querystring.parse(requestBody);
        const composerId = formData.id;
        axios.put(`http://localhost:3000/compositores/${composerId}`, formData)
            .then(function (response) {
                res.writeHead(302, {'Location': '/compositores'});
                res.end();
            })
            .catch(function (error) {
                sendError(res);
            });
    });
}

function handleEditPeriodo(req, res) {
    let requestBody = '';

    req.on('data', function(chunk) {
        requestBody += chunk;
    });

    req.on('end', function() {
        const formData = querystring.parse(requestBody);
        const periodoId = formData.id;

        axios.put(`http://localhost:3000/periodos/${periodoId}`, formData)
            .then(function (response) {
                res.writeHead(302, {'Location': '/periodos'});
                res.end();
            })
            .catch(function (error) {
                sendError(res);
            });
    });
}


console.log("Ouvir em http://localhost:7777/");
