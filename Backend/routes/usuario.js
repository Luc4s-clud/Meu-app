const express = require('express');
const router = express.Router();
const db = require('../db');

// Rota para listar todos os usuários
router.get('/', (req, res) => {
    const sql = 'SELECT * FROM Usuario';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuários:', err);
            res.status(500).send('Erro ao buscar usuários');
            return;
        }
        res.json(results);
    });
});

// Rota para buscar um usuário específico por código
router.get('/:codigo', (req, res) => {
    const sql = 'SELECT * FROM Usuario WHERE fun_codigo = ?';
    const codigo = req.params.codigo;
    db.query(sql, [codigo], (err, results) => {
        if (err) {
            console.error('Erro ao buscar usuário:', err);
            res.status(500).send('Erro ao buscar usuário');
            return;
        }
        res.json(results[0]);
    });
});

// Rota para adicionar um novo usuário
router.post('/', (req, res) => {
    const { fun_codigo, fun_nome, setor, alocado } = req.body;
    const sql = 'INSERT INTO Usuario (fun_codigo, fun_nome, setor, alocado) VALUES (?, ?, ?, ?)';
    const values = [fun_codigo, fun_nome, setor, alocado];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao adicionar usuário:', err);
            res.status(500).send('Erro ao adicionar usuário');
            return;
        }
        res.status(201).send('Usuário adicionado com sucesso');
    });
});

// Rota para atualizar um usuário
router.put('/:codigo', (req, res) => {
    const { fun_nome, setor, alocado } = req.body;
    const sql = 'UPDATE Usuario SET fun_nome = ?, setor = ?, alocado = ? WHERE fun_codigo = ?';
    const values = [fun_nome, setor, alocado, req.params.codigo];
    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao atualizar usuário:', err);
            res.status(500).send('Erro ao atualizar usuário');
            return;
        }
        res.send('Usuário atualizado com sucesso');
    });
});

// Rota para deletar um usuário
router.delete('/:codigo', (req, res) => {
    const sql = 'DELETE FROM Usuario WHERE fun_codigo = ?';
    const codigo = req.params.codigo;
    db.query(sql, [codigo], (err, results) => {
        if (err) {
            console.error('Erro ao deletar usuário:', err);
            res.status(500).send('Erro ao deletar usuário');
            return;
        }
        res.send('Usuário deletado com sucesso');
    });
});

module.exports = router;
