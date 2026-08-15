# Audit Index

Kandidat ini **bukan release**. Production gate masih tertutup.

## Tersimpan langsung di GitHub

- `NEURAL-VOICE-AUDIT-2026-08-15.md` — ringkasan audit/repair.
- `FINDINGS-2026-08-15.md` — finding NV-001 sampai NV-010.
- `GATE-MATRIX-2026-08-15.json` — quality/release gates dan blocker.
- `RELEASE-DECISION-2026-08-15.json` — keputusan machine-readable: BLOCKED.
- `GITHUB-PUBLISH-STATUS-2026-08-15.md` — status ekspor audit candidate.
- `quality-summary-39-of-39.txt` — final constituent quality suite 39/39 PASS.
- `AUDIT-SHA256SUMS.txt` — SHA-256 seluruh evidence pada bundle lokal asli.
- `NEXT-EXECUTION-DEVICE-GATE.md` — prosedur membuka real-device gate.
- `SOURCE-HANDOFF-PROMPT.md` — handoff/constraint yang menjadi basis audit.
- `../repair/REPAIR-MANIFEST-2026-08-15.json` — daftar file repair beserta size/hash.
- `../candidate/` — source repair extract untuk inspeksi cepat.
- `../artifacts/LARGE-ASSET-MANIFEST.md` — hash model, WASM, dan enam voice.
- `../artifacts/BUNDLE-CHECKSUMS.sha256` — checksum bundle kandidat/report lokal.

## Evidence yang tidak diklaim byte-identik di GitHub

Bundle laporan lokal asli berukuran **191,224 byte** dan full candidate **124,063,918 byte**. Percobaan transfer ZIP laporan lewat connector menghasilkan blob 7,521 byte, terdeteksi pada consistency pass, dan blob/path tersebut sudah dihapus agar tidak ada artefak korup yang tampak valid.

Karena itu `repair-from-upload.patch`, `test-logs/`, dan `release-audit-timeout-*.log` tidak diklaim sebagai file direct GitHub pada index ini. SHA-256 asli semuanya tercatat di `AUDIT-SHA256SUMS.txt`; laporan inti dan hasil quality disimpan native. Lihat `../artifacts/EXPORT-LIMITATIONS.md`.

Status repository: **NOT RELEASED / DEVICE GATE PENDING**.