const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const tecladosRoutes = require('./routes/teclados');
const usuarioRoutes = require('./routes/usuario');
const mouseRoutes = require('./routes/mouse');

app.use('/teclados', tecladosRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/mouse', mouseRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// Adicione um log para verificar a inicialização das rotas
app.use((req, res, next) => {
    console.log(`Recebida requisição para ${req.method} ${req.url}`);
    next();
});
