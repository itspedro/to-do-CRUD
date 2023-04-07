const express = require('express');
const postsRouter = require('./routes/posts');
const cors = require('cors');

const app = express();
const PORT = 4000;
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`rodando na porta http://localhost:${PORT}!`)
});