import pandas as pd
from pymongo import MongoClient

# Definir o caminho do arquivo CSV
csv_file_path = 'contratos2024.csv'

# Ler o arquivo CSV
data = pd.read_csv(csv_file_path, sep=';', encoding='utf-8')

# Converter colunas numéricas e datas
data['nAnuncio'] = data['nAnuncio'].fillna('')
data['precoContratual'] = data['precoContratual'].str.replace(',', '.').astype(float)
data['dataPublicacao'] = pd.to_datetime(data['dataPublicacao'], format='%d/%m/%Y')
data['dataCelebracaoContrato'] = pd.to_datetime(data['dataCelebracaoContrato'], format='%d/%m/%Y')

# Conectar ao MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['contratos']  # Nome da base de dados
collection = db['contratos']  # Nome da coleção

# Converter o dataframe para uma lista de dicionários
data_dict = data.to_dict(orient='records')

# Inserir os dados no MongoDB
collection.insert_many(data_dict)

print("Dados importados com sucesso!")

# Buscar os 5 primeiros documentos na coleção
first_five_documents = collection.find().limit(5)

# Imprimir os 5 primeiros documentos
for doc in first_five_documents:
    print(doc)
