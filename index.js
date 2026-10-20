const express = require('express');
const pool = require('./db');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware agar Express dapat membaca body berformat JSON
app.use(express.json());

// Jalankan Server Express
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});