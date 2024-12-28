const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Configurações básicas
app.use(express.json());
app.use(cors());

// Configuração do Nodemailer
const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    secure: false,
    auth: {
        user: 'pedrohenriqueherculanodias@gmail.com', // Substitua pelo seu email
        pass: 'rttt hfov lljg mqvb',  // Substitua pela senha de app do Gmail
    },
});

// Rota para envio de e-mails
app.post('/send-email', (req, res) => {
    const { to, subject, html, text } = req.body;

    transport.sendMail({
        from: 'pedrohenriqueherculanodias@gmail.com', // Substitua pelo seu email
        to,
        subject,
        html,
        text,
    })
    .then(() => res.status(200).send('Email enviado com sucesso!'))
    .catch(err => res.status(500).send('Erro ao enviar o email: ' + err.message));
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
