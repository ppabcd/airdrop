# Airdrop Management
Airdrop management adalah sebuah tools untuk memudahkan dalam memanagement airdrop. Tools ini menggunakan database dari firebase, adapun url dari database akan disimpan secara
lokal sehingga hanya pengguna tersebut yang dapat mengakses data airdropnya.

Tools ini dibuat dengan menggunakan Nuxt3 dan disertai dengan tailwind sebagai stylingnya.

## Installasi
Project ini memerlukan nodejs unutk melakukan compile tailwindcss. Untuk proses installasi package yang diperlukan dengan cara sebagai berikut.
```
npm install
```
Selanjutnya untuk menjalankan project ini dengan menggunakan perintah berikut.
```
npm run dev
```
Project akan dijalankan dan perintah tersebut akan menjalankan nuxt3

## Cara menggunakan
Untuk menggunakannya dengan cara membuka halaman website yang sudah dijalankan sebelumnya. Pada halaman awal, kamu akan diminta untuk mengisikan **URL firebase** dan **password**.

URL Firebase diisi dengan URL Realtime Database yang dapat dibuat pada halaman <a href='https://console.firebase.google.com/'>Firebase</a>.

Pastikan rules yang ada pada Realtime Database seperti berikut ini.
```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```
Untuk saat ini penggunaan realtime database dengan menggunakan service account masih dikembangkan.

Setelah memasukkan URL realtime database maka langkah selanjutnya adalah mengisikan password. Password akan digunakan untuk melakukan enkripsi url firebase yang diinputkan sebelumnya 
enkripsi yang digunakan dengan menggunakan algoritma AES.
Setelah melakukan submit, maka data tersebut akan disimpan didalam cache. Ketika membuka pada waktu berikutnya, pengguna hanya perlu memasukkan password jika cache yang ada sudah expired.

## TODO
- [x] Management Wallet
- [x] Management Network
- [x] Management Airdrop
- [x] Integration Social Media API
- [ ] Database Connection with Auth
- [x] Generate Wallet
- [ ] Subscribe Airdrop Channel
- [ ] Tweet template
- [ ] Cache data to prevent frequently request db

## Kontribusi
Kamu dapat melakukan kontribusi pada project ini dengan cara melakukan fork. Setelah melakukan fork pada project ini, kamu dapat mengubah beberapa hal yang mungkin belum tersedia 
pada project ini. Setelah semua selesai, kamu dapat melakukan pull request untuk menggabungkan hasil pekerjaan kamu dengan project ini.

## Support
Support me on 

<a href="https://arxist.com/ppabcd">
  <img src="https://arxist.id/assets/images/arxist_vertical_150.png" alt="Arxist" width="250">
</a>
