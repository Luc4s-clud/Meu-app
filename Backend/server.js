const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const { spawn } = require('child_process');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Luca8428',
    database: 'InventoryApp'
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados');
});

// Configuração do Multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Função para logar detalhadamente os passos
const logDetails = (message) => {
    console.log(new Date().toISOString(), message);
};

// Endpoint para upload de arquivos XML
app.post('/importar-xml', upload.single('file'), (req, res) => {
    if (!req.file) {
        logDetails('Nenhum arquivo recebido');
        res.status(400).send('Nenhum arquivo recebido');
        return;
    }

    const filePath = req.file.path;
    logDetails(`Arquivo recebido: ${filePath}`);

    // Executa o script Python
    const pythonProcess = spawn('python', ['process_xml.py', filePath]);

    pythonProcess.stdout.on('data', (data) => {
        logDetails('Recebendo dados do script Python');
        
        try {
            const result = JSON.parse(data.toString());

            if (result.error) {
                logDetails(`Erro ao processar XML: ${result.error}`);
                res.status(500).send(`Erro ao processar XML: ${result.error}`);
                return;
            }

            logDetails('Dados extraídos do XML:');
            logDetails(JSON.stringify(result, null, 2));

            // Prepare dados para inserção manual do cod_barras
            const dadosParaInserir = result.map(produto => ({
                ...produto,
                cod_barras: ''  // Placeholder para adicionar manualmente
            }));

            // Exibir dados extraídos para adição manual do cod_barras
            res.json({
                mensagem: 'Importação de XML concluída com sucesso. Por favor, adicione o cod_barras manualmente.',
                dados: dadosParaInserir
            });
        } catch (err) {
            logDetails(`Erro ao analisar JSON: ${err.message}`);
            res.status(500).send('Erro ao analisar JSON');
        }
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`Erro no script Python: ${data}`);
        res.status(500).send('Erro ao processar XML com Python');
    });

    pythonProcess.on('close', (code) => {
        logDetails(`Processo Python finalizado com código ${code}`);
    });
});

// Endpoint para inserir dados com cod_barras
app.post('/inserir-produto', (req, res) => {
    const {
        nfe,
        modelo,
        n_serie,
        tipo,
        bloco,
        cod_barras,
        fun_codigo,
        fun_nome,
        setor,
        data_aquisicao,
        data_conferencia,
        status_,
        capacidade,
        voltagem,
        obs,
        fonte,
        outros
    } = req.body;

    logDetails('Inserindo produto no banco de dados');
    const sql = 'INSERT INTO acessorio (nfe, modelo, n_serie, tipo, bloco, cod_barras, fun_codigo, fun_nome, setor, data_aquisicao, data_conferencia, status_, capacidade, voltagem, obs, fonte, outros) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [nfe, modelo, n_serie, tipo, bloco, cod_barras, fun_codigo, fun_nome, setor, data_aquisicao, data_conferencia, status_, capacidade, voltagem, obs, fonte, outros];

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir acessório:', err);
            res.status(500).send('Erro ao inserir acessório');
        } else {
            logDetails('Acessório inserido com sucesso');
            res.send('Acessório inserido com sucesso');
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    logDetails('Servidor rodando na porta 3000');
});
