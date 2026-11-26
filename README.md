# TOKYO: EMPIRE OF SAKURA — Unreal Engine Integration

This repository now contains an Unreal Engine **5.5 C++ project scaffold**.

## Open the project
1. Install Unreal Engine 5.5 through the Epic Games Launcher.
2. Clone this repository.
3. Open `TokyoEmpireOfSakura.uproject`.
4. Allow Unreal Build Tool to generate project files and compile the C++ module.

## Included
- UE 5.5 project descriptor and game/editor targets.
- C++ runtime module with a starter GameMode.
- Enhanced Input, Gameplay Tags, AI, Navigation and UMG module dependencies.
- Baseline renderer configuration for Nanite, Lumen, Virtual Shadow Maps and TSR.
- Unreal-generated folders excluded from Git.

## Planned game content
The target design discussed for this project includes nine districts, an 80-hour campaign, 1,000 missions, 10,000 collectibles, 110 vehicles, 55 characters and 42 animal species. These are design targets, **not content already implemented**.

## 8K capture
The target output is 7680×4320. Final 8K performance and visual quality must be profiled on the target hardware; the configuration is a starting point, not a guarantee of native 8K real-time performance.

## Asset management
Use Git LFS for large source art, audio, textures and other binary assets. Do not commit Unreal's generated `Binaries`, `Intermediate`, `Saved` or `DerivedDataCache` folders.
