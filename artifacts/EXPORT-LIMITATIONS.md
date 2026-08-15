# Export Limitations

Repository ini adalah **audit repository**, bukan release artifact.

## Byte-preserving status

- Full candidate lokal: `FIEZEL-NEURAL-VOICE-AUDIT-CANDIDATE-2026-08-15.zip`
  - size: **124,063,918 bytes**
  - SHA-256: `78e8793594d30af12233dfa8f3e58482b88d8cdebf571fda691f59986ecd03f5`
  - tidak dipush sebagai single GitHub file karena ukurannya melampaui batas file GitHub biasa 100 MiB.
- Audit reports lokal: `FIEZEL-NEURAL-VOICE-AUDIT-REPORTS-2026-08-15.zip`
  - size: **191,224 bytes**
  - SHA-256: `6deee2294395fee1b4daffa0c30fcc04581f087bbda08fbf89c9065f389bab51`
  - percobaan binary transfer melalui connector menghasilkan blob hanya 7,521 byte. Consistency pass mendeteksinya dan file korup tersebut sudah dihapus.

Karena connector saat ini tidak menyediakan upload local-file byte stream / Git LFS, repository ini tidak menyatakan archive besar tersebut sudah diekspor byte-for-byte.

## Yang tersedia langsung

Laporan inti, findings, gate matrix, release decision, handoff source, quality summary, SHA-256 evidence ledger, repair manifest, neural source repair extract, regression selector test, large-asset hash manifest, dan release-blocker issue tersedia native di GitHub.

`AUDIT-SHA256SUMS.txt` menyimpan hash file evidence asli, termasuk full patch dan test logs, sehingga tidak ada evidence yang diberi status palsu sebagai terunggah bila transfernya tidak dapat diverifikasi.

## Release implication

Tidak ada. Export GitHub tidak mengubah `realDeviceGate=PENDING`, tidak mengubah `productionClaim=false`, dan tidak memberi izin deploy/release.