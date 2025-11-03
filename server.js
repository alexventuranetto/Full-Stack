// server.js

// 1. Importações (garantir que 'express' seja o primeiro)
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// 2. Inicialização do Express
const app = express(); // <-- ESSA LINHA DEFINE A VARIÁVEL 'app'
const port = 3000;

// 3. Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'alunolab', // Senha confirmada
    database: 'loja_simples',
    port: 3307 // Porta MySQL
});

// 4. Conexão com o Banco de Dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err.stack);
        // Sugestão: Saia do processo se a conexão falhar
        // process.exit(1); 
        return; 
    }
    console.log('Conectado ao MySQL como id ' + db.threadId);
});

// 5. Middlewares (usando 'app' após sua definição)
app.use(cors());       // Permite requisições do Front-end
app.use(express.json()); // Permite que o servidor entenda JSON

// ----------------------------------------------------
// ROTAS DA API
// ----------------------------------------------------

// Rota 1: Listar todos os produtos (GET)
app.get('/api/produtos', (req, res) => {
    // Note que 'app' está definido e pode ser usado aqui
    const sql = 'SELECT * FROM produtos';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).send('Erro no servidor.');
            return;
        }
        res.json(results);
    });
});

// Rota 2: Adicionar um novo produto (POST)
app.post('/api/produtos', (req, res) => {
    // Pega nome, preco e QUANTIDADE do corpo da requisição
    const { nome, preco, quantidade } = req.body; 
    
    // SQL com os três campos
    const sql = 'INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)';
    
    // Valores passados para a query
    db.query(sql, [nome, preco, quantidade], (err, result) => { 
        if (err) {
            console.error('Erro ao inserir produto:', err);
            res.status(500).send('Erro ao salvar produto no banco.');
            return;
        }
        res.json({ 
            message: 'Produto adicionado com sucesso!', 
            id: result.insertId 
        });
    });
});

// ----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// ----------------------------------------------------

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});