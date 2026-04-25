Vendored v86 assets for the CloudEver homepage terminal.

- `libv86.js`, `v86.wasm`, and `LICENSE` are from the npm package `v86@0.5.334`.
- `seabios.bin` and `vgabios.bin` are from the official `copy/v86` repository.
- `buildroot-bzimage68.bin` is the Buildroot Linux image used by v86 examples.

These files are loaded lazily by `js/team.js` only after the user runs `linux`
inside the homepage terminal.
