# HANDOFF — FIEZEL-APPS neural voice / T-006

Baca seluruh dokumen ini sebelum menyentuh apa pun. Zip ini **sudah siap deploy apa
adanya**. Yang belum diterapkan ada di `handoff/` sebagai patch, dan ada alasannya.

---

## 0. Satu kalimat

Owner belum pernah mengirim bukti dari device; semua analisa sejauh ini berasal dari
pembacaan kode. Build ini menambahkan cara bagi owner mengekspor diagnostik dari
iPhone-nya. **Sampai data itu masuk, jangan ubah kode yang sedang diukur.**

---

## 1. Aturan yang tidak boleh dilanggar

### 1.1 Jangan naikkan `version.js` / `VERSION.json`

`sw.js:2` menurunkan nama cache dari `FIEZEL_VERSION`, dan handler `activate`
menghapus **semua** cache `fiezel-*` yang bukan cache saat ini. Aset neural voice
113 MB menumpang di cache yang sama dengan app shell. Menaikkan versi = menghapus
113 MB di device owner, dan bukti CacheStorage untuk T-006 ikut hilang.

Gate wajib sebelum push apa pun:

```bash
git diff main --stat -- version.js VERSION.json   # HARUS kosong
```

Untuk memaksa service worker install ulang, naikkan **`SW_REV`** di `sw.js` — konstanta
itu tidak dibaca kode mana pun, fungsinya semata mengubah byte `sw.js`. Fetch handler
bersifat cache-first untuk semua same-origin, jadi tanpa install ulang file baru tidak
akan pernah dilayani ke device.

### 1.2 Jangan pernah menyuruh owner menghapus data

Dilarang menyarankan: hapus ikon Layar Utama, pasang ulang PWA, Hapus Riwayat dan Data
Situs Web, atau Data Situs Web → Hapus. Semua itu menghapus
`localStorage['fiezel-neural-voice-diagnostics-v1']`, satu-satunya salinan bukti.
`analysis/device-retest-checklist.md` dulu menyuruh persis itu; sudah diperbaiki di
build ini.

### 1.3 Riwayat diagnostik terkikis tiap peluncuran

`diag()` menulis entri pada setiap load (`bootstrap_loaded`, `ios_cache_patch_loaded`,
`audibility_patch_loaded`) dan daftarnya dipangkas. Sebelum build ini, batasnya 20 di
bootstrap, 30 di audibility-fix, 40 di ios-cache-fix — dan penulis dengan batas
terkecil menang tiap kali ia jalan, jadi riwayat efektif terpangkas ke 20. Build ini
menyeragamkan ke **200**.

Konsekuensi operasional: **setiap cold launch mengikis bukti.** Minimalkan peluncuran
sampai owner menekan Kirim.

### 1.4 Verifikasi sendiri, jangan percaya laporan

Klaim "CI hijau" tidak berarti benar. Contoh nyata: patch neural voice sebelumnya lolos
`git apply --check` untuk kelima file, tapi menghasilkan tiga blok sintaks rusak `}){`
yang membuat dua file gagal `node --check`. Selalu jalankan gate sendiri.

---

## 2. Apa yang sudah ada di build ini

| Perubahan | File |
|---|---|
| Panel Diagnostics read-only + tombol | `features/neural-voice/fiezel-diag-panel.js` (baru) |
| Dimuat sebelum `app.js` supaya tetap ada kalau `app.js` throw | `index.html` |
| `SW_REV` naik + panel didaftarkan ke precache | `sw.js` |
| Batas riwayat diag diseragamkan 20/30/40 → 200 | tiga file neural-voice |
| `assetCount` diekspor (dibaca `ios-cache-fix`, sebelumnya selalu jatuh ke literal 13) | `fiezel-neural-voice-bootstrap.js` |
| Konstanta fallback mati diperbaiki 119.796.601 → 119.274.361 | `fiezel-neural-voice-ios-cache-fix.js` |
| Gate notifikasi default tersembunyi (dulu ter-paint dulu tiap load, dan mengunci app permanen kalau JS throw) | `index.html` |
| Versi diselaraskan 5.18.0 → 5.19.0 | `package.json`, `manifest.json` |
| Instruksi merusak dibuang, alur panel ditulis | `analysis/device-retest-checklist.md` |
| 24 gate baru | `diag-panel-test.js` + `.github/workflows/quality.yml` |

