import os
import xml.etree.ElementTree as ET

# Função para converter o XML para HTML
def xml_to_html(xml_caminho):
    tree = ET.parse(xml_caminho)
    root = tree.getroot()


#################################################################### Defenicoes ##############################################################################################################################################

    html = "<html><head><style>"
    html += "body { background-image: url('/Users/inesg/OneDrive/Ambiente de Trabalho/TPC1/mapa.jpg'); background-size: cover; }"  
    html += ".container { display: flex; }"  # Mantém o flexbox para exibir as imagens lado a lado
    html += ".figura { margin-right: 10px; text-align: center; }"  # Adiciona margem entre as imagens e centraliza
    html += ".figura img { width: 620px; height: auto; }"  # Ajusta o tamanho das imagens
    html += "h1{ text-align: center; font-family: 'Blackletter', 'Old English Text MT', serif; font-size: 38px}"  # Centraliza o título e poem um tipo de letra diferente
    html += ".figura p { text-align: center; font-style: italic}"  # Centraliza as legendas e poem em italico
    html += "p { text-align: left; font-size: 1.2em; }"  # Alinha os parágrafos à esquerda
    html += ".casa { margin-top: 20px; }"  # Adiciona espaço entre as informações das casas
    html += "h1 { text-decoration: underline; }"  # Adiciona sublinhado ao título
    html += "button { background-color: #a77b54; color: white; padding: 10px 20px; font-size: 16px; border-radius: 5px; cursor: pointer; transition: transform 0.3s; margin-bottom: 10px; }"  # Estilo do botão
    html += "button:hover { transform: scale(1.02); }"  # Efeito de escala no hover
    html += "</style></head><body>"


    numeroDaRua = root.find('./meta/número').text
    nomeDaRua = root.find('./meta/nome').text

############################################## Título ##################################################################################################################################################################

    # Adiciona o nomeDaRua como título
    html += f"<h1>{nomeDaRua}</h1>"

############################################## Imagens desenho #####################################################################################################################################################

    imagens = []

    for figura in root.findall('./corpo/figura'):
        figura_id = figura.get('id')
        imagem = figura.find('imagem').get('path').split("/")[-1]
        imagem_path = f"../MapaRuas-materialBase/imagem/{imagem}"
        legenda = figura.find('legenda').text

        imagens.append({
            'id': figura_id,
            'path': imagem_path,
            'legenda': legenda
        })

    html += '<div class="container">\n'
    for imagem in imagens:
        html += f'    <div class="figura" id="{imagem["id"]}">\n'
        html += f'        <img src="{imagem["path"]}" alt="{imagem["id"]}">\n'
        html += f'        <p>{imagem["legenda"]}</p>\n'
        html += '    </div>\n'
    html += '</div>'

################################################ Paragrafos ################################################################

    for p in root.findall('./corpo/para'):
        paragrafo = ''

        # Processa o texto do parágrafo
        if p.text is not None:
            texto = p.text
            paragrafo += texto

        for elemento in p:
            if elemento.tag == 'lugar':
                if elemento.text is not None:
                    lugar_text = elemento.text
                    paragrafo += f' <strong>{lugar_text}</strong> '
            elif elemento.tag == 'data':
                if elemento.text is not None:
                    data_text = elemento.text
                    paragrafo += f' <em>{data_text}</em> '
            elif elemento.tag == 'entidade' and elemento.get('tipo') == 'instituição':
                if elemento.text is not None:
                    inst_text = elemento.text
                    paragrafo += f' <strong><em>{inst_text}</strong></em> '
            else:
                if elemento.text is not None:
                    paragrafo += f' {elemento.text} '
            # Processa o texto restante após os elementos filho
            if elemento.tail is not None:
                paragrafo += elemento.tail

        html += f'<p>{paragrafo}</p>\n'

############################################# Imagens atuais #########################################################

    imagens_atuais = []

    # Obtém o diretório da pasta 'atual' correspondente ao número da rua
    diretorio_atual = f'/Users/inesg/OneDrive/Ambiente de Trabalho/TPC1/MapaRuas-materialBase/atual/'

    # Verifica se o diretório existe
    if os.path.exists(diretorio_atual):
        # Itera sobre os arquivos na pasta 'atual'
        for nome_arquivo in os.listdir(diretorio_atual):
            if nome_arquivo.lower().endswith('.jpg') and nome_arquivo.startswith(f"{numeroDaRua}-"):
                imagem_path = os.path.join(diretorio_atual, nome_arquivo)
                imagens_atuais.append({
                    'path': imagem_path,
                    'alt': f'{nomeDaRua}'
                })

        # Adiciona as imagens atuais ao HTML
        html += '<div class="container">\n'
        for imagem_atual in imagens_atuais:
            html += f'    <div class="figura">\n'
            html += f'        <img src="{imagem_atual["path"]}" alt="{imagem_atual["alt"]}">\n'
            html += f'        <p>{imagem_atual["alt"]}</p>\n'
            html += '    </div>\n'
        html += '</div>'

