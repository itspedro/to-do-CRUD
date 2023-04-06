const express = require('express');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = 4000;

app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`rodando na porta http://localhost:${PORT}!`)
});