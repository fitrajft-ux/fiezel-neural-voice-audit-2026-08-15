# Candidate source export

Folder ini berisi source repair neural-voice terpilih untuk inspeksi cepat. **Ini bukan release tree dan tidak boleh dideploy sebagai pengganti aplikasi production.**

Authoritative audit evidence berada di:

- `../audit/LATEST-AUDIT-REPORT.md`
- `../audit/LATEST-FINDINGS.json`
- `../audit/LATEST-GATE-MATRIX.md`
- `../audit/FULL-WORKFLOW-RESULTS.json`
- `../audit/RELEASE-AUDIT-SUMMARY.json`
- `../repair/REPAIR-MANIFEST-2026-08-15.json`
- `../repair/REPAIR-PATCH-SHA256.txt`
- `../artifacts/LARGE-ASSET-MANIFEST.md`

Full application candidate lokal sekitar 119 MB dan binary model/WASM besar tidak diduplikasi ke repository audit ini. Binary tersebut tetap byte-identical terhadap ZIP input dan direkam dengan ukuran/hash pada manifest artifacts. Review UI selector/cold-launch repair diringkas di `VOICE-SELECTOR-AND-LIFECYCLE.md`; source neural yang lebih kecil disimpan langsung di subfolder `features/neural-voice/`.

Status: **UNRELEASED / DEVICE GATE PENDING**.
