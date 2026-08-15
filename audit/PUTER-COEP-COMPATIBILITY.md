# Puter / COEP Compatibility Audit

Status: **SOURCE-COMPATIBLE / LIVE OWNER-PWA GATE STILL BLOCKED**

Audit date: 2026-08-15.

## Current evidence

Current upstream `HeyPuter/puter` server source at commit `f15d835eeb6e57455a394ad81b2b21d4c0706824` installs global middleware that sets:

```text
Cross-Origin-Resource-Policy: cross-origin
```

The source explicitly describes this as allowing cross-origin reads. This is structurally compatible with FIEZEL's `Cross-Origin-Embedder-Policy: require-corp` requirement for the Puter script resource.

Puter's current documentation also continues to publish `https://js.puter.com/v2/` as the supported CDN script tag.

## What this does not prove

The audit sandbox could not resolve `js.puter.com` through its local DNS, and the web fetch interface cannot expose the production JavaScript response headers. Therefore the exact CDN response seen by the owner's standalone iPhone PWA has not been captured.

The candidate service worker no longer fabricates a readable `200` response from an opaque `no-cors` response. It attempts CORS and otherwise preserves the opaque response. This removes the known empty-body corruption path, but `puterLoaded` on the owner device remains the authoritative integration gate.

## Release criterion

`puterLoaded:true` and successful Puter-dependent behavior must be observed with the candidate service worker controlling the standalone PWA. Until that evidence exists, live integration remains BLOCKED.
