# Chongting Tu — Sound Studio

Bilingual sound design portfolio with a white pencil-drawn exterior and recording studio, a door entrance transition, small wall-mounted CDs, illustrated hanging medals and opening jewel-case liner notes.

## Content

- `app/content.ts`: bilingual projects, experience and awards.
- `app/Portfolio.tsx`: bilingual navigation, album notes, video details, awards and opt-in sound controls.
- `app/StudioScene.tsx`: pointer/focus-driven room exploration, wall-mounted CDs, detailed medal sprites and a mixing-desk link to The Bathroom.
- `app/AudioPanel.tsx` and `app/useStudioAudio.ts`: independent music/effects controls, object-specific interaction sounds and background-music ducking.
- `app/Disc.tsx` and `app/cd-studio.css`: optical disc interface and responsive visual system.
- `public/media`: seven web video editions with AAC stereo audio and source-video stills.
- `public/documents`: four supplied work descriptions.
- `public/art`: original generated illustrations for this portfolio.

The spatial interaction is inspired by the supplied ITom reference. The original white hand-drawn exterior and interior have been restored, with restrained colour accents and desaturated medals. Current illustrations and implementation are original; the earlier oil-art and cyber directions have been replaced.

The broadcast chapter contains confirmed Chengdu Universiade production experience; programme footage has not been supplied. Current background music is Airport Lounge by Kevin MacLeod (CC BY 4.0), credited in the interface and `public/sounds/MUSIC-CREDITS.md`. Door, CD case and button effects use the CC0 Freesound recordings listed in `public/sounds/CREDITS.md`. Medal movements use short synthesized metallic contacts. The archived success bell is not used. Audio starts only after the visitor opts in. Source videos were supplied without caption files; web versions use stereo audio.

Work and internship details are bilingual and based on supplied CVs. The Tencent entry links to the official Chasing Kaleidorider website. Navigation remains available without scroll animation and with reduced motion enabled.

## Development

Use the project's pnpm environment and `pnpm dev`. Run `pnpm build` for a Cloudflare-compatible production build. Site registration is retained in `.openai/hosting.json`.

Large video sources are stored as small binary parts in `media-source/`. Both development and build scripts reassemble them into `public/media/` and verify their SHA-256 hashes before starting. This changes only source transport, not video or audio quality. Keep all parts when cloning or moving this project.

## GitHub Pages

The GitHub Pages build shares the same portfolio components. Run `pnpm build:github` to create `dist-github/`, with asset paths scoped to `/Portfolio/`. The workflow in `.github/workflows/pages.yml` builds and publishes pushes to `main`. Set repository Settings → Pages → Source to GitHub Actions. No server or database is needed for this edition.
