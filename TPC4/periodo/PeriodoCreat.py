import json

# Abrir o arquivo JSON localmente com a codificação UTF-8
with open('../compositores.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Verificar e adicionar a seção "periodos" se não existir localmente
if 'periodos' not in data:
    data['periodos'] = []

# Criar um conjunto para armazenar os nomes dos períodos já presentes nos dados
periodos_existentes = set(periodo['nome'] for periodo in data.get('periodos', []))

# Analisar os diferentes períodos associados aos compositores
if 'compositores' in data:
    compositores = data['compositores']
    for compositor in compositores:
        if 'periodo' in compositor:
            periodo_nome = compositor['periodo']
            if periodo_nome not in periodos_existentes:
                periodo = {
                    "id": "P" + str(len(data['periodos']) + 1),
                    "nome": periodo_nome,
                    "descricao": ""  # Você pode ajustar essa descrição conforme necessário
                }
                data['periodos'].append(periodo)
                periodos_existentes.add(periodo_nome)
            else:
                print(f"Período '{periodo_nome}' já existe, não será adicionado novamente.")

    # Escrever de volta para o arquivo JSON
    with open('../compositores.json', 'w') as file:
        json.dump(data, file, indent=4)

    print("Dados de períodos atualizados no arquivo compositores.json")
else:
    print("Não foram encontrados dados de compositores no arquivo compositores.json")
