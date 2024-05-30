const express = require('express');
const path = require('path');
const cors = require('cors'); // Certifique-se de adicionar esta linha
const app = express();

// Use o middleware CORS
app.use(cors()); // Adicione esta linha

app.use(express.json());
app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

const tecladosRoutes = require('./routes/teclados');
const usuarioRoutes = require('./routes/usuario');

app.use('/teclados', tecladosRoutes);
app.use('/usuario', usuarioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
