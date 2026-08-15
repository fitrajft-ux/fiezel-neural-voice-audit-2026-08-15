# FIEZEL Neural Voice Audit — 2026-08-15

> **STATUS: NOT RELEASED — DEVICE GATE PENDING**

Repository ini adalah snapshot audit/repair terisolasi untuk masalah neural voice FIEZEL. Repository ini **bukan production release** dan tidak boleh diperlakukan sebagai build yang sudah device-verified.

## Hasil audit

- Quality workflow: **39/39 PASS**.
- Code-level repair: selector 6 neural voices, neural-first ketika aset prepared, singleton AudioContext, explicit WebAudio/fallback failures, iOS storage preflight, verified cache progress, dan service-worker cross-origin repair.
- `version.js` dan `VERSION.json` tidak dinaikkan.
- Release tetap **BLOCKED** karena belum ada bukti real iPhone / PWA standalone dan aggregate `release-audit.py` belum menuntaskan satu run penuh dalam batas execution environment.

## Neural voices

Kandidat menyediakan enam pilihan voice lokal: Heart (`af_heart`), Bella (`af_bella`), Nicole (`af_nicole`), Michael (`am_michael`), Emma (`bf_emma`), dan George (`bm_george`). Selector menyimpan pilihan pengguna dan tombol **Uji neural** berjalan dengan fallback browser dinonaktifkan agar browser TTS tidak dapat menyamar sebagai neural voice.

## Struktur repository

- `audit/` — laporan, findings, gate matrix, decision, checksums, test logs, dan device retest plan.
- `repair/` — manifest/hash dan patch perubahan terhadap ZIP input asli.
- `candidate/` — source files yang berubah/ditambahkan pada audit ini.
- `artifacts/` — metadata/checksum bundle lokal. Binary kandidat penuh 119 MB tidak dipublish sebagai satu file GitHub biasa; aset vendor besar direferensikan dengan hash/manifest.

## Release rule

Jangan release/merge/deploy berdasarkan repository ini sebelum **semua** gate PASS, terutama real-device gate. Finding `NV-010` tetap release blocker sampai neural audio benar-benar terdengar pada iPhone/PWA standalone dan provider terkonfirmasi neural lokal.
