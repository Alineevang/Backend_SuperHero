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

//BUSCAR TODOS OS PERSONAGENS (READ)
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

//BUSCAR TODOS OS PERSONAGENS POR ID (READ)
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

//CRIAR PERSONAGENS (CREATE)
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

//EDITAR PERSONAGENS (UPDATE)
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

//DELETAR PERSONAGENS (DELETE)
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

//ROTA PARA REALIZAR UMA BATALHA ENTRE OS PERSONAGENS
app.get('/batalhas/:personagem1/:personagem2', async (req, res) => {
    const { personagem1, personagem2 } = req.params;

    try {
        //CALCULAR O VENCEDOR
        const vencedorId = await calcularVecendor(personagem1, personagem2);

        //INSERE O REGISTRO DA BATALHA NA TABELA BATALHAS
        await pool.query('INSERT INTO batalhas (personagem1, personagem2, vencedor) VALUES ($1, $2, $3)', [personagem1, personagem2, vencedorId]);

        //EXIBE O VENCEDOR E A MENSAGEM DE SUCESSO
        const { rows } = await pool.query('SELECT * FROM personagens WHERE id = $1', [vencedorId]);
        res.json({ vencedor: rows[0], message: 'Batalha realizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//FUNÇÃO PARA CALCULAR O VENCEDOR DA BATALHA

async function calcularVecendor(personagem1, personagem2) {
    //LÓGICA PARA CALCULAR O VENCEDOR
    const personagem1 = await pool.query('SELECT * FROM personagens WHERE id = $1', [personagem1]);
    const personagem2 = await pool.query('SELECT * FROM personagens WHERE id = $1', [personagem2]);
    //MAIOR NIVEL VENCE
    if (personagem1.rows[0].nivel > personagem2.rows[0].nivel) {
        return personagem1;
    } else if (personagem1.rows[0].nivel < personagem2.rows[0].nivel) {
        return personagem2;
    } else {
        //SE O NIVEL FOR IGUAL, O MAIOR HP VENCE
        if (personagem1.rows[0].hp > personagem2.rows[0].hp) {
            return personagem1;
        } else if (personagem1.rows[0].hp < personagem2.rows[0].hp) {
            return personagem2;
        } else {
            //SE O HP FOR IGUAL, O PRIEMIRO PERSONAGEM VENCE
            return personagem1;
        }
    }
}

//ROTA PARA BUSCAR TODAS AS BATALHAS
app.get('/batalhas', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM batalhas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//ROTA PARA BUSCAR O HISTORICO DE BATALHAS COM OS DADOS DOS PERSONAGENS
app.get('/batalhas/personagens', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT batalhas.id, personagem1, personagem2, vencedor, personagens.name as vencedor_name, personagens.poder as vencedor_poder, personagens.nivel as vencedor_nivel, personagens.hp as vencedor_hp FROM batalhas INNER JOIN personagens ON batalhas.vencedor = personagens.id');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});