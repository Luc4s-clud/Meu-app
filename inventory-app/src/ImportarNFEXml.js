import React, { useState } from 'react';
import axios from 'axios';

const ImportarNFEXml = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            alert('Por favor, selecione um arquivo primeiro!');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3000/importar-xml', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Importação de XML concluída com sucesso:', response.data);
            alert('Importação de XML concluída com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao importar arquivo XML:', error);
            alert('Erro ao importar arquivo XML. Por favor, tente novamente.');
        });
    };

    return (
        <div>
            <h1>Importar Nota Fiscal XML</h1>
            <input type="file" accept=".xml" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default ImportarNFEXml;
