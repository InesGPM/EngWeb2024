import os
import json

def ler_mapa_virtual():
    try:
        # Abre o arquivo mapa-virtual.json para leitura, especificando a codificação utf-8
        with open('mapa-virtual.json', 'r', encoding='utf-8') as arquivo:
            # Carrega o conteúdo JSON do arquivo
            dados = json.load(arquivo)
            # Retorna a lista de cidades e ligações
            return dados.get('cidades', []), dados.get('ligacoes', [])
    except FileNotFoundError:
        print("Arquivo mapa-virtual.json não encontrado.")
        return [], []

def criar_arquivo_html_cidade(cidade, ligacoes, nomes):
    # Obtém o ID da cidade
    cidade_id = cidade.get('id')
    # Cria o nome do arquivo HTML
    nome_arquivo = f"cidades/{cidade_id}.html"

    # Cria o caminho para a pasta "cidades" se não existir
    os.makedirs(os.path.dirname(nome_arquivo), exist_ok=True)

    # Obtém as informações das ligações da cidade
    ligacoes_da_cidade = [ligacao for ligacao in ligacoes if ligacao['origem'] == cidade_id]

    # Ordena as ligações por ordem alfabética dos nomes das cidades de destino
    ligacoes_da_cidade.sort(key=lambda x: nomes[int(x['destino'][1:])-1])

    # Cria o conteúdo HTML com as informações da cidade e ligações
    conteudo_html = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>{cidade.get('nome')}</title>
        <!-- Adiciona o estilo da W3C -->
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <style>
            body {{
                background-color: #add8e6; /* Fundo azul claro */
            }}
            .container {{
                max-width: 600px;
                margin: auto;
                padding: 20px;
                background-color: #ffffff; /* Fundo branco */
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            }}
            .ligacoes-lista {{
                list-style-type: none;
                padding: 0;
            }}
            .ligacao-item {{
                margin-bottom: 10px;
            }}
            h1 {{
                color: #007bff; /* Cor azul para o título */
                text-align: center;
                font-size: 36px; /* Tamanho maior para o título */
            }}
            a.ligacao {{
                background-color: #d3f2c3; /* Cor verde clara para os botões das ligações */
                color: #333333; /* Cor do texto dos botões preto */
                text-decoration: none;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
                transition: background-color 0.3s ease-in-out;
            }}
            a.ligacao:hover {{
                background-color: #a9dfbf; /* Cor dos botões das ligações ao passar o mouse */
            }}
            a.saida {{
                background-color: #007bff; /* Cor azul para o botão de saída */
                color: #ffffff; /* Cor do texto do botão de saída branco */
                text-decoration: none;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
                transition: background-color 0.3s ease-in-out;
            }}
            a.saida:hover {{
                background-color: #0056b3; /* Cor do botão de saída ao passar o mouse */
            }}
        </style>
    </head>
    <body>

        <div class="container w3-card-4 w3-margin-top">
            <h1>{cidade.get('nome')}</h1>
            <p><strong>População:</strong> {cidade.get('população')}</p>
            <p><strong>Descrição:</strong> {cidade.get('descrição')}</p>
            <p><strong>Distrito:</strong> {cidade.get('distrito')}</p>

            <h2 class="w3-margin-top">Ligações</h2>
            <ul class="ligacoes-lista">
    """
    for ligacao in ligacoes_da_cidade:
        dest = ligacao['destino']
        dist = ligacao['distância']
        link_html = f'                <li class="ligacao-item"><a href="http://localhost:7777/{dest}" class="ligacao">{nomes[int(dest[1:])-1]} - Distância: {dist}</a></li>\n'
        conteudo_html += link_html

    conteudo_html += """
            </ul>

            <p class="w3-margin-top"><a href="http://localhost:7777" class="saida">Voltar à Página Principal</a></p>
        </div>

    </body>
    </html>
    """

    # Escreve o conteúdo HTML no arquivo
    with open(nome_arquivo, 'w', encoding='utf-8') as arquivo_html:
        arquivo_html.write(conteudo_html)

if __name__ == "__main__":
    # Lê as informações do mapa-virtual.json
    cidades, ligacoes = ler_mapa_virtual()

    nomes = [cidade['nome'] for cidade in cidades]
        
    # Para cada cidade, cria um arquivo HTML com base no ID
    for cidade in cidades:
        criar_arquivo_html_cidade(cidade, ligacoes, nomes)

    print("Arquivos HTML criados com sucesso na pasta 'cidades'.")
