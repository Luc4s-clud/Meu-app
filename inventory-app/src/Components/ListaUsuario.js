import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    AppBar, Toolbar, Typography, Container, CssBaseline, IconButton, Modal, Box, TextField
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import EditForm from './EditMouse.js';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ListaUsuario = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [erro, setErro] = useState('');
    const [usuarioEditando, setUsuarioEditando] = useState(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState(''); // Estado para a pesquisa

    useEffect(() => {
        axios.get('http://192.168.1.60:3001/usuario')
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
        console.log('Editando usuário:', usuario); // Log para depuração
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUsuarioEditando(null);
    };

    const handleSave = (updatedUsuario) => {
        console.log('Salvando usuário...', updatedUsuario);
        axios.put(`http://192.168.1.60:3001/usuario/${updatedUsuario.fun_codigo}`, updatedUsuario)
            .then(response => {
                setUsuarios(prevUsuarios => prevUsuarios.map(u => u.fun_codigo === updatedUsuario.fun_codigo ? updatedUsuario : u));
                handleClose();
            })
            .catch(error => {
                setErro('Erro ao salvar usuário: ' + error.message);
            });
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const filteredUsuarios = usuarios.filter(usuario =>
        usuario.fun_nome.toLowerCase().includes(search.toLowerCase()) ||
        usuario.fun_codigo.toString().includes(search)
    );

    console.log('usuarioEditando:', usuarioEditando); // Log para depuração

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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Lista de Usuários
                    </Typography>
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Box>
                {erro && <Typography color="error">{erro}</Typography>}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Código</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell>Setor</TableCell>
                                <TableCell>Alocado</TableCell>
                                <TableCell>Editar</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsuarios.map(usuario => (
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
                        </TableBody>
                    </Table>
                </TableContainer>
                {usuarioEditando && (
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Editando Usuário
                            </Typography>
                            <EditForm usuario={usuarioEditando} onSave={handleSave} />
                        </Box>
                    </Modal>
                )}
            </Container>
        </React.Fragment>
    );
};

export default ListaUsuario;
