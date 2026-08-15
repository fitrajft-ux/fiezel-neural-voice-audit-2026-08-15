# FIEZEL Neural Voice — Latest Audit Report

Date: 2026-08-15  
Status: **UNRELEASED / RELEASE BLOCKED**

## Executive conclusion

The owner-provided ZIP passed its existing automated neural checks, but those checks did not prove that neural audio was actually selected after a cold launch and did not cover a user-selectable voice UI. The audit found multiple deterministic lifecycle/error-handling defects that can explain the symptom “assets are already downloaded but neural voice is not usable.”

The candidate repair addresses those deterministic defects and exposes all six bundled Kokoro voices: `af_heart`, `af_bella`, `af_nicole`, `am_michael`, `bf_emma`, `bm_george`.

Automated evidence is now strong: all current quality commands pass, the repository aggregate audit passes, and direct local inference against the exact vendored ONNX/WASM/voice files generates non-empty waveform for all six voices. Release is still blocked because the authoritative standalone iPhone PWA audibility/cold-relaunch/Puter integration gate has not been observed.

## Confirmed findings and repairs

1. **No user voice selector existed.** Added persistent Auto + six-voice selection and a neural test action.
2. **Prepared assets were not neural-first after cold launch.** The old wrapper could choose browser TTS while `prepared=true` but `ready=false`. The repair attempts bounded neural initialization first without redownloading.
3. **AudioContext lifecycle could multiply contexts.** The repair shares one context per page/environment.
4. **Fallback paths could report false success.** Browser TTS/WebAudio failure paths now reject/report failure instead of resolving as success.
5. **iOS priming could misreport storage progress.** Storage/quota/cache verification now precedes completion claims.
6. **Prime timeout could start duplicate ~113 MB work.** A single prime task is retained; timeout no longer launches a second concurrent downloader.
7. **ONNX init timeout could permit duplicate sessions.** One backend-init task is retained and late completion can be adopted rather than discarded.
8. **Service worker opaque-response handling could corrupt third-party scripts.** The candidate no longer fabricates a readable 200 body from an opaque `no-cors` response; CORS is attempted and opaque fallback is preserved.

## Latest automated evidence

- Current `quality.yml` Node commands: **39/39 PASS**.
- Consolidated static/source + workflow gates: **46/46 PASS, 0 FAIL**.
- Repository `release-audit.py`: **154 PASS / 0 FAIL**.
- Neural runtime/integrity: **39/0 PASS**.
- Speaking + Listening: **25/0 PASS**.
- Product audit: **49/0 PASS**.
- Direct Kokoro inference: **6/6 bundled voices PASS**, non-empty 24 kHz waveform.
- `version.js` / `VERSION.json`: unchanged.
- Vendored ONNX/WASM/voice binaries: unchanged.

## Puter / COEP

Current upstream Puter server source sets `Cross-Origin-Resource-Policy: cross-origin`, which is structurally compatible with FIEZEL `COEP: require-corp`. This does not replace the owner-device gate: the exact production CDN response and `puterLoaded` under the candidate service worker must still be observed on the standalone PWA.

## Remaining release blockers

- Physical iPhone standalone PWA has not yet produced verified audible `kokoro-local` output for at least two selected voices.
- Cold relaunch from the owner’s already-downloaded storage has not yet been verified without another large download.
- `puterLoaded:true` and Puter-dependent behavior have not yet been verified under the candidate service worker/COEP context.
- Chromium in the audit sandbox cannot navigate to the local loopback server, so browser/service-worker E2E is not provable here.
- `npm install --ignore-scripts` cannot be re-proven locally because outbound DNS/network is unavailable in this sandbox.

## Release rule

No tag, GitHub Release, Pages deploy, or merge into the original application repository while any release gate is BLOCKED or FAIL.
