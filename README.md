# Chongting Tu — Sound Studio

Bilingual sound design portfolio with an oil-painted studio entrance, a four-album CD collection, a scroll-explorable recording studio and opening jewel-case liner notes.

## Content

- `app/content.ts`: bilingual projects, experience and awards.
- `app/Portfolio.tsx`: bilingual navigation, album notes, video details, awards and opt-in sound controls.
- `app/StudioScene.tsx`: oil-painted entrance, GSAP transition, scroll exploration, interactive CD cases and wall medals.
- `app/Disc.tsx` and `app/cd-studio.css`: optical disc interface and responsive visual system.
- `public/media`: seven web video editions with AAC stereo audio and source-video stills.
- `public/documents`: four supplied work descriptions.
- `public/art`: original generated illustrations for this portfolio.

The architecture is inspired by the supplied ITom reference and Ice-Paperbound interaction study. Oil-painted assets blend the supplied classical painting references with cyan and magenta accents. Illustrations and implementation are original; source from the reference sites is not included.

The broadcast chapter contains the confirmed Chengdu Universiade production experience; programme footage has not been supplied. Four CC0 Freesound recordings are edited and level-adjusted for door, CD case, navigation and award interactions. Sources and processing details are retained in `public/sounds/CREDITS.md` and `provenance.json`, and linked in the site. Sound is disabled until the visitor opts in. Source videos were supplied without caption files; web versions use stereo audio.

Work and internship details are bilingual and based on supplied CVs. The Tencent entry links to the official Chasing Kaleidorider website. Navigation remains available without scroll animation and with reduced motion enabled.

## Development

Use the project's pnpm environment and `pnpm dev`. Run `pnpm build` for a Cloudflare-compatible production build. Site registration is retained in `.openai/hosting.json`.

Large video sources are stored as small binary parts in `media-source/`. Both development and build scripts reassemble them into `public/media/` and verify their SHA-256 hashes before starting. This changes only source transport, not video or audio quality. Keep all parts when cloning or moving this project.
