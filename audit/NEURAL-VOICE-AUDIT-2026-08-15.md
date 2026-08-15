# FIEZEL Neural Voice — Audit & Repair Report

Tanggal audit: 15 Agustus 2026

Keputusan: **RELEASE BLOCKED — NOT DEVICE VERIFIED**. Working copy berasal dari ZIP upload dan diproses terisolasi; repo/deploy existing tidak disentuh. Quality workflow selesai **39/39 PASS**, tetapi aturan release belum terpenuhi karena real-device gate masih `PENDING` dan aggregate `release-audit.py` belum menuntaskan seluruh run dalam batas audit.

## Masalah utama yang ditemukan

Aset Kokoro lokal memang ada (model ONNX, WASM, dan enam voice), tetapi UI tidak memberi pilihan voice dan jalur audibility dapat memilih browser TTS ketika aset sudah `prepared` tetapi runtime belum `ready`. Ini membuat kondisi “file sudah terunduh” tidak sama dengan “neural benar-benar dipakai”. Selain itu ditemukan multiple AudioContext, false-success pada fallback/start WebAudio, preflight quota iOS yang terlambat, progress cache yang bisa memberi kesan sukses, dan bug wrapper service worker cross-origin.

## Repair yang diterapkan

- Katalog enam local voice: Heart, Bella, Nicole, Michael, Emma, George.
- Selector voice persisten di Skills Lab (`preferences.neuralVoice`).
- Tombol **Uji neural** memakai `allowFallback:false`; browser TTS tidak boleh menyamar sebagai neural pada preview.
- Keadaan `prepared=true` sekarang neural-first, lalu fallback hanya jika neural benar-benar gagal.
- Singleton AudioContext dan error propagation untuk fallback/WebAudio start.
- iOS cache preflight sebelum transfer besar dan progress hanya setelah cache terverifikasi.
- Service worker CORS-first repair; `SW_REV` dinaikkan tanpa mengubah `version.js`/`VERSION.json`.
- Diagnostic build menjadi `m022-1`; checklist device diperbarui.
- Test baru neural repair, selector, iOS cache, dan SW cross-origin dimasukkan ke quality workflow.

## Gate

Quality suite: **39/39 PASS**. Syntax, broken-pattern scan, dan version-preservation PASS. `release-audit.py` diperbaiki dari kontrak lama (hardcoded 5.18.0, neural PASS 28/0, browser-first substring), tetapi aggregate run masih `INCOMPLETE/TIMEOUT`; 84 check yang sempat dicetak pada run 290 detik semuanya PASS. Karena gate iPhone/PWA standalone tetap `PENDING`, release tetap dilarang.

## Scope yang sengaja tidak diklaim

Tidak ada klaim bahwa neural voice sudah berbunyi di iPhone asli. Headless Chromium di environment audit juga tidak dapat mengakses localhost karena policy environment, sehingga itu dicatat sebagai limitation tooling, bukan evidence produksi. Cache neural masih berbagi app-shell cache; pemisahan cache ditunda karena handoff menyatakan perubahan tersebut berisiko sebelum evidence device.

Lihat `GATE-MATRIX-2026-08-15.json`, `FINDINGS-2026-08-15.md`, `RELEASE-DECISION-2026-08-15.json`, `REPAIR-MANIFEST-2026-08-15.json`, dan `NEXT-EXECUTION-DEVICE-GATE.md`.