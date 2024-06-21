const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para listar todos os mouses
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Mouse';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar mouses:', err);
            res.status(500).send('Erro ao buscar mouses');
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um mouse específico por ID
router.get('/:id', (req, res) => {
    const sql = 'SELECT * FROM Mouse WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar mouse:', err);
            res.status(500).send('Erro ao buscar mouse');
            return;
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo mouse
router.post('/', (req, res) => {
    const { Scroll, Tipo, Conexao, Cor, SN, Marca, Modelo, Codigo_Barras, SETOR, FUN_CODIGO, Data_Aquisicao, Data_Conferencia, Garantia_Meses, Status, Observacao } = req.body;
    const sql = 'INSERT INTO Mouse (Scroll, Tipo, Conexao, Cor, SN, Marca, Modelo, Codigo_Barras, SETOR, FUN_CODIGO, Data_Aquisicao, Data_Conferencia, Garantia_Meses, Status, Observacao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [Scroll, Tipo, Conexao, Cor, SN, Marca, Modelo, Codigo_Barras, SETOR, FUN_CODIGO, Data_Aquisicao, Data_Conferencia, Garantia_Meses, Status, Observacao];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao adicionar mouse:', err);
            res.status(500).send('Erro ao adicionar mouse');
            return;
        }
        res.status(201).send('Mouse adicionado com sucesso');
    });
});

// Rota para atualizar um mouse
router.put('/:id', (req, res) => {
    const { Scroll, Tipo, Conexao, Cor, SN, Marca, Modelo, Codigo_Barras, SETOR, FUN_CODIGO, Data_Aquisicao, Data_Conferencia, Garantia_Meses, Status, Observacao } = req.body;
    const sql = 'UPDATE Mouse SET Scroll = ?, Tipo = ?, Conexao = ?, Cor = ?, SN = ?, Marca = ?, Modelo = ?, Codigo_Barras = ?, SETOR = ?, FUN_CODIGO = ?, Data_Aquisicao = ?, Data_Conferencia = ?, Garantia_Meses = ?, Status = ?, Observacao = ? WHERE id = ?';
    const values = [Scroll, Tipo, Conexao, Cor, SN, Marca, Modelo, Codigo_Barras, SETOR, FUN_CODIGO, Data_Aquisicao, Data_Conferencia, Garantia_Meses, Status, Observacao, req.params.id];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar mouse:', err);
            res.status(500).send('Erro ao atualizar mouse');
            return;
        }
        res.send('Mouse atualizado com sucesso');
    });
});

// Rota para deletar um mouse
router.delete('/:id', (req, res) => {
    const sql = 'DELETE FROM Mouse WHERE id = ?';
    const id = req.params.id;
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Erro ao deletar mouse:', err);
            res.status(500).send('Erro ao deletar mouse');
            return;
        }
        res.send('Mouse deletado com sucesso');
    });
});

// Rota para buscar um mouse por código de barras
router.get('/codigo_barras/:codigo', (req, res) => {
    const sql = 'SELECT * FROM Mouse WHERE Codigo_Barras = ?';
    const codigo = req.params.codigo;
    db.query(sql, [codigo], (err, results) => {
        if (err) {
            console.error('Erro ao buscar mouse por código de barras:', err);
            res.status(500).send('Erro ao buscar mouse por código de barras');
            return;
        }
        res.json(results);
    });
});

// Rota para buscar mouses por nome do usuário
router.get('/usuario/:nome', (req, res) => {
    const sql = 'SELECT * FROM Mouse WHERE FUN_NOME LIKE ?';
    const nome = `%${req.params.nome}%`; // Usando LIKE para pesquisa parcial
    db.query(sql, [nome], (err, results) => {
        if (err) {
            console.error('Erro ao buscar mouses por nome do usuário:', err);
            res.status(500).send('Erro ao buscar mouses por nome do usuário');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
