import json

def criar_links_html():
    try:
        # Abre o arquivo mapa-virtual.json para leitura, especificando a codificação utf-8
        with open('mapa-virtual.json', 'r', encoding='utf-8') as arquivo:
            # Carrega o conteúdo JSON do arquivo
            dados = json.load(arquivo)
            # Obtém a lista de cidades e ordena por nome
            cidades = sorted(dados.get('cidades', []), key=lambda x: x['nome'].lower())

            # Cria o conteúdo HTML para os links
            links_html = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cidades</title>
    <!-- Adiciona o estilo da W3C -->
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <style>
        body {
            background-color: #add8e6;
        }
        .container {
            max-width: 600px;
            margin: auto;
            padding: 20px;
            background-color: #ffffff; /* Fundo branco */
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #009688;
            margin-top: 30px; /* Adiciona espaço entre o título e os links */
        }
        .w3-ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
        }
        .w3-hoverable li {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            transition: background-color 0.3s;
        }
        .w3-hoverable li:hover {
            background-color: #f9f9f9;
        }
        .w3-hoverable a {
            text-decoration: none;
            font-size: 18px;
            color: #333;
            text-align: center;
            display: block;
            background-color: #d3f2c3; /* Cor verde clara para os links */
            padding: 10px;
            border-radius: 5px;
            transition: background-color 0.3s ease-in-out;
        }
        .w3-hoverable a:hover {
            background-color: #a9dfbf; /* Cor dos links ao passar o mouse */
        }
    </style>
</head>
<body class="w3-container">

<div class="container">
    <h1 class="w3-center">Lista de Cidades</h1>
    <ul class="w3-ul w3-hoverable">
"""

            for cidade in cidades:
                cidade_id = cidade.get('id')
                cidade_nome = cidade.get('nome')
                link_html = f'    <li><a href="http://localhost:7777/{cidade_id}">{cidade_nome}</a></li>\n'
                links_html += link_html

            links_html += """</ul>
</div>
</body>
</html>
"""

            # Escreve o conteúdo HTML no arquivo
            with open('view/index.html', 'w', encoding='utf-8') as arquivo_html:
                arquivo_html.write(links_html)

            print("Arquivo index.html criado com sucesso.")
    except FileNotFoundError:
        print("Arquivo mapa-virtual.json não encontrado.")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

# Chama a função para criar os links HTML
criar_links_html()
