import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    AppBar, Toolbar, Typography, Container, CssBaseline, IconButton, Modal, Box, TextField, Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

const modalStyle = {
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

const tableStyle = {
    minWidth: 650,
};

const cellStyle = {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis', // Truncamento de texto
};

const noTruncateCellStyle = {
    whiteSpace: 'normal', // Não truncar texto
    wordWrap: 'break-word',
};

const Teclados = () => {
    const [teclados, setTeclados] = useState([]);
    const [erro, setErro] = useState('');
    const [tecladoEditando, setTecladoEditando] = useState(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [newTeclado, setNewTeclado] = useState({
        idioma: '', conexao: '', multimidia: '', cor: '', marca: '', modelo: '', sn: '', codigo_barras: '', setor: '', fun_codigo: '', data_aquisicao: '', data_conferencia: '', status: '', observacao: ''
    });

    useEffect(() => {
        fetchTeclados();
    }, []);

    const fetchTeclados = async () => {
        try {
            const response = await axios.get('http://192.168.1.60:3001/teclados');
            setTeclados(response.data);
        } catch (error) {
            setErro('Erro ao buscar teclados: ' + error.message);
        }
    };

    const handleEditClick = (teclado) => {
        setTecladoEditando(teclado);
        setOpen(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://192.168.1.60:3001/teclados/${id}`);
            fetchTeclados();
        } catch (error) {
            setErro('Erro ao deletar teclado: ' + error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTecladoEditando(null);
    };

    const handleSave = async () => {
        try {
            if (tecladoEditando) {
                await axios.put(`http://192.168.1.60:3001/teclados/${tecladoEditando.id}`, tecladoEditando);
            } else {
                await axios.post('http://192.168.1.60:3001/teclados', newTeclado);
            }
            fetchTeclados();
            handleClose();
        } catch (error) {
            setErro('Erro ao salvar teclado: ' + error.message);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTecladoEditando({ ...tecladoEditando, [name]: value });
    };

    const handleNewInputChange = (event) => {
        const { name, value } = event.target;
        setNewTeclado({ ...newTeclado, [name]: value });
    };

    const filteredTeclados = teclados.filter(teclado => {
        const modelo = teclado.modelo ? teclado.modelo.toLowerCase() : '';
        const codigo_barras = teclado.codigo_barras ? teclado.codigo_barras.toString() : '';
        const fun_codigo = teclado.fun_codigo ? teclado.fun_codigo.toString() : '';
        const fun_nome = teclado.fun_nome ? teclado.fun_nome.toLowerCase() : '';
        return modelo.includes(search.toLowerCase()) ||
               codigo_barras.includes(search) ||
               fun_codigo.includes(search) ||
               fun_nome.includes(search.toLowerCase());
    });

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Gerenciamento de Teclados
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, paddingLeft: 2, paddingRight: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Lista de Teclados
                    </Typography>
                    <TextField
                        label="Pesquisar"
                        variant="outlined"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                >
                    Adicionar Teclado
                </Button>
                {erro && <Typography color="error">{erro}</Typography>}
                <TableContainer component={Paper}>
                    <Table sx={tableStyle}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={noTruncateCellStyle}>ID</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Idioma</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Conexão</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Multimídia</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Cor</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Marca</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Modelo</TableCell>
                                <TableCell sx={noTruncateCellStyle}>SN</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Código de Barras</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Setor</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Código do Funcionário</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Funcionário</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Data Aquisição</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Data Conferência</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Status</TableCell>
                                <TableCell sx={cellStyle}>Observação</TableCell>
                                <TableCell sx={noTruncateCellStyle}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredTeclados.map(teclado => (
                                <TableRow key={teclado.id}>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.id}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.idioma}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.conexao}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.multimidia}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.cor}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.marca}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.modelo}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.sn}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.codigo_barras}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.setor}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.fun_codigo}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.fun_nome}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.data_aquisicao}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.data_conferencia}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>{teclado.status}</TableCell>
                                    <TableCell sx={cellStyle}>{teclado.observacao}</TableCell>
                                    <TableCell sx={noTruncateCellStyle}>
                                        <IconButton onClick={() => handleEditClick(teclado)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(teclado.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modalStyle}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {tecladoEditando ? 'Editando Teclado' : 'Adicionando Teclado'}
                        </Typography>
                        <form>
                            <TextField
                                label="Idioma"
                                name="idioma"
                                value={tecladoEditando ? tecladoEditando.idioma : newTeclado.idioma}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Conexão"
                                name="conexao"
                                value={tecladoEditando ? tecladoEditando.conexao : newTeclado.conexao}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Multimídia"
                                name="multimidia"
                                value={tecladoEditando ? tecladoEditando.multimidia : newTeclado.multimidia}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Cor"
                                name="cor"
                                value={tecladoEditando ? tecladoEditando.cor : newTeclado.cor}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Marca"
                                name="marca"
                                value={tecladoEditando ? tecladoEditando.marca : newTeclado.marca}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Modelo"
                                name="modelo"
                                value={tecladoEditando ? tecladoEditando.modelo : newTeclado.modelo}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="SN"
                                name="sn"
                                value={tecladoEditando ? tecladoEditando.sn : newTeclado.sn}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Código de Barras"
                                name="codigo_barras"
                                value={tecladoEditando ? tecladoEditando.codigo_barras : newTeclado.codigo_barras}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Setor"
                                name="setor"
                                value={tecladoEditando ? tecladoEditando.setor : newTeclado.setor}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Função Código"
                                name="fun_codigo"
                                value={tecladoEditando ? tecladoEditando.fun_codigo : newTeclado.fun_codigo}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Data Aquisição"
                                name="data_aquisicao"
                                value={tecladoEditando ? tecladoEditando.data_aquisicao : newTeclado.data_aquisicao}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Data Conferência"
                                name="data_conferencia"
                                value={tecladoEditando ? tecladoEditando.data_conferencia : newTeclado.data_conferencia}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Status"
                                name="status"
                                value={tecladoEditando ? tecladoEditando.status : newTeclado.status}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Observação"
                                name="observacao"
                                value={tecladoEditando ? tecladoEditando.observacao : newTeclado.observacao}
                                onChange={tecladoEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                {tecladoEditando ? 'Salvar Alterações' : 'Adicionar Teclado'}
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </Container>
        </React.Fragment>
    );
};

export default Teclados;
