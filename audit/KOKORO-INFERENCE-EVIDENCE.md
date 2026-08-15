# Kokoro Local Inference Evidence

Status: **PASS (runtime inference), not a substitute for physical iPhone audibility**

The audit reran the bundled browser-oriented Kokoro runtime against an explicit local HTTP server and the exact vendored artifacts in the candidate.

Observed HTTP reads included tokenizer config/tokenizer, model config, `model_quantized.onnx`, `ort-wasm-simd-threaded.jsep.wasm`, and all six bundled voice binaries.

All six voices generated non-empty waveform data at 24 kHz:

| Voice | Samples | Result |
|---|---:|---|
| `af_heart` | 37,800 | PASS |
| `af_bella` | 39,000 | PASS |
| `af_nicole` | 45,600 | PASS |
| `am_michael` | 42,600 | PASS |
| `bf_emma` | 38,400 | PASS |
| `bm_george` | 40,800 | PASS |

The rerun loaded the model in roughly 1.9 seconds in the audit runtime; short-utterance generation took roughly 3.4–4.5 seconds per voice. These timings are environment-specific and are not iPhone performance claims.

The runtime logged `caches is not defined` warnings because this inference harness intentionally runs outside a browser CacheStorage environment. Despite that unavailable cache API, model/WASM/voice loading and waveform generation completed successfully.

This proves the vendored neural inference assets can generate audio data. It does **not** prove WebAudio playback, service-worker control, iOS memory behavior, or physical audibility on the owner PWA; those remain separate release gates.
