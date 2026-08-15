# Voice Selector + Lifecycle Repair

This document records the application-level changes that are not duplicated as a full 182 KB `app.js` export in the audit repository.

## Voice preference

The candidate extends persisted preferences with:

```js
neuralVoice: 'auto'
```

The UI reads the bundled catalog from `FiezelNeuralVoiceConfig.voices.catalog`. Selection accepts `auto` or one of the six bundled voice IDs:

- `af_heart` — Heart
- `af_bella` — Bella
- `af_nicole` — Nicole
- `am_michael` — Michael
- `bf_emma` — Emma
- `bm_george` — George

`auto` preserves authored Listening variation. A fixed selection overrides the authored voice when the application calls neural speech.

## Skills Lab UI

The neural setup card now contains:

- a **Model suara** selector;
- Auto plus all six local voices;
- a **Tes suara** action;
- the existing prepare/verify action.

The neural test disables browser fallback. A successful test must therefore come from the local neural provider rather than being masked by browser TTS.

## Cold-launch behavior

Previous behavior could see `prepared=true` and `ready=false` and still use browser TTS first. The candidate changes the audibility wrapper so already-downloaded assets trigger a bounded neural initialization/resume attempt before browser fallback. This is the key repair for the owner symptom “files are downloaded but neural voice is still not used.”

## Error semantics

The repair also makes playback/fallback failures observable rather than silently successful:

- browser speech `onerror`, never-started, and timeout states reject;
- WebAudio `source.start()` errors propagate;
- `lastFallbackReason` is retained in runtime status;
- one shared AudioContext is used per page/environment;
- prime/model initialization tasks are not duplicated after caller timeouts.

## Regression coverage

The current quality workflow includes:

- `neural-voice-fix-test.js`
- `sw-corp-test.js`
- `neural-voice-product-repair-test.js`
- updated `neural-voice-test.js`
- updated `neural-voice-audibility-test.js`
- updated `ios-cache-compat-test.js`

See `../audit/FULL-WORKFLOW-RESULTS.json` and `../audit/LATEST-GATE-MATRIX.md` for the verified result.