**Verifikasi:** 36/36 test CI PASS, `node --check` bersih untuk seluruh `*.js`/`*.mjs`,
JSON valid, dan grep membuktikan panel nol operasi tulis/hapus ke localStorage,
CacheStorage, maupun IndexedDB. Panel tidak pernah membaca body respons — hanya header
— supaya model 92 MB tidak masuk memori saat inventaris cache dibuat.

**Belum diverifikasi:** perilaku di iOS asli. Status = *changed-and-tested-sejauh-mungkin*,
bukan device-verified.

---

## 3. Deploy

GitHub Pages men-deploy dari `main`, jadi merge = deploy.

```bash
git checkout -b m019-diag-panel
# salin isi zip ini ke atas working tree (kecuali handoff/ dan .git/)
for f in *.js; do node --check "$f"; done
node diag-panel-test.js                            # "semua gate diag-panel LOLOS"
git diff main --stat -- version.js VERSION.json    # HARUS kosong
git push -u origin m019-diag-panel
```

Tunggu CI hijau, lalu merge.

`handoff/` **jangan ikut di-commit** — itu material kerja, bukan bagian aplikasi.

---

## 4. Langkah owner di iPhone

Owner memakai FIEZEL dari **ikon Layar Utama (PWA standalone)** dan **tidak punya Mac**.
Storage container standalone iOS terpisah dari tab Safari, jadi membaca localStorage
dari tab Safari akan mengembalikan hasil kosong — bukan karena datanya tidak ada, tapi
karena container-nya beda.

1. Buka FIEZEL dari ikon Layar Utama seperti biasa.
2. Tutup penuh lewat app switcher, buka lagi. **Sekali cukup** (`skipWaiting()` +
   `clients.claim()` sudah ada, dan `SW_REV` sudah naik).
3. Tombol hitam **Diagnostics** di kanan atas → ketuk.
4. Cek `"diagBuild": "m019-1"` di baris atas. Kalau tombol tidak ada, ulangi langkah 2.
   Setelah 3 kali tetap tidak ada → **berhenti, laporkan**. Itu temuan tersendiri.
5. **Kirim** → Notes/WhatsApp → tempel ke coordinator.

---

## 5. Yang dicari di hasilnya

| Field | Menjawab apa |
|---|---|
| `storageEstimate.quota` / `.usage` | kuota asli device — membuktikan atau membantah hipotesis kuota, yang **belum pernah diukur** |
| `cacheInventory[].neuralAssets` | aset kokoro mana yang benar-benar tersimpan, beserta `content-length` dan MIME |
| `target` | isi mentah key diagnostics — target asli T-006 |
| `crossOriginIsolated` | verifikasi temuan COI di device, bukan dari kode |
| `puterLoaded` | `false` mengonfirmasi bug CORP wrapper (lihat M-021) |

---

## 6. Misi terparkir — JANGAN merge sebelum data masuk

### M-020 — `handoff/M-020-neural-voice-fix.patch`

Rekonstruksi dari `fiezel-neural-voice-unified-final.patch` yang rusak. Isi yang
dipertahankan:

- **AudioContext singleton.** `warmWebAudio()` di `audibility-fix.js:22` memanggil
  `createPlayer(root)` **baru** setiap kali, dan ia dipanggil di awal `speak()` *dan*
  lagi di dalam `browserSpeakImmediate()`; `warmAudioGesture()` dan `initialize()` di
  bootstrap juga. Tiap player dulu memegang `context` lokalnya sendiri, jadi satu sesi
  bicara membuat beberapa AudioContext. WebKit membatasi jumlahnya per halaman — begitu
  batas tercapai, konstruktornya melempar dan seluruh jalur audio mati, termasuk
  fallback browser. Ini hipotesis kuat untuk gejala "suara kadang muncul kadang tidak"
  yang **independen** dari masalah kuota 113 MB. Belum terverifikasi di device.
- **Metadata provider eksplisit** di kedua situs fallback, supaya pemanggil bisa
  membedakan suara neural dari suara browser.
- **Fallback melapor gagal.** `onerror` dan timeout dulu memanggil `resolve`, jadi
  ucapan yang tidak pernah berbunyi tetap dilaporkan sukses. Ini perubahan perilaku dan
  yang paling perlu diperhatikan saat retest.
- **`lastFallbackReason`** dideklarasikan (patch lama memakainya tanpa deklarasi →
  `ReferenceError` di strict mode → suara mati total) dan diekspos lewat `status()`
  bersama `timeoutMs`.

