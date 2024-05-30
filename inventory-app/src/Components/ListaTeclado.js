// src/components/ListaTeclados.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListaTeclados = () => {
    const [teclados, setTeclados] = useState([]);
    const [erro, setErro] = useState('');

    useEffect(() => {
        axios.get('/teclados')
            .then(response => {
                setTeclados(response.data);
            })
            .catch(error => {
                setErro('Erro ao buscar teclados: ' + error.message);
            });
    }, []);

    return (
        <div>
            <h1>Lista de Teclados</h1>
            {erro && <p>{erro}</p>}
            <ul>
                {teclados.map(teclado => (
                    <li key={teclado.id}>
                        {teclado.marca} - {teclado.modelo}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaTeclados;
