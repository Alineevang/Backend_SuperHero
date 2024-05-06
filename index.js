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
    res.send('Backend Harry Potter!');
});

app.get('/bruxos', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: resultado.rowCount,
            bruxos: resultado.rows,
        })
    } catch (error) {
        console.log('Error ao buscar bruxos', error);
        res.status(500).send({ message: 'Erro ao buscar bruxos' });
    }
});

app.get('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
        res.send(resultado.rows[0]);
    } catch (error) {
        console.log('Error ao buscar bruxo', error);
        res.status(500).send({ message: 'Erro ao buscar bruxo' });
    }
});

app.post('/bruxos', async (req, res) => {
    try {
        const { nome, casa, idade, habilidade, status_sangue, patrono } = req.body;

        if (!casa || (casa !== 'Grifinória' && casa !== 'Sonserina' && casa !== 'Corvinal' && casa !== 'Lufa-Lufa')) {
            return res.status(400).send({ message: 'Preencha o campo CASA com: Grifinória, Sonserina, Corvinal, Lufa-Lufa' });
        }

        if (!status_sangue || (status_sangue !== 'Puro' && status_sangue !== 'Mestiço' && status_sangue !== 'Trouxa')) {
            return res.status(400).send({ message: 'Preencha o campo STATUS_SANGUE com: Puro, Mestiço, Trouxa' });
        }
        await pool.query('INSERT INTO bruxos (nome, casa, idade, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6)', [nome, casa, idade, habilidade, status_sangue, patrono]);
        res.send({ message: 'Bruxo cadastrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao cadastrar bruxo:', error.message);
        res.status(500).send({ message: 'Erro ao cadastrar bruxo' });
    }
});

app.put('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, casa, idade, habilidade, status_sangue, patrono } = req.body;
        console.log('Dados recebidos no PUT:', req.body);
        await pool.query('UPDATE bruxos SET nome = $1, casa = $2, idade = $3, habilidade = $4, status_sangue = $5, patrono = $6 WHERE id = $7', [nome, casa, idade, habilidade, status_sangue, patrono, id]);
        res.send({ message: 'Bruxo atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar bruxo:', error.message);
        res.status(500).send({ message: 'Erro ao atualizar bruxo' });
    }
});

app.delete('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.send({ message: 'Bruxo deletado com sucesso!' });
    } catch (error) {
        console.log('Error ao deletar bruxo', error);
        res.status(500).send({ message: 'Erro ao deletar bruxo' });
    }
});



//CRUD VARINHAS
app.get('/varinhas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM varinhas');
        res.json({
            total: resultado.rowCount,
            varinhas: resultado.rows,
        })
    } catch (error) {
        console.log('Error ao buscar varinhas', error);
        res.status(500).send({ message: 'Erro ao buscar varinhas' });
    }
});

app.get('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
        res.send(resultado.rows[0]);
    } catch (error) {
        console.log('Error ao buscar varinha', error);
        res.status(500).send({ message: 'Erro ao buscar varinha por ID' });
    }
});

app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4)', [material, comprimento, nucleo, data_fabricacao]);
        res.send({ message: 'Varinha cadastrada com sucesso!' });
    } catch (error) {
        console.log('Error ao cadastrar varinha', error);
        res.status(500).send({ message: 'Erro ao cadastrar varinha' });
    }
});

app.put('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_fabricacao } = req.body;
        console.log('Dados recebidos no PUT:', req.body);
        await pool.query('UPDATE varinhas SET material = $1, comprimento = $2, nucleo = $3, data_fabricacao = $4 WHERE id = $5', [material, comprimento, nucleo, data_fabricacao, id]);
        res.send({ message: 'Varinha atualizada com sucesso!' });
    } catch (error) {
        console.error('Erro ao atualizar varinha:', error.message);
        res.status(500).send({ message: 'Erro ao atualizar varinha' });
    }
});


app.put('personagens/:id', async (req, res) => {
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

app.delete('personagens/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM personagens WHERE id = $1', [id]);
        res.send({ message: 'Personagem deletado com sucesso!' });
    } catch (error) {
        console.log('Error ao deletar personagem', error);
        res.status(500).send({ message: 'Erro ao deletar personagem' });
    }
});
