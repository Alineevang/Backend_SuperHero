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