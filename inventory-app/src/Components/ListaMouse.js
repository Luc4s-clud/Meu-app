import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    AppBar, Toolbar, Typography, Container, CssBaseline, IconButton, Modal, Box, TextField, Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import '../styles/ListaMouse.css'; // Importar o arquivo CSS

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

const Mouses = () => {
    const [mouses, setMouses] = useState([]);
    const [erro, setErro] = useState('');
    const [mouseEditando, setMouseEditando] = useState(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [newMouse, setNewMouse] = useState({
        Scroll: '', Tipo: '', Conexao: '', Cor: '', SN: '', Marca: '', Modelo: '', Codigo_Barras: '', SETOR: '', FUN_CODIGO: '', Data_Aquisicao: '', Data_Conferencia: '', Garantia_Meses: '', Status: '', Observacao: ''
    });

    const tableContainerRef = useRef(null);

    useEffect(() => {
        fetchMouses();
    }, []);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop = tableContainerRef.current.scrollHeight;
        }
    }, [mouses]);

    const fetchMouses = async () => {
        try {
            const response = await axios.get('http://192.168.1.60:3001/mouse');
            setMouses(response.data);
        } catch (error) {
            setErro('Erro ao buscar mouses: ' + error.message);
        }
    };

    const handleEditClick = (mouse) => {
        setMouseEditando(mouse);
        setOpen(true);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://192.168.1.60:3001/mouse/${id}`);
            fetchMouses();
        } catch (error) {
            setErro('Erro ao deletar mouse: ' + error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setMouseEditando(null);
    };

    const handleSave = async () => {
        try {
            if (mouseEditando) {
                await axios.put(`http://192.168.1.60:3001/mouse/${mouseEditando.id}`, mouseEditando);
            } else {
                await axios.post('http://192.168.1.60:3001/mouse', newMouse);
            }
            fetchMouses();
            handleClose();
        } catch (error) {
            setErro('Erro ao salvar mouse: ' + error.message);
        }
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMouseEditando({ ...mouseEditando, [name]: value });
    };

    const handleNewInputChange = (event) => {
        const { name, value } = event.target;
        setNewMouse({ ...newMouse, [name]: value });
    };

    const filteredMouses = mouses.filter(mouse => {
        const modelo = mouse.Modelo ? mouse.Modelo.toLowerCase() : '';
        const codigo_barras = mouse.Codigo_Barras ? mouse.Codigo_Barras.toString() : '';
        const fun_codigo = mouse.FUN_CODIGO ? mouse.FUN_CODIGO.toString() : '';
        const fun_nome = mouse.FUN_NOME ? mouse.FUN_NOME.toLowerCase() : '';
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
                        Gerenciamento de Mouses
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth={false} sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2, paddingLeft: 2, paddingRight: 2 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Lista de Mouses
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
                    Adicionar Mouse
                </Button>
                {erro && <Typography color="error">{erro}</Typography>}
                <TableContainer component={Paper} className="table-container" ref={tableContainerRef}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell className="no-truncate-cell">ID</TableCell>
                                <TableCell className="no-truncate-cell">Scroll</TableCell>
                                <TableCell className="no-truncate-cell">Tipo</TableCell>
                                <TableCell className="no-truncate-cell">Conexão</TableCell>
                                <TableCell className="no-truncate-cell">Cor</TableCell>
                                <TableCell className="no-truncate-cell">Marca</TableCell>
                                <TableCell className="no-truncate-cell">Modelo</TableCell>
                                <TableCell className="no-truncate-cell">SN</TableCell>
                                <TableCell className="no-truncate-cell">Código de Barras</TableCell>
                                <TableCell className="no-truncate-cell">Setor</TableCell>
                                <TableCell className="no-truncate-cell">Código do Funcionário</TableCell>
                                <TableCell className="no-truncate-cell">Funcionário</TableCell>
                                <TableCell className="no-truncate-cell">Data Aquisição</TableCell>
                                <TableCell className="no-truncate-cell">Data Conferência</TableCell>
                                <TableCell className="no-truncate-cell">Garantia (Meses)</TableCell>
                                <TableCell className="no-truncate-cell">Status</TableCell>
                                <TableCell className="table-cell">Observação</TableCell>
                                <TableCell className="no-truncate-cell">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMouses.map(mouse => (
                                <TableRow key={mouse.id}>
                                    <TableCell className="no-truncate-cell">{mouse.id}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Scroll}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Tipo}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Conexao}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Cor}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Marca}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Modelo}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.SN}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Codigo_Barras}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.SETOR}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.FUN_CODIGO}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.FUN_NOME}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Data_Aquisicao}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Data_Conferencia}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Garantia_Meses}</TableCell>
                                    <TableCell className="no-truncate-cell">{mouse.Status}</TableCell>
                                    <TableCell className="table-cell">{mouse.Observacao}</TableCell>
                                    <TableCell className="no-truncate-cell">
                                        <IconButton onClick={() => handleEditClick(mouse)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(mouse.id)}>
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
                    <Box className="modal-style">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {mouseEditando ? 'Editando Mouse' : 'Adicionando Mouse'}
                        </Typography>
                        <form>
                            <TextField
                                label="Scroll"
                                name="Scroll"
                                value={mouseEditando ? mouseEditando.Scroll : newMouse.Scroll}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Tipo"
                                name="Tipo"
                                value={mouseEditando ? mouseEditando.Tipo : newMouse.Tipo}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Conexão"
                                name="Conexao"
                                value={mouseEditando ? mouseEditando.Conexao : newMouse.Conexao}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Cor"
                                name="Cor"
                                value={mouseEditando ? mouseEditando.Cor : newMouse.Cor}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Marca"
                                name="Marca"
                                value={mouseEditando ? mouseEditando.Marca : newMouse.Marca}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Modelo"
                                name="Modelo"
                                value={mouseEditando ? mouseEditando.Modelo : newMouse.Modelo}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="SN"
                                name="SN"
                                value={mouseEditando ? mouseEditando.SN : newMouse.SN}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Código de Barras"
                                name="Codigo_Barras"
                                value={mouseEditando ? mouseEditando.Codigo_Barras : newMouse.Codigo_Barras}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Setor"
                                name="SETOR"
                                value={mouseEditando ? mouseEditando.SETOR : newMouse.SETOR}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Função Código"
                                name="FUN_CODIGO"
                                value={mouseEditando ? mouseEditando.FUN_CODIGO : newMouse.FUN_CODIGO}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Data Aquisição"
                                name="Data_Aquisicao"
                                value={mouseEditando ? mouseEditando.Data_Aquisicao : newMouse.Data_Aquisicao}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Data Conferência"
                                name="Data_Conferencia"
                                value={mouseEditando ? mouseEditando.Data_Conferencia : newMouse.Data_Conferencia}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Garantia (Meses)"
                                name="Garantia_Meses"
                                value={mouseEditando ? mouseEditando.Garantia_Meses : newMouse.Garantia_Meses}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Status"
                                name="Status"
                                value={mouseEditando ? mouseEditando.Status : newMouse.Status}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Observação"
                                name="Observacao"
                                value={mouseEditando ? mouseEditando.Observacao : newMouse.Observacao}
                                onChange={mouseEditando ? handleInputChange : handleNewInputChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button onClick={handleSave} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                                {mouseEditando ? 'Salvar Alterações' : 'Adicionar Mouse'}
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </Container>
        </React.Fragment>
    );
};

export default Mouses;
