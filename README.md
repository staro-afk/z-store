# Z-Store Security Lab — Starter

Z-Store adalah frontend e-commerce dummy untuk latihan memahami alur aplikasi web dan melakukan code review keamanan secara legal.

## Isi proyek
- `index.html` — struktur halaman
- `styles.css` — tampilan responsif
- `app.js` — katalog produk, pencarian, filter, keranjang, checkout demo

## Menjalankan
Buka `index.html` di browser, atau deploy folder ini sebagai static site ke Vercel.

## Batasan keamanan yang wajib dipahami
Versi ini **belum memiliki backend, database, atau autentikasi sungguhan**.
- Keranjang disimpan di `localStorage` browser dan hanya untuk data demo.
- Tidak ada akun/password.
- Checkout tidak membuat pesanan dan tidak memproses pembayaran.
- Jangan memasukkan data pribadi, password asli, token, atau informasi pembayaran.
- Jangan menganggap UI atau JavaScript frontend sebagai kontrol keamanan.
- Jangan gunakan proyek ini untuk transaksi nyata.

## Rencana pengembangan berikutnya
1. Buat salinan lab terpisah sebelum eksperimen keamanan.
2. Tambahkan backend Supabase dan PostgreSQL.
3. Implementasikan Supabase Auth.
4. Aktifkan dan uji Row Level Security (RLS) untuk setiap tabel.
5. Simpan secret hanya di environment server-side; jangan pernah memasukkan service-role key ke frontend.
6. Tambahkan API/server-side logic untuk harga, pesanan, dan role admin.
7. Gunakan akun dan data dummy untuk semua pengujian.
8. Lakukan pengujian aktif hanya pada lingkungan yang dimiliki dan diizinkan.

## Catatan
Ini adalah starter project aman untuk UI dan eksplorasi source code, bukan lab eksploitasi yang sengaja rentan. Hindari mengaktifkan kerentanan pada deployment publik.
