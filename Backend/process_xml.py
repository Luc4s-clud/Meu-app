import xml.etree.ElementTree as ET
import sys
import json

def process_xml(file_path):
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()

        # Log para verificar a estrutura do XML
        print(f"Root tag: {root.tag}")
        for child in root:
            print(f"Child tag: {child.tag}, attributes: {child.attrib}")

        extracted_data = []
        for det in root.findall('.//det'):
            produto = det.find('prod')
            if produto is not None:
                item = {
                    'nfe': root.findtext('.//ide/nNF'),
                    'modelo': produto.findtext('xProd'),
                    'n_serie': produto.get('nItem'),
                    'tipo': produto.findtext('cProd'),
                    'bloco': produto.findtext('cEAN'),
                    'data_aquisicao': root.findtext('.//ide/dhEmi'),
                    'obs': produto.findtext('infAdProd', default='')
                }
                print("Produto encontrado:", item)  # Log do produto encontrado
                extracted_data.append(item)

        print("Dados extraídos:", extracted_data)  # Log dos dados extraídos
        return json.dumps(extracted_data, ensure_ascii=False)

    except ET.ParseError as e:
        print(f"Erro ao parsear XML: {e}")
        return json.dumps({'error': f"Erro ao parsear XML: {e}"})

    except Exception as e:
        print(f"Erro ao processar XML: {e}")
        return json.dumps({'error': f"Erro ao processar XML: {e}"})

if __name__ == "__main__":
    file_path = sys.argv[1]
    result = process_xml(file_path)
    print(result)
