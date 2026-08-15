# Audit Loop Log — Neural Voice

Date: 2026-08-15  
Release state: **BLOCKED / NO RELEASE**

## Loop 0 — Baseline

- Started from the owner-provided deploy ZIP, not the active source repository.
- Existing neural/unit gates were green, proving existing harnesses did not reproduce the owner symptom.
- Confirmed six Kokoro voice binaries exist, but no user-facing voice selector existed.
- Confirmed downloaded/prepared state was not equivalent to neural-ready state after cold launch.

Decision: expand coverage before claiming a fix.

## Loop 1 — Runtime lifecycle audit

Findings:

- prepared-but-not-ready could be browser-TTS-first;
- multiple AudioContext creation paths could exhaust WebKit resources;
- fallback errors could resolve as success;
- WebAudio start errors could be swallowed;
- prime/model caller timeouts could leave work running and allow duplicate tasks.

Repair:

- neural-first bounded resume from prepared assets;
- singleton AudioContext;
- explicit failure propagation + `lastFallbackReason`;
- single prime task and single backend-init task.

Regression: targeted neural lifecycle tests PASS.

## Loop 2 — Storage / service worker audit

Findings:

- iOS priming could advance progress despite cache failure;
- storage preflight was not consistently authoritative;
- old CORP compatibility path attempted to reconstruct opaque `no-cors` responses, which can produce an empty synthetic 200 response.

Repair:

- preflight quota + verify cached artifacts before marking complete;
- CORS-first third-party fetch; opaque fallback preserved unchanged;
- added service-worker regression gates.

Regression: iOS cache + SW CORP gates PASS.

## Loop 3 — Product surface audit

Finding: all six voices were bundled but invisible to the user.

Repair:

- persistent Auto/fixed voice preference;
- selector for Heart, Bella, Nicole, Michael, Emma, George;
- neural-only test action so browser fallback cannot masquerade as neural success;
- fixed voice overrides authored Listening variation; Auto preserves it.

Regression: product/selector gates PASS.

## Loop 4 — Full automated rerun

- all 39 current `quality.yml` Node commands: **PASS 39/39**;
- consolidated static/source + workflow gates: **PASS 46/46**;
- aggregate `release-audit.py`: **PASS 154/0**, exit code 0;
- direct local Kokoro ONNX/WASM inference: **PASS 6/6 voices**, non-empty 24 kHz waveform.

This proves the candidate source and vendored inference assets pass deterministic automated checks.

## Loop 5 — External integration audit

- Current upstream Puter source sets `Cross-Origin-Resource-Policy: cross-origin`, structurally compatible with `COEP: require-corp`.
- Exact production CDN + owner PWA behavior is not directly observable from this sandbox.
- Chromium in this sandbox cannot reach the local loopback server, so a valid service-worker/browser E2E cannot be claimed.
- Physical standalone iPhone audibility has not been observed.

Decision: **BLOCKED / NO RELEASE**.

## Next loop

Run `NEXT-EXECUTION-DEVICE-GATE.md` on the owner Home Screen PWA. If any device gate fails, use exported Diagnostics and `lastFallbackReason` to open the next repair loop; then rerun all automated gates from Loop 4. Release is permitted only when every mandatory automated + device + live-integration gate is PASS.
