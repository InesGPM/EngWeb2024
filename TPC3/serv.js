const http = require('http');
const url = require('url');
const fs = require('fs');
const querystring = require('querystring');
const axios = require('axios'); // Adicione esta linha para importar o Axios


http.createServer(function(req, res) {
    var q = url.parse(req.url, true).pathname.slice(1);
    console.log(q);
    if (q === '') {
        serveFile('index.html', 'text/html; charset=utf-8', res);
    }else if (q === 'filmes') {
        if (req.method === 'GET') {
            serveFile('filmes/menuF.html', 'text/html; charset=utf-8', res);
        }
    } else if (/filmes\/[a-zA-Z0-9]+/.test(q)) {
        q = q.split('/')[1];
        // Lógica para visualizar um compositor específico
        fs.readFile('filmes_corrigidos.json', function(err, data) {
            if (err) {
                sendError(res);
            } else {
                try {
                    // Tenta parsear o JSON
                    const jsonData = JSON.parse(data);

                    // Verifica se a propriedade 'compositores' existe no JSON
                    if (jsonData && jsonData.filmes) {
                        ids = jsonData.filmes.map(filmes => filmes._id);

                        if (ids.includes(q)) {
                            serveFile('filmes/filme.html', 'text/html; charset=utf-8', res);
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
    }else if (q === 'atores') {
        if (req.method === 'GET') {
            serveFile('atores/menuA.html', 'text/html; charset=utf-8', res);
        }
    } else if (/atores\/[a-zA-Z0-9]+/.test(q)) {
        q = q.split('/')[1];
        // Lógica para visualizar um compositor específico
        fs.readFile('filmes_corrigidos.json', function(err, data) {
            if (err) {
                sendError(res);
            } else {
                try {
                    // Tenta parsear o JSON
                    const jsonData = JSON.parse(data);

                    // Verifica se a propriedade 'compositores' existe no JSON
                    if (jsonData && jsonData.atores) {
                        ids = jsonData.atores.map(atores => atores.id);

                        if (ids.includes(q)) {
                            serveFile('atores/ator.html', 'text/html; charset=utf-8', res);
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
    }else if (q === 'generos') {
        if (req.method === 'GET') {
            serveFile('generos/menuG.html', 'text/html; charset=utf-8', res);
        }
    } else if (/generos\/[a-zA-Z0-9]+/.test(q)) {
        q = q.split('/')[1];
        // Lógica para visualizar um compositor específico
        fs.readFile('filmes_corrigidos.json', function(err, data) {
            if (err) {
                sendError(res);
            } else {
                try {
                    // Tenta parsear o JSON
                    const jsonData = JSON.parse(data);

                    // Verifica se a propriedade 'compositores' existe no JSON
                    if (jsonData && jsonData.generos) {
                        ids = jsonData.generos.map(generos => generos.id);
                        if (ids.includes(q)) {
                            serveFile('generos/genero.html', 'text/html; charset=utf-8', res);
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


console.log("Ouvir em http://localhost:7777/");
