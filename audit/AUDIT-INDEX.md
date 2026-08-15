# Audit Index

**Status: UNRELEASED / RELEASE BLOCKED.** Repository ini adalah audit/repair candidate, bukan production release.

## Current truth

- `LATEST-AUDIT-REPORT.md` — laporan menyeluruh terbaru.
- `LATEST-FINDINGS.json` — findings NV-001..NV-013, machine-readable.
- `LATEST-GATE-MATRIX.md` — matriks gate terbaru.
- `LATEST-GATE-RESULTS.json` — hasil gate machine-readable.
- `FULL-WORKFLOW-RESULTS.json` — seluruh 39 command Node dari `quality.yml`, **39/39 PASS**.
- `RELEASE-AUDIT-SUMMARY.json` — aggregate `release-audit.py`, **154/0 PASS**.
- `KOKORO-INFERENCE-EVIDENCE.md` — inference nyata **6/6 voice** menghasilkan waveform.
- `PUTER-COEP-COMPATIBILITY.md` — audit Puter/CORP/COEP.
- `NEXT-EXECUTION-DEVICE-GATE.md` — prosedur mandatory real-device gate.
- `LATEST-RELEASE-DECISION.md` — keputusan eksplisit **BLOCKED / NO RELEASE**.
- `GITHUB-PUBLISH-STATUS-2026-08-15.md` — status sinkronisasi audit GitHub.

## Source / repair evidence

- `../candidate/` — snapshot source/test repair untuk review.
- `../repair/REPAIR-MANIFEST-2026-08-15.json` — manifest file repair.
- `../repair/REPAIR-PATCH-SHA256.txt` — checksum patch canonical lokal.
- `../artifacts/kokoro-six-voice-inference.mjs` — reproducible inference harness.
- `../artifacts/kokoro-six-voice-inference-result.json` — hasil inference 6 voice.
- `../artifacts/kokoro-six-voice-http-requests.txt` — request evidence model/WASM/voices.
- `../artifacts/LARGE-ASSET-MANIFEST.md` — hash model, WASM, dan voice binaries.
- `../artifacts/BUNDLE-CHECKSUMS.sha256` — checksum bundle/evidence yang dipertahankan.

## Historical files

File bernama `*-2026-08-15.*` yang lebih lama dipertahankan sebagai jejak audit. Jika ada perbedaan status, file `LATEST-*` dan dokumen pada bagian **Current truth** di atas adalah checkpoint terbaru.

## Release blockers

Automated gates sudah hijau, tetapi release tetap dilarang sampai real iPhone Home Screen PWA membuktikan audible `kokoro-local` setelah cold relaunch dari aset yang sudah tersimpan, dan Puter tetap berfungsi (`puterLoaded:true`) di exact candidate SW/COEP context.
