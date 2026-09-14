'use client';
/* eslint-disable next/no-img-element -- Original scene artwork is aligned with interactive wall objects. */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Disc3,
  Focus,
  MousePointer2,
  SlidersHorizontal,
} from 'lucide-react';
import gsap from 'gsap';
import Disc from './Disc';
import { awards, type Lang } from './content';
import type { SoundCue } from './audio';

export const albums = [
  {
    page: 1,
    zh: '游戏与动画',
    en: 'Games & animation',
    word: 'PLAY',
    color: '#52e5ed',
    number: '01',
    subtitle: 'INTERACTIVE WORLDS',
  },
  {
    page: 2,
    zh: '影视与戏剧',
    en: 'Film & theatre',
    word: 'FRAME',
    color: '#fb64ca',
    number: '02',
    subtitle: 'SOUND & NARRATIVE',
  },
  {
    page: 3,
    zh: '广播电视',
    en: 'Broadcast',
    word: 'ON AIR',
    color: '#d3fa57',
    number: '03',
    subtitle: 'THE LIVE MOMENT',
  },
  {
    page: 4,
    zh: '过往经历',
    en: 'Experience',
    word: 'NOTES',
    color: '#8c9fff',
    number: '04',
    subtitle: 'LEARNING & MAKING',
  },
];
type Props = {
  lang: Lang;
  view: 'front' | 'shelf';
  onView: (v: 'front' | 'shelf') => void;
  onRead: (page: number) => void;
  onSound: (cue?: SoundCue) => void;
  onAward: (i: number) => void;
  onDrama: () => void;
  sound: boolean;
};
const positions = [
  { x: 50, y: 50, s: 1 },
  { x: 38, y: 62, s: 1.75 },
  { x: 62, y: 33, s: 2.55 },
  { x: 82, y: 31, s: 2.5 },
  { x: 74, y: 64, s: 1.65 },
];
export default function StudioScene({
  lang,
  view,
  onRead,
  onSound,
  onAward,
  onDrama,
}: Props) {
  const [zone, setZone] = useState(view === 'shelf' ? 2 : 0),
    [picked, setPicked] = useState(0),
    [medal, setMedal] = useState(0);
  const [failed, setFailed] = useState(false);
  const camera = useRef<HTMLDivElement>(null);
  const tr = (zh: string, en: string) => (lang === 'zh' ? zh : en);
  useEffect(() => {
    const p = positions[zone],
      reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const limit = (p.s - 1) * 50,
      clamp = (v: number) => Math.max(-limit, Math.min(limit, v));
    const animation = gsap.to(camera.current, {
      scale: reduced ? 1 : p.s,
      xPercent: reduced ? 0 : clamp((50 - p.x) * p.s),
      yPercent: reduced ? 0 : clamp((50 - p.y) * p.s),
      duration: reduced ? 0 : 0.85,
      ease: 'power3.inOut',
      overwrite: true,
    });
    return () => {
      animation.kill();
    };
  }, [zone]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZone(0);
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  function focus(n: number) {
    if (n !== zone) {
      setZone(n);
      onSound('button');
    }
  }
  const names = [
    tr('全景', 'Overview'),
    tr('调音台', 'Mixing desk'),
    tr('墙上 CD', 'CD wall'),
    tr('奖章', 'Awards'),
    tr('过往经历', 'Experience'),
  ];
  const descriptions = [
    tr(
      '移动到物件，靠近探索。点击打开作品。',
      'Move to an object to look closer. Click to open.',
    ),
    tr(
      '舞台上的情绪，也可以由声音讲述。',
      'Sound carries the emotion of a stage performance.',
    ),
    albums[picked][lang],
    awards[medal].name[lang],
    tr('从录音棚到游戏引擎。', 'From the recording studio to the game engine.'),
  ];
  function open() {
    onSound(zone === 3 ? 'award' : 'case');
    if (zone === 1) onDrama();
    if (zone === 2) onRead(albums[picked].page);
    if (zone === 3) onAward(medal);
    if (zone === 4) onRead(4);
  }
  return (
    <section className="neo-studio">
      <div className="neo-room-heading">
        <div>
          <span>SOUND DESIGN / CHONGTING TU</span>
          <h1>{tr('在声音的房间里。', 'A room for sound.')}</h1>
        </div>
        <span className="room-index">STUDIO 01 / 2026</span>
      </div>
      <div className={'neo-viewport zone-' + zone}>
        <div className="neo-camera" ref={camera}>
          <img
            src="/art/neon-studio.png"
            className="neo-room-image"
            alt={tr(
              '蓝白色未来录音棚，窗边调音台与挂有 CD、奖章的墙面',
              'A blue-and-white recording studio with a mixing desk, wall-mounted CDs and medals',
            )}
            onError={() => setFailed(true)}
          />
          <button
            className="neo-console-target"
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') focus(1);
            }}
            onFocus={() => focus(1)}
            onClick={() => {
              if (zone === 1) {
                onSound('case');
                onDrama();
              } else focus(1);
            }}
            aria-label={tr(
              '调音台：打开 The Bathroom 戏剧声音作品',
              'Mixing desk: open The Bathroom theatre sound project',
            )}
          >
            <span>
              <SlidersHorizontal size={14} />
              DRAMA / THE BATHROOM
            </span>
          </button>
          <div
            className="neo-wall-discs"
            aria-label={tr('墙上 CD 作品收藏', 'Wall-mounted CD collection')}
          >
            <span className="wall-label">SELECTED WORKS</span>
            <div>
              {albums.map((a, i) => (
                <button
                  className={
                    'neo-wall-disc' +
                    (zone === 2 && picked === i ? ' active' : '')
                  }
                  key={a.word}
                  style={{ '--disc-color': a.color } as CSSProperties}
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') {
                      setPicked(i);
                      focus(2);
                    }
                  }}
                  onFocus={() => {
                    setPicked(i);
                    focus(2);
                  }}
                  onClick={() => {
                    if (zone === 2 && picked === i) {
                      onSound('case');
                      onRead(a.page);
                    } else {
                      setPicked(i);
                      focus(2);
                    }
                  }}
                  aria-label={a[lang]}
                >
                  <Disc title={a.word} number={a.number} color={a.color} />
                  <span>{a.number}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="neo-medal-wall">
            <span className="wall-label">RECOGNITION</span>
            <div>
              {awards.map((a, i) => (
                <button
                  key={a.name.en}
                  className={
                    'neo-medal' + (zone === 3 && medal === i ? ' active' : '')
                  }
                  onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') {
                      setMedal(i);
                      focus(3);
                    }
                  }}
                  onFocus={() => {
                    setMedal(i);
                    focus(3);
                  }}
                  onClick={() => {
                    if (zone === 3 && medal === i) {
                      onSound('award');
                      onAward(i);
                    } else {
                      setMedal(i);
                      focus(3);
                    }
                  }}
                  aria-label={a.name[lang]}
                >
                  <span
                    className="medal-sprite"
                    style={{
                      backgroundPosition: [
                        '0% 0%',
                        '100% 0%',
                        '0% 100%',
                        '100% 100%',
                      ][i],
                    }}
                  />
                  <span className="medal-year">{a.year}</span>
                </button>
              ))}
            </div>
          </div>
          <button
            className="neo-experience-target"
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') focus(4);
            }}
            onFocus={() => focus(4)}
            onClick={() => {
              if (zone === 4) {
                onSound('case');
                onRead(4);
              } else focus(4);
            }}
          >
            <span>PERSONAL NOTES</span>
            <strong>{tr('过往经历', 'Experience')}</strong>
          </button>
        </div>
        {zone > 0 && (
          <button className="neo-reset" onClick={() => focus(0)}>
            <ArrowLeft size={16} />
            {tr('回到全景', 'Full room')}
          </button>
        )}
        <div className="neo-coordinate">
          <Focus size={14} />
          {zone === 0 ? 'STUDIO / EXPLORE' : 'FOCUS / 0' + zone}
        </div>
        {failed && (
          <p className="neo-image-error">
            {tr(
              '场景图未能加载，可使用下方目录浏览。',
              'The scene could not load. Use the navigation below.',
            )}
          </p>
        )}
        <div
          className={'neo-object-note' + (zone === 0 ? ' overview-note' : '')}
        >
          <span>
            {zone === 0 ? <MousePointer2 size={16} /> : <Disc3 size={16} />}{' '}
            {names[zone]}
          </span>
          <p>{descriptions[zone]}</p>
          {zone > 0 && (
            <button onClick={open}>
              {zone === 1
                ? tr('观看戏剧作品', 'Watch theatre project')
                : zone === 3
                  ? tr('查看奖项', 'View award')
                  : tr('打开', 'Open')}
              <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>
      <div className="neo-bottom-bar">
        <nav aria-label={tr('录音棚探索区域', 'Studio areas')}>
          {names.map((n, i) => (
            <button key={i} onClick={() => focus(i)} aria-pressed={zone === i}>
              <span>0{i}</span>
              {n}
            </button>
          ))}
        </nav>
        <p>
          {tr(
            '移动探索 / 点击打开 / ESC 返回',
            'Explore / Click to open / ESC to return',
          )}
        </p>
      </div>
      <nav
        className="neo-direct-links"
        aria-label={tr('直接浏览作品和经历', 'Browse works and experience')}
      >
        {albums.map((a) => (
          <button
            key={a.word}
            onClick={() => {
              onSound('case');
              onRead(a.page);
            }}
          >
            <span>{a.number}</span>
            {a[lang]}
            <ArrowUpRight size={14} />
          </button>
        ))}
      </nav>
    </section>
  );
}
