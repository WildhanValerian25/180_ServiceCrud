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

// =============================================================
// 1. GET ALL - Mengambil seluruh data biodata
// =============================================================
app.get('/biodata', async (req, res) => {
    try {
        const allBiodata = await pool.query('SELECT * FROM biodata ORDER BY id ASC');
        res.json(allBiodata.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// =============================================================
// 2. GET BY ID - Mengambil data biodata berdasarkan ID
// =============================================================
app.get('/biodata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const biodata = await pool.query('SELECT * FROM biodata WHERE id = $1', [id]);

        if (biodata.rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json(biodata.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});