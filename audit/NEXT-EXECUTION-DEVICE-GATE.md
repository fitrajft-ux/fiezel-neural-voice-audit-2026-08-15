# Next Execution — Real Device Gate

Tujuan berikutnya bukan deploy baru, melainkan membuktikan hasil repair pada container PWA standalone iPhone tanpa menghapus storage/cache yang menjadi evidence.

1. Gunakan build kandidat dengan `diagBuild=m022-1` dan `SW_REV=m022-neural-voice-selector-20260815-1`. Jangan naikkan `version.js` atau `VERSION.json`.
2. Buka dari ikon Home Screen/PWA standalone. Jangan hapus app, site data, CacheStorage, IndexedDB, atau localStorage.
3. Cold launch seminimal mungkin. Buka panel **Diagnostics**, pastikan `diagBuild` benar, lalu ekspor/kirim hasilnya.
4. Buka Skills Lab. Pastikan selector menampilkan enam voice: Heart, Bella, Nicole, Michael, Emma, George.
5. Pilih satu voice, reload sekali bila perlu, pastikan pilihan tetap tersimpan.
6. Tekan **Uji neural**. PASS hanya jika audio benar-benar terdengar dan hasil provider adalah neural lokal (`kokoro-local`/`neural-local`), bukan browser TTS.
7. Ulangi preview minimal untuk keenam voice; catat voice yang gagal, error, phase, `lastFallbackReason`, `crossOriginIsolated`, storage estimate, dan cache inventory.
8. Verifikasi model/WASM/voice assets ada di cache dan ukuran/content-type masuk akal.
9. Hanya bila semua real-device checks PASS, jalankan ulang seluruh quality suite dan aggregate release audit pada candidate yang sama.
10. Jika satu gate gagal, kembali ke audit/fix loop; jangan rilis.

**Current state:** PENDING. Repository GitHub audit ini tidak mengubah status gate menjadi PASS dan bukan release.