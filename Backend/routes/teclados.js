const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para listar todos os teclados
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Teclados';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar teclados:', err);
            res.status(500).send('Erro ao buscar teclados');
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um teclado específico por ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Teclados WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar teclado:', err);
            res.status(500).send('Erro ao buscar teclado');
            return;
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo teclado
router.post('/', (req, res) => {
    const { idioma, conexao, multimidia, cor, marca, modelo, sn, codigo_barras, setor, fun_codigo, data_aquisicao, data_conferencia, status, observacao } = req.body;
    const sql = 'INSERT INTO Teclados (idioma, conexao, multimidia, cor, marca, modelo, sn, codigo_barras, setor, fun_codigo, data_aquisicao, data_conferencia, status, observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [idioma, conexao, multimidia, cor, marca, modelo, sn, codigo_barras, setor, fun_codigo, data_aquisicao, data_conferencia, status, observacao];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao adicionar teclado:', err);
            res.status(500).send('Erro ao adicionar teclado');
            return;
        }
        res.status(201).send('Teclado adicionado com sucesso');
    });
});

// Rota para atualizar um teclado
router.put('/:id', (req, res) => {
    const { idioma, conexao, multimidia, cor, marca, modelo, sn, codigo_barras, setor, fun_codigo, data_aquisicao, data_conferencia, status, observacao } = req.body;
    const sql = 'UPDATE Teclados SET idioma = ?, conexao = ?, multimidia = ?, cor = ?, marca = ?, modelo = ?, sn = ?, codigo_barras = ?, setor = ?, fun_codigo = ?, data_aquisicao = ?, data_conferencia = ?, status = ?, observacao = ? WHERE id = ?';
    const values = [idioma, conexao, multimidia, cor, marca, modelo, sn, codigo_barras, setor, fun_codigo, data_aquisicao, data_conferencia, status, observacao, req.params.id];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar teclado:', err);
            res.status(500).send('Erro ao atualizar teclado');
            return;
        }
        res.send('Teclado atualizado com sucesso');
    });
});

// Rota para deletar um teclado
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM Teclados WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar teclado:', err);
            res.status(500).send('Erro ao deletar teclado');
            return;
        }
        res.send('Teclado deletado com sucesso');
    });
});

// Rota para buscar um teclado por código de barras
router.get('/codigo_barras/:codigo', (req, res) => {
    const sql = 'SELECT * FROM Teclados WHERE codigo_barras = ?';
    const codigo = req.params.codigo;
    db.query(sql, [codigo], (err, results) => {
        if (err) {
            console.error('Erro ao buscar teclado por código de barras:', err);
            res.status(500).send('Erro ao buscar teclado por código de barras');
            return;
        }
        res.json(results);
    });
});

// Rota para buscar teclados por nome do usuário
router.get('/usuario/:nome', (req, res) => {
    const sql = 'SELECT * FROM Teclados WHERE fun_nome LIKE ?';
    const nome = `%${req.params.nome}%`; // Usando LIKE para pesquisa parcial
    db.query(sql, [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar teclados por nome do usuário:', err);
            res.status(500).send('Erro ao buscar teclados por nome do usuário');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
