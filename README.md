# Chongting Tu — Sound Studio

Bilingual sound design portfolio with a cyan/cobalt anime recording studio, small wall-mounted CDs, illustrated hanging medals and opening jewel-case liner notes.

## Content

- `app/content.ts`: bilingual projects, experience and awards.
- `app/Portfolio.tsx`: bilingual navigation, album notes, video details, awards and opt-in sound controls.
- `app/StudioScene.tsx`: pointer/focus-driven room exploration, wall-mounted CDs, detailed medal sprites and a mixing-desk link to The Bathroom.
- `app/AudioPanel.tsx` and `app/useStudioAudio.ts`: separate music/effects controls, soft electronic interaction sounds and background-music ducking.
- `app/Disc.tsx` and `app/cd-studio.css`: optical disc interface and responsive visual system.
- `public/media`: seven web video editions with AAC stereo audio and source-video stills.
- `public/documents`: four supplied work descriptions.
- `public/art`: original generated illustrations for this portfolio.

The spatial interaction is inspired by the supplied ITom reference, with the cyan, cobalt and magenta visual direction requested from Kaleidorider. Current illustrations and implementation are original; the earlier oil-art direction has been replaced.

The broadcast chapter contains confirmed Chengdu Universiade production experience; programme footage has not been supplied. Current background music is Airport Lounge by Kevin MacLeod (CC BY 4.0), credited in the interface and `public/sounds/MUSIC-CREDITS.md`. Current interaction sounds are gentle electronic tones synthesized by the website. Audio starts only after the visitor opts in. Source videos were supplied without caption files; web versions use stereo audio.

Work and internship details are bilingual and based on supplied CVs. The Tencent entry links to the official Chasing Kaleidorider website. Navigation remains available without scroll animation and with reduced motion enabled.

## Development

Use the project's pnpm environment and `pnpm dev`. Run `pnpm build` for a Cloudflare-compatible production build. Site registration is retained in `.openai/hosting.json`.

Large video sources are stored as small binary parts in `media-source/`. Both development and build scripts reassemble them into `public/media/` and verify their SHA-256 hashes before starting. This changes only source transport, not video or audio quality. Keep all parts when cloning or moving this project.
