ENGWEB2024-Normal
Este projeto implementa uma aplicação web para gerir registos de contratos públicos, envolvendo uma base de dados MongoDB e um servidor Express. A aplicação consiste em duas partes principais: uma API de dados e uma interface de utilizador. Abaixo está um resumo da configuração e funcionalidades.

Estrutura do Projeto
Importação de Dados (import.py)

Lê dados do ficheiro contratos2024.csv
Limpa e formata os dados
Insere os dados no MongoDB
Serviço de API (serv.js)

Corre na porta 16000
Fornece endpoints para:
Listar todos os contratos
Obter contrato por ID
Filtrar contratos por entidade ou tipo
Listar entidades e tipos únicos
Adicionar, atualizar, eliminar contratos
Interface Web (app.js)

Corre na porta 16001
Usa Pug para renderização de views
Exibe contratos e entidades de forma amigável
Endpoints da API
GET /contratos: Lista todos os contratos
GET /contratos/:id: Obter contrato por ID
GET /contratos?entidade=EEE: Filtrar contratos por entidade
GET /contratos?tipo=AAA: Filtrar contratos por tipo
GET /contratos/entidades: Listar entidades únicas
GET /contratos/tipos: Listar tipos únicos
POST /contratos: Adicionar um novo contrato
PUT /contratos/:id: Atualizar um contrato
DELETE /contratos/:id: Eliminar um contrato


Interface de Utilizador
Página Principal (/): Lista todos os contratos
Página de Contrato (/:id): Mostra detalhes de um contrato específico
Página de Entidade (/entidades/:nipc): Mostra contratos relacionados a uma entidade específica, com o valor total dos contratos
Esta configuração garante um sistema abrangente e interativo para gestão de registos de contratos públicos, aproveitando as capacidades do Node.js, Express e MongoDB.






