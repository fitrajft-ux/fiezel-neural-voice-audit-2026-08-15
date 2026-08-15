# Next Execution — Mandatory Owner Device Gate

Current state: **UNRELEASED candidate; all deterministic application gates pass; owner-device integration gates remain blocked.**

## Run on the owner iPhone Home Screen PWA

Do not delete the PWA, clear Safari website data, bump `version.js`, or bump `VERSION.json` before collecting evidence.

1. Open the candidate from the Home Screen standalone PWA.
2. Cold-close it once from the app switcher and relaunch once so the candidate service worker controls the page.
3. Open **Diagnostics** and export the payload before repeated launches erode historical evidence.
4. Record `crossOriginIsolated`, `puterLoaded`, storage quota/usage, neural cache inventory, `prepared`, `ready`, `error`, and `lastFallbackReason`.
5. Open **Skills Lab** and confirm the voice selector shows Auto, Heart, Bella, Nicole, Michael, Emma, and George.
6. Select Heart and run the neural test. PASS requires physically audible output and provider `kokoro-local`.
7. Select a second voice (for example Emma or Michael). Confirm the audible voice changes and provider remains `kokoro-local`.
8. Cold-close and relaunch. Do **not** prepare/download again. Run the neural test. PASS requires neural audio from existing storage without another ~113 MB download.
9. Run one Listening item. With a fixed voice selected it should override authored variation; switch back to Auto and confirm authored variation returns.
10. Verify Puter-dependent application functionality still works. `puterLoaded:false` is a release blocker.
11. Export Diagnostics again and add redacted before/after payloads to `audit/device-evidence/`.

## After device evidence

- If any gate fails, classify by `lastFallbackReason` before changing code again.
- Re-run all 39 quality commands, consolidated 46 gates, `release-audit.py`, and the 6-voice inference smoke after any repair.
- Only when automated + device + live integration gates are all PASS may a tag/deploy/release be considered.
