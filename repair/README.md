# Repair artifact

`repair.patch.gz` is the compressed authoritative repair diff generated from the owner-provided ZIP baseline to the audited candidate.

To inspect it locally:

```bash
gzip -dc repair.patch.gz > repair.patch
sha256sum -c repair.patch.sha256
git apply --check repair.patch
```

The checksum file records both the uncompressed patch and its compressed GitHub artifact.

This artifact is **not a release**. Do not apply it to production until every release gate in `../audit/LATEST-GATE-MATRIX.md` is PASS, including the physical standalone iPhone PWA audibility/cold-relaunch and live Puter/COEP gates.
