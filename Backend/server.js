const express = require('express');
const app = express();
const db = require('./db');

// Middleware para analisar JSON
app.use(express.json());

// Importar e usar as rotas
const tecladosRoutes = require('./routes/teclados');
const mouseRoutes = require('./routes/mouse');
const usuariosRoutes = require('./routes/usuarios');
const acessorioRoutes = require('./routes/acessorio');
const coletorRoutes = require('./routes/coletor');
const desktopRoutes = require('./routes/desktop');
const impressorasRoutes = require('./routes/impressoras');
const leitoresRoutes = require('./routes/leitores');
const monitorRoutes = require('./routes/monitor');
const projetorRoutes = require('./routes/projetor');
const smartphoneRoutes = require('./routes/smartphone');
const tabletRoutes = require('./routes/tablet');
const telefoneRoutes = require('./routes/telefone');
const walktalkRoutes = require('./routes/walk-talk');

app.use('/acessorio', acessorioRoutes);
app.use('/teclados', tecladosRoutes);
app.use('/mouse', mouseRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/coletor', coletorRoutes);
app.use('/desktop', desktopRoutes);
app.use('/impressoras', impressorasRoutes);
app.use('/leitores', leitoresRoutes);
app.use('/monito', monitorRoutes);
app.use('/mouse', mouseRoutes);
app.use('/projeto', projetorRoutes);
app.use('/smartphone', smartphoneRoutes);
app.use('/tablet', tabletRoutes);
app.use('/telefone', telefoneRoutes);
app.use('/walktalk', walktalkRoutes);
// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
