# 180_ServiceCRUD

Project Service API CRUD menggunakan **Express.js** dan database **PostgreSQL** (`mahasiswa`) untuk mengelola tabel `biodata`.

## Informasi Developer
- **Nama**: Wildhan Valerian
- **NIM**: 20240140180
- **Kelas**: TI-A

## Fitur & Endpoint API
| Method | Endpoint | Deskripsi |
| :--- | :--- | :--- |
| `GET` | `/biodata` | Mengambil seluruh data biodata |
| `GET` | `/biodata/:id` | Mengambil data biodata spesifik berdasarkan ID |
| `POST` | `/biodata` | Menambahkan data biodata baru |
| `PUT` | `/biodata/:id` | Memperbarui data biodata berdasarkan ID |
| `DELETE` | `/biodata/:id` | Menghapus data biodata berdasarkan ID |

## Struktur Data (`biodata`)
- `id` (Serial / Integer, Primary Key)
- `nama` (Varchar / Text)
- `nim` (Varchar / Text)
- `kelas` (Varchar / Text)

## Bukti Pengujian Postman
![Bukti Testing GET](./Bukti%20ScreenShoot.png)
