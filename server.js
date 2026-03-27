const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// conexão com banco
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'w31d48s38',
  database: 'oculos_db'
});

// testar conexão
db.connect(err => {
  if (err) {
    console.log('Erro conexão:', err);
  } else {
    console.log('MySQL conectado 🔥');
  }
});

// criar serviço
app.post('/servicos', (req, res) => {
  const { nome, servico, status } = req.body;

  const sql = 'INSERT INTO servicos (nome, servico, status) VALUES (?, ?, ?)';
  
  db.query(sql, [nome, servico, status], (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ mensagem: 'Salvo com sucesso' });
  });
});

app.get('/', (req, res) => {
  res.send('API rodando 🔥');
});

// listar serviços (oficial)
app.get('/servicos', (req, res) => {
  db.query('SELECT * FROM servicos', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});
/*app.get('/servicos', (req, res) => {
  db.query('SELECT * FROM servicos', (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});*/

// atualizar status
app.put('/servicos/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  db.query(
    'UPDATE servicos SET status = ? WHERE id = ?',
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ mensagem: 'Atualizado' });
    }
  );
});

/*app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});*/

//codigos para teste de funcionameto

/*app.get('/', (req, res) => {
  res.send('API rodando 🔥');
});

app.get('/servicos', (req, res) => {
  res.json([{ status: 'API online 🔥' }]);
});*/

//codigos para teste de funcionameto

app.get('/servicos', (req, res) => {
  res.json([{ status: 'API online 🔥' }]);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Servidor rodando 🚀');
});