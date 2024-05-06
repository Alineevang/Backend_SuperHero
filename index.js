const express = require('express');

const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'personagens',
    password: 'ds564',
    port: 5432,
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Backend Protocolo Naruto!');
});


//CRUD PERSONAGENS
app.get('/personagens', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM personagens');
        res.json({
            total: resultado.rowCount,
            personagens: resultado.rows,
        })
    } catch (error) {
        console.log('Error ao buscar personagens', error);
        res.status(500).send({ message: 'Erro ao buscar personagens' });
    }
});

app.get('/personagens/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM personagens WHERE id = $1', [id]);
        res.send(resultado.rows[0]);
    } catch (error) {
        console.log('Error ao buscar personagem', error);
        res.status(500).send({ message: 'Erro ao buscar personagem' });
    }
});

app.post('/personagens', async (req, res) => {
    try {
        const { name, poder, nivel, hp } = req.body;
        await pool.query('INSERT INTO personagens (name, poder, nivel, hp) VALUES ($1, $2, $3, $4)', [name, poder, nivel, hp]);
        res.send({ message: 'Personagem criado com sucesso!' });
    } catch (error) {
        console.log('Error ao cadastrar personagem', error);
        res.status(500).send({ message: 'Erro ao criar personagem' });
    }
});

app.put('/personagens/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, poder, nivel, hp } = req.body;
        await pool.query('UPDATE personagens SET name = $1, poder = $2, nivel = $3, hp = $4 WHERE id = $5', [name, poder, nivel, hp, id]);
        res.send({ message: 'Personagem atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar personagem:', error.message);
        res.status(500).send({ message: 'Erro ao atualizar personagem' });
    }
});

app.delete('/personagens/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM personagens WHERE id = $1', [id]);
        res.send({ message: 'Personagem deletado com sucesso!' });
    } catch (error) {
        console.log('Error ao deletar personagem', error);
        res.status(500).send({ message: 'Erro ao deletarpPersonagem' });
    }
});

