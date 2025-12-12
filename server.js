const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.use(express.static('public'));

app.post('/salvar', (req, res) => {
    const texto = req.body.texto;
    const data = new Date().toLocaleString();
    const linha = `[${data}] ${texto}\n`;

    fs.appendFile('storage.txt', linha, (err) => {
        if (err) {
            res.status(500).send('Nao foi possivel salvar');
        } else {
            res.send("salvo com sucesso");
        }
    });
});

app.get('/ler', (req, res) => {
    if(!fs.existsSync('storage.txt')) {
        return res.send('Nenhuma anotacao ainda.');
    }

    fs.readFile('storage.txt', 'utf-8', (err, data) => {
        if(err) {
            res.status(500).send("Erro ao ler")
        } else {
            res.send(data);
        }
    });
});

app.listen(5000, '0.0.0.0', () => {
    console.log("Servidor rodando na porta 5000")
})