Dibuang dari patch lama: seluruh hunk `audibility-fix.js` (identik byte-per-byte dengan
kode yang sudah ada — generatornya bekerja dari zip basi), hunk `speak()` bootstrap
(95% redundan), `Math.max(1,INITIALIZE_TIMEOUT_MS)` (no-op), dan perubahan perilaku
`sw.js` (`skipWaiting` dan `clients.claim` sudah ada; menyentuh siklus hidup cache
sekarang berbahaya).

Terverifikasi: 37/37 test dengan 29 gate baru di `neural-voice-fix-test.js`, termasuk
gate anti-regresi permanen untuk pola `}){`, definisi fungsi ganda, dan deklarasi
`lastFallbackReason`.

### M-021 — `handoff/M-021-corp-wrapper-fix.patch`

`sw.js` versi lama mengambil resource cross-origin dalam mode `no-cors` lalu
menyalurkan `response.body` ke `Response` baru ber-status 200. Menurut spesifikasi
Fetch, opaque filtered response punya **body null**, jadi hasilnya 200 OK dengan body
kosong. `index.html:65` memuat `https://js.puter.com/v2/` **tanpa atribut
`crossorigin`** (mode `no-cors`), jadi SDK Puter dimuat sebagai skrip kosong dan
`puter` menjadi undefined. Yang rusak: `coreWorkerExec` (`app.js:455`),
`deliverCreatorReport` (`app.js:774`), fitur AI (`app.js:790`).

Sulit terlihat karena pada load pertama seumur hidup belum ada SW yang mengontrol, jadi
Puter termuat normal; kegagalan baru muncul dari load kedua. Coverage di repo: nol —
`sw.js` satu-satunya file yang menyebut `no-cors`/`opaque`/CORP, dan tidak ada test
yang menyentuhnya.

Perbaikannya mencoba mode `cors` dulu (satu-satunya cara membaca body cross-origin),
membungkus ulang dengan CORP sintetis kalau berhasil, dan meneruskan apa adanya kalau
gagal — sehingga kegagalan terlihat, bukan disamarkan jadi 200 kosong. 15 gate di
`sw-corp-test.js`.

**Belum terverifikasi:** apakah `js.puter.com` benar mengirim `Access-Control-Allow-Origin`.
Kalau tidak, `puter` tetap gagal saat COEP aktif, dan solusi sebenarnya adalah proxy —
bukan pembungkusan ulang. Uji ini di device dan catat hasilnya.

### Urutan

```
build ini (M-019)  →  data T-006 masuk  →  M-020  →  M-021
```

M-020 dan M-021 sama-sama menaikkan `SW_REV`; kalau ada deploy lain di antaranya,
naikkan lagi supaya nilainya tetap unik.

---

## 7. Yang masih terbuka

- **Cache aset suara menumpang di cache app shell.** Perbaikan sebenarnya: cache
  terpisah (mis. `fiezel-voice-v1`) dengan filter `activate` yang dipersempit, sehingga
  update aplikasi tidak lagi menghapus 113 MB. Berisiko tinggi — kerjakan setelah T-006
  dan T-007 (migrasi IndexedDB, desain `baa804e`).
- **Priming melewati `storagePreflight`.** `prepare()` di `ios-cache-fix` menjalankan
  `primeLargeAssets` lebih dulu tanpa cek kuota; `QuotaExceededError` tertelan ke
  `diag()` dan pesan "Penyimpanan tidak cukup" yang informatif baru muncul belakangan
  dari jalur berbeda.
- **Progress melaporkan sukses walau caching gagal.** `done(WASM)` dan `done(MODEL)` di
  `primeLargeAssets` dipanggil **di luar** try/catch, jadi progress bar maju melewati
  113 MB walau tidak ada byte yang tersimpan.
- **`agent/coi-client-refresh-20260814`** (M-018) masih menunggu keputusan merge,
  berstatus changed-not-tested. Jangan gabung dengan misi mana pun di atas.

---

## 8. Gate wajib untuk misi apa pun di repo ini

```bash
for f in *.js; do node --check "$f"; done
for f in features/neural-voice/*.js; do node --check "$f"; done
grep -rn '^\s*}){' features/ *.js          # harus kosong
git diff main --stat -- version.js VERSION.json   # harus kosong
```

Tambah harness untuk setiap perubahan perilaku, dan daftarkan ke
`.github/workflows/quality.yml`. Repo ini tidak punya build step dan tidak punya
`src/` — semua file datar dan dimuat langsung lewat tag `<script>` di `index.html`.
Jangan usulkan struktur bundler.
