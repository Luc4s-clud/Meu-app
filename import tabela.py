import pandas as pd
from sqlalchemy import create_engine

# Configurações do banco de dados MySQL
user = 'root'
password = 'Luca8428'
host = 'localhost'
database = 'inventoryapp'


# Crie a conexão com o banco de dados
engine = create_engine(f'mysql+mysqlconnector://{user}:{password}@{host}/{database}')

# Caminho para o arquivo Excel
excel_path = "C:\\TESTES\\INVENTARIO\\App-inventario-avioeste\\Teste.xlsx"

# Liste todas as abas do arquivo Excel
xls = pd.ExcelFile(excel_path)
print("Abas disponíveis no arquivo Excel:", xls.sheet_names)

# Nome da aba correto
sheet_name = 'MOUSE'

# Verifique se a aba está no arquivo Excel
if sheet_name in xls.sheet_names:
    df = pd.read_excel(excel_path, sheet_name=sheet_name)
    # Escreva o dataframe no banco de dados MySQL
    df.to_sql('nome_da_tabela', con=engine, if_exists='replace', index=False)  # Substitua 'nome_da_tabela' pelo nome desejado para a tabela no banco de dados
    print("Importação concluída com sucesso!")
else:
    print(f"A aba '{sheet_name}' não foi encontrada. As abas disponíveis são: {xls.sheet_names}")