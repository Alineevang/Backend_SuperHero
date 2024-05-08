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

// OBTER UM PERSONAGEM ESPECIFICO
app.get('/personagens/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM personagens WHERE id = $1', [id]); // Corrigido o erro de sintaxe
        if (!rows || rows.length === 0) { // Corrigido o tratamento de caso em que nenhum resultado é retornado
            res.status(404).json({ message: 'Personagem não encontrado!' });
        } else {
            res.json(rows[0]);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// OBTER PERSONAGENS POR PODER
app.get('/personagens/poder/:poder', async (req, res) => {
    const { poder } = req.params;
    try {
        const result = await pool.query('SELECT * FROM personagens WHERE poder = $1', [poder]);
        const rows = result.rows; // Extrair apenas as linhas dos resultados
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// OBTER PERSONAGENS POR NIVEL
app.get('/personagens/nivel/:nivel', async (req, res) => {
    const { nivel } = req.params;
    try {
        const { rows } = await pool.query('SELECT * FROM personagens WHERE nivel = $1', [nivel]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//REALIZAR BATALHA ENTRE DOIS PERSONAGENS
app.get('/batalhas/:id_personagem1/:id_personagem2', async (req, res) => {
    const { id_personagem1, id_personagem2 } = req.params;
    try {
        //LÓGICA PARA CALCULAR O VENCEDOR
        const vencedorId = await calculateWinner(id_personagem1, id_personagem2);
        //INSERE O REGISTRO NA TABELA DE BATALHAS
        await pool.query('INSERT INTO batalhas(id_personagem1, id_personagem2, id_vencedor) VALUES($1, $2, $3)', [id_personagem1, id_personagem2, vencedorId]);
        //EXIBE O VENCEDOR E AS MENSAGENS DE SUCESSO
        const { rows } = await pool.query('SELECT * FROM personagens WHERE id = $1', [vencedorId]);
        res.json({ message: 'Batalha realizada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

async function calculateWinner(id_personagem1, id_personagem2) {
    //LÓGICA PARA CALCULAR O VENCEDOR
    const personagem1 = await pool.query('SELECT * FROM personagens WHERE id = $1', [id_personagem1]);
    const personagem2 = await pool.query('SELECT * FROM personagens WHERE id = $1', [id_personagem2]);
    //MAIOR NÍVEL VENCE
    if (personagem1.rows[0].nivel > personagem2.rows[0].nivel) {
        return id_personagem1;
    } else if (personagem1.rows[0].nivel < personagem2.rows[0].nivel) {
        return id_personagem2;
    } else {
        //EM CASO DE EMPATE, MAIOR HP VENCE
        if (personagem1.rows[0].hp > personagem2.rows[0].hp) {
            return id_personagem1;
        } else if (personagem1.rows[0].hp < personagem2.rows[0].hp) {
            return id_personagem2;
        } else {
            //EM CASO DE EMPATE, RETORNA O PRIMEIRO PERSONAGEM
            return id_personagem1;
        }
    }
}

//LISTAR TODAS AS BATALHAS
app.get('/batalhas', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM batalhas');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

