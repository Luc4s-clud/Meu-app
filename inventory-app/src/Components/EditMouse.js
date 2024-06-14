import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const EditForm = ({ usuario, onSave }) => {
    console.log('EditForm renderizado com usuário:', usuario); // Adicionando log para depuração

    const [nome, setNome] = useState(usuario.fun_nome);
    const [setor, setSetor] = useState(usuario.setor);
    const [alocado, setAlocado] = useState(usuario.alocado);

    const handleSaveClick = () => {
        onSave({ ...usuario, fun_nome: nome, setor, alocado });
    };

    return (
        <div>
            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Setor"
                value={setor}
                onChange={(e) => setSetor(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Alocado"
                value={alocado}
                onChange={(e) => setAlocado(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button onClick={handleSaveClick} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Salvar
            </Button>
        </div>
    );
};

export default EditForm;