############################################# Lista de Casas #########################################################

    lista_casas = root.find('./corpo/lista-casas')
    if lista_casas is not None:
        for casa in lista_casas.findall('casa'):
            numero_casa = casa.find('número').text
            enfiteuta_element = casa.find('enfiteuta')
            enfiteuta = enfiteuta_element.text if enfiteuta_element is not None else "Enfiteuta não encontrado"

            foro_element = casa.find('foro')
            foro = foro_element.text if foro_element is not None else "Foro não encontrado"

            desc_element = casa.find('desc/para')
            if desc_element is not None:
                desc = '<desc><para>'
                # Processa o texto do parágrafo
                texto = desc_element.text.strip() if desc_element.text else ''
                desc += texto

                # Processa os elementos filhos do parágrafo
                for elemento in desc_element:
                    if elemento.tag == 'lugar':
                        lugar_text = elemento.text if elemento.text else ''
                        desc += f' <lugar>{lugar_text}</lugar> '
                    elif elemento.tag == 'data':
                        data_text = elemento.text if elemento.text else ''
                        desc += f' <data>{data_text}</data> '
                    elif elemento.tag == 'entidade' and elemento.get('tipo') == 'instituição':
                        entidade_text = elemento.text if elemento.text else ''
                        desc += f' <entidade tipo="{elemento.get("tipo")}">{entidade_text}</entidade> '
                    else:
                        resto = elemento.text if elemento.text else ''
                        desc += f' {resto} '

                    # Processa o texto restante após os elementos filho
                    if elemento.tail:
                        desc += elemento.tail.strip()
                desc += '</para></desc>'
            else:
                desc = "Descrição não encontrada"

            html += f'<h2><u>Casa {numero_casa}</u></h2>\n'
            html += f'<p><strong>Enfiteuta:</strong> {enfiteuta}</p>\n'
            html += f'<p><strong>Foro:</strong> {foro}</p>\n'
            html += f'<p><strong>Descrição:</strong> {desc}</p>\n'

############################################ Botão de Volta ##########################################################

    html += '<div style="text-align: center; margin-top: 20px;">'
    html += '    <button style="background-color: #a77b54; color: black; padding: 10px 20px; font-size: 16px; border: none; border-radius: 5px; cursor: pointer; transition: transform 0.3s; margin-bottom: 10px;" '
    html += '            onmouseover="this.style.backgroundColor=\'#ffdd00\'; this.style.transform=\'scale(1.02)\';" '
    html += '            onmouseout="this.style.backgroundColor=\'#a77b54\'; this.style.transform=\'scale(1)\';" '
    html += '            onclick="window.location.href=\'/Users/inesg/OneDrive/Ambiente de Trabalho/TPC1/index.html\'">Voltar à Página Inicial</button>'
    html += '</div>'


    html += "</body></html>"

    return html

# Diretório que contém os arquivos XML
diretorio_xml = "/Users/inesg/OneDrive/Ambiente de Trabalho/TPC1/MapaRuas-materialBase/texto"

# Cria a pasta "interfaces" em /Users/inesg/OneDrive/Ambiente de Trabalho/TPC1
pasta_interfaces = os.path.join("/Users/inesg/OneDrive/Ambiente de Trabalho/TPC1", "interfaces")
os.makedirs(pasta_interfaces, exist_ok=True)

# Itera sobre os arquivos XML no diretório
for nome_arquivo in os.listdir(diretorio_xml):
    if nome_arquivo.endswith(".xml"):
        xml_caminho = os.path.join(diretorio_xml, nome_arquivo)

        # Leitura do arquivo XML
        with open(xml_caminho, "r", encoding="utf-8") as file:
            xml_content = file.read()

        # Conversão do XML para HTML
        html_content = xml_to_html(xml_caminho)
        numeroDaRua = nome_arquivo.split('-')[1]
        # Salva o conteúdo HTML em um arquivo dentro da pasta "interfaces"
        saida_html = os.path.join(pasta_interfaces,  f"{numeroDaRua}.html")
        with open(saida_html, "w", encoding="utf-8") as output_file:
            output_file.write(html_content)

print("Arquivos HTML foram gerados com sucesso.")
