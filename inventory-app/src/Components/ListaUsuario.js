import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    AppBar, Toolbar, Typography, Container, CssBaseline, IconButton
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import EditForm from './EditForm'; // Importe o componente EditForm aqui

const ListaUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState('');
    const [usuarioEditando, setUsuarioEditando] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/usuario')
            .then(response => {
                setUsuarios(response.data);
            })
            .catch(error => {
                setErro('Erro ao buscar usuários: ' + error.message);
            });
    }, []);

    const handleEditClick = (codigo) => {
        const usuario = usuarios.find(u => u.fun_codigo === codigo);
        setUsuarioEditando(usuario);
    };

    const handleSave = () => {
        console.log('Salvando usuário...');
        // Restante do código de salvar
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Gerenciamento de Inventário
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Lista de Usuários
                </Typography>
                {erro && <Typography color="error">{erro}</Typography>}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Setor</TableCell>
                                <TableCell>Alocado</TableCell>
                                <TableCell>Editar</TableCell> {/* Nova coluna para o botão de edição */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map(usuario => (
                                <TableRow key={usuario.fun_codigo}>
                                    <TableCell>{usuario.fun_codigo}</TableCell>
                                    <TableCell>{usuario.fun_nome}</TableCell>
                                    <TableCell>{usuario.setor}</TableCell>
                                    <TableCell>{usuario.alocado}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleEditClick(usuario.fun_codigo)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {usuarioEditando && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <EditForm usuario={usuarioEditando} onSave={handleSave} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </React.Fragment>
    );
};

export default ListaUsuario;
