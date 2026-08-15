# Latest Gate Matrix

| Gate | Status | Evidence |
|---|---|---|
| Root + neural JS syntax | PASS | consolidated gate rerun |
| Broken `}){` regression pattern | PASS | source gate |
| `version.js` / `VERSION.json` unchanged | PASS | git diff gate |
| Vendor model/WASM/voice binaries unchanged | PASS | artifact inventory + diff gate |
| Full `quality.yml` Node commands | **PASS 39/39** | workflow rerun |
| Static/source + workflow aggregate | **PASS 46/46** | gate runner |
| `release-audit.py` | **PASS 154/0** | aggregate audit |
| Neural runtime/integrity | PASS 39/0 | `neural-voice-test.js` |
| iOS WASM | PASS | `ios-wasm-module-test.js` |
| iOS CacheStorage / duplicate-prime regression | PASS | `ios-cache-compat-test.js` |
| Neural HTTP/range | PASS | `neural-voice-http-test.js` |
| Neural audibility lifecycle | PASS | `neural-voice-audibility-test.js` |
| Diagnostics | PASS | `diag-panel-test.js` |
| AudioContext/fallback repair | PASS | `neural-voice-fix-test.js` |
| SW CORS/opaque handling | PASS | `sw-corp-test.js` |
| Voice selector/product repair | PASS | `neural-voice-product-repair-test.js` |
| Actual local Kokoro inference | **PASS 6/6 voices** | `KOKORO-INFERENCE-EVIDENCE.md` |
| Puter upstream CORP source compatibility | PASS (source only) | `PUTER-COEP-COMPATIBILITY.md` |
| `npm install --ignore-scripts` in audit sandbox | BLOCKED | outbound DNS/network unavailable |
| Headless Chromium + service-worker E2E | BLOCKED | sandbox Chromium cannot reach loopback |
| Real iPhone PWA audible Kokoro output | **BLOCKED** | owner device required |
| Live Puter under owner COEP/SW context | **BLOCKED** | owner device required |
| Release | **BLOCKED** | every gate must PASS before release |
