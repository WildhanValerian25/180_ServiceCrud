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
// =============================================================
// 3. POST - Menambahkan data biodata baru
// =============================================================
app.post('/biodata', async (req, res) => {
    try {
        const { nama, nim, kelas } = req.body;
        const newBiodata = await pool.query(
            'INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *',
            [nama, nim, kelas]
        );
        res.status(201).json(newBiodata.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// =============================================================
// 4. PUT - Memperbarui data biodata berdasarkan ID
// =============================================================
app.put('/biodata/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nim, kelas } = req.body;
        const updateBiodata = await pool.query(
            'UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *',
            [nama, nim, kelas, id]
        );

        if (updateBiodata.rows.length === 0) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ message: "Data berhasil diperbarui!", data: updateBiodata.rows[0] });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});