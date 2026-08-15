# Large Neural Asset Manifest

Aset berikut ada di snapshot kandidat lokal dan dihitung SHA-256. Binary besar tidak ditransfer melalui GitHub connector pada ekspor audit ini; integritasnya direkam di sini.

| Asset | Bytes | SHA-256 |
|---|---:|---|
| `vendor/kokoro-model/onnx/model_quantized.onnx` | 92,361,116 | `fbae9257e1e05ffc727e951ef9b9c98418e6d79f1c9b6b13bd59f5c9028a1478` |
| `vendor/kokoro-js/wasm/ort-wasm-simd-threaded.jsep.wasm` | 21,596,019 | `c46655e8a94afc45338d4cb2b840475f88e5012d524509916e505079c00bfa39` |
| `vendor/kokoro-model/voices/af_heart.bin` | 522,240 | `d583ccff3cdca2f7fae535cb998ac07e9fcb90f09737b9a41fa2734ec44a8f0b` |
| `vendor/kokoro-model/voices/af_bella.bin` | 522,240 | `f69d836209b78eb8c66e75e3cda491e26ea838a3674257e9d4e5703cbaf55c8b` |
| `vendor/kokoro-model/voices/af_nicole.bin` | 522,240 | `cd2191ab31b914ed7b318416b0e4440fdf392ddad9106a060819aa600a64f59a` |
| `vendor/kokoro-model/voices/am_michael.bin` | 522,240 | `1d1f21dd8da39c30705cd4c75d039d265e9bc4a2a93ed09bc9e1b1225eb95ba1` |
| `vendor/kokoro-model/voices/bf_emma.bin` | 522,240 | `669fe0647f9dd04fcab92f1439a40eeb4c8b4ab1f82e4996fe3d918ce4a63b73` |
| `vendor/kokoro-model/voices/bm_george.bin` | 522,240 | `c4b235a4c1f2cd3b939fed08b899ce9385638b763f7b73a59616c4fc9bd6c9bc` |

Full candidate archive: `FIEZEL-NEURAL-VOICE-AUDIT-CANDIDATE-2026-08-15.zip`, 119 MB, SHA-256 `78e8793594d30af12233dfa8f3e58482b88d8cdebf571fda691f59986ecd03f5`.

Catatan: archive 119 MB melebihi batas single-file GitHub biasa. Repo audit ini karena itu menyimpan repair/evidence langsung dan hash untuk binary besar; ini tidak boleh ditafsirkan sebagai release artifact.