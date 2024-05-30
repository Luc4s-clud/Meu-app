// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ListaUsuario from './Components/ListaUsuario';
import ListaTeclado from './Components/ListaTeclado';
// Importar outros componentes aqui
// import ListaTeclados from './components/ListaTeclados';

function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>Gerenciamento de Inventário</h1>
                    <nav>
                        <ul>
                            <li><Link to="/usuario">Usuários</Link></li>
                            <li><Link to="/teclado">Teclados</Link></li>
                            {/* Adicione mais links conforme necessário */}
                        </ul>
                    </nav>
                </header>
                <main>
                    <Routes>
                        <Route path="/usuario" element={<ListaUsuario />} />
                        <Route path="/teclado" element={<ListaTeclado/>} /> {/* Substituir com o componente real */}
                        {/* Adicione mais rotas conforme necessário */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
