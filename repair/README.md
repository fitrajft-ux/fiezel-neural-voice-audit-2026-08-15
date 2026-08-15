# Repair artifact

The authoritative repair diff is stored as six binary chunks under `repair/parts/` because a single large connector payload was observed to truncate during publication. The truncated single-file artifact was deliberately removed rather than left as valid evidence.

Reconstruct and verify:

```bash
cat repair/parts/repair.patch.gz.part00 \
    repair/parts/repair.patch.gz.part01 \
    repair/parts/repair.patch.gz.part02 \
    repair/parts/repair.patch.gz.part03 \
    repair/parts/repair.patch.gz.part04 \
    repair/parts/repair.patch.gz.part05 > repair.patch.gz
sha256sum repair.patch.gz
# expected: ca1a1ba775cff188c74a6f1b11ad89263a4e8fc50ef64b4f728ad38ff1b6f870

gzip -dc repair.patch.gz > repair.patch
sha256sum repair.patch
# expected: 3e524cfa37fa6ded34413d03ec1bef0e071c1ac4aef4da36d08cdb30baf0f76e

git apply --check repair.patch
```

`repair.patch` is the byte-level diff from the owner-provided ZIP baseline to the audited local candidate. The selected files under `candidate/` exist for quick review; this patch is the complete repair artifact.

This is **not a release**. Do not apply/deploy it to production until every release gate in `../audit/LATEST-GATE-MATRIX.md` is PASS, including standalone iPhone neural audibility after cold relaunch and live Puter/COEP behavior.
