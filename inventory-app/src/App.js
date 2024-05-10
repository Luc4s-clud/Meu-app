import './App.css';
import ImportarNFEXml from './ImportarNFEXml'; // Certifique-se de que o caminho está correto

function App() {
  return (
    <div className="App">
            <h1>Gerenciamento de Inventário</h1>
            {/* Outros componentes podem ser adicionados aqui */}
            <ImportarNFEXml />
        </div>
  );
}

export default App;
