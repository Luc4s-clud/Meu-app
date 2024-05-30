import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const EditForm = ({ usuario, onSave }) => {
    const [nome, setNome] = useState(usuario.fun_nome);
    const [setor, setSetor] = useState(usuario.setor);
    const [alocado, setAlocado] = useState(usuario.alocado);

    const handleSaveClick = () => {
        onSave({ nome, setor, alocado });
    };

    return (
        <div>
            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
            />
            <TextField
                label="Setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
            />
            <TextField
                label="Alocado"
                value={alocado}
                onChange={(e) => setAlocado(e.target.value)}
            />
            <Button onClick={handleSaveClick}>Salvar</Button>
        </div>
    );
};

export default EditForm;
