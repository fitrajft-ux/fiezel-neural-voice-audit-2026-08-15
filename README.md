# FIEZEL Neural Voice Audit Candidate

**Status: UNRELEASED / RELEASE BLOCKED**

This snapshot is derived from the owner-provided deployment ZIP. It is an audit-and-repair candidate, not a deployment or a claim of device verification. The original `fitrajft-ux/FIEZEL-APPS` repository was not used as the repair target.

Current verified results:

- all 39 commands in the current `quality.yml`: **PASS**;
- consolidated source + workflow gates: **46/46 PASS**;
- `release-audit.py`: **154/0 PASS**;
- direct vendored Kokoro ONNX/WASM inference: **6/6 voices PASS** with non-empty 24 kHz waveform;
- release remains **BLOCKED** until the standalone owner iPhone PWA produces audible `kokoro-local` output after cold relaunch and Puter remains functional under the candidate service worker/COEP context.

Start with:

- `audit/LATEST-AUDIT-REPORT.md` — current findings and repair rationale
- `audit/LATEST-GATE-MATRIX.md` / `audit/LATEST-GATE-RESULTS.json` — current gates
- `audit/KOKORO-INFERENCE-EVIDENCE.md` — six-voice runtime inference proof
- `audit/PUTER-COEP-COMPATIBILITY.md` — Puter integration analysis
- `audit/NEXT-EXECUTION-DEVICE-GATE.md` — mandatory owner-device gate
- `audit/LATEST-RELEASE-DECISION.md` — explicit no-release decision
- `repair/` — patch/manifest repair artifacts
- `candidate/` — review snapshot of changed source files

Do not enable Pages, create a GitHub Release, or tag this candidate as released while any gate is BLOCKED or FAIL.
