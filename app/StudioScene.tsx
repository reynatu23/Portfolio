'use client';
/* eslint-disable next/no-img-element -- Pre-sized original paintings are mapped to interactive scene coordinates. */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Disc3,
  Headphones,
  Mouse,
  X,
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
    color: '#66c6c7',
    number: '01',
    subtitle: 'INTERACTIVE WORLDS',
  },
  {
    page: 2,
    zh: '影视与戏剧',
    en: 'Film & theatre',
    word: 'FRAME',
    color: '#dc8b68',
    number: '02',
    subtitle: 'SOUND & NARRATIVE',
  },
  {
    page: 3,
    zh: '广播电视',
    en: 'Broadcast',
    word: 'ON AIR',
    color: '#d6be7b',
    number: '03',
    subtitle: 'THE LIVE MOMENT',
  },
  {
    page: 4,
    zh: '过往经历',
    en: 'Experience',
    word: 'NOTES',
    color: '#d98faf',
    number: '04',
    subtitle: 'LEARNING & MAKING',
  },
];
type Props = {
  lang: Lang;
  view: 'front' | 'shelf';
  onView: (view: 'front' | 'shelf') => void;
  onRead: (page: number) => void;
  onSound: (cue?: SoundCue) => void;
  onAward: (index: number) => void;
  sound: boolean;
};

export default function StudioScene({
  lang,
  view,
  onView,
  onRead,
  onSound,
  onAward,
  sound,
}: Props) {
  const [picked, setPicked] = useState<number | null>(null);
  const [opening, setOpening] = useState(false);
  const [entering, setEntering] = useState(false);
  const [zone, setZone] = useState(0);
  const [imageError, setImageError] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const scrollRoot = useRef<HTMLElement>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);
  const meter = useRef<HTMLDivElement>(null);
  const tr = (zh: string, en: string) => (lang === 'zh' ? zh : en);
  useEffect(
    () => () => {
      transition.current?.kill();
    },
    [],
  );
  useEffect(() => {
    if (view !== 'shelf') return;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!scrollRoot.current || !canvas.current) return;
      const rect = scrollRoot.current.getBoundingClientRect();
      const travel = Math.max(1, rect.height - window.innerHeight + 100);
      const progress = Math.max(0, Math.min(1, (100 - rect.top) / travel));
      const stops = [
        { s: 1, x: 50, y: 50 },
        { s: 1.6, x: 13, y: 72 },
        { s: 1.3, x: 50, y: 44 },
        { s: 1.75, x: 87, y: 38 },
      ];
      const f = progress * 3,
        n = Math.min(2, Math.floor(f)),
        t = f - n;
      const mix = (a: number, b: number) => a + (b - a) * t;
      const reduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      canvas.current.style.transform = reduced
        ? 'none'
        : `scale(${mix(stops[n].s, stops[n + 1].s)})`;
      canvas.current.style.transformOrigin = `${mix(stops[n].x, stops[n + 1].x)}% ${mix(stops[n].y, stops[n + 1].y)}%`;
      if (meter.current) meter.current.style.width = `${progress * 100}%`;
      setZone(Math.round(f));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(raf);
    };
  }, [view]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        transition.current?.kill();
        setPicked(null);
        setOpening(false);
        setEntering(false);
        if (scene.current) gsap.set(scene.current, { opacity: 1, scale: 1 });
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);
  function jump(n: number) {
    if (!scrollRoot.current) return;
    onSound('button');
    const top =
      scrollRoot.current.getBoundingClientRect().top + window.scrollY - 100;
    const travel = scrollRoot.current.offsetHeight - window.innerHeight + 100;
    window.scrollTo({
      top: Math.max(0, top + (travel * n) / 3),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }
  function enter() {
    if (entering) return;
    setEntering(true);
    onSound('door');
    const reduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    transition.current = gsap
      .timeline({ onComplete: () => onView('shelf') })
      .to(scene.current, {
        scale: reduced ? 1 : 2.3,
        opacity: 0,
        duration: reduced ? 0.1 : 1,
        ease: 'power3.inOut',
      });
  }
  function pick(i: number) {
    if (opening) return;
    if (picked === i) {
      read(i);
      return;
    }
    onSound('case');
    setPicked(i);
  }
  function read(i: number) {
    if (opening) return;
    onSound('case');
    setOpening(true);
    transition.current = gsap
      .timeline({ onComplete: () => onRead(albums[i].page) })
      .to(
        {},
        {
          duration: window.matchMedia('(prefers-reduced-motion: reduce)')
            .matches
            ? 0.05
            : 0.65,
        },
      );
  }
  return (
    <section className={'sound-environment ' + view} ref={scrollRoot}>
      <div className={view === 'shelf' ? 'explore-sticky' : ''}>
        <div className="environment-caption">
          <span>CHONGTING TU / REYNA</span>
          <span>
            {tr(
              '声音、画面与记忆的收藏室',
              'A COLLECTION OF SOUND, IMAGE & MEMORY',
            )}
          </span>
          <span>VOL. 2026</span>
        </div>
        <div className="painted-stage" ref={scene}>
          <div className="painted-camera" ref={canvas}>
            <img
              className="painted-room"
              src={
                '/art/' +
                (view === 'front' ? 'exterior-oil' : 'interior-oil') +
                '.png'
              }
              alt={tr(
                view === 'front'
                  ? '金色灯光与深蓝阴影中的油画声音工作室'
                  : '带有调音台、CD 收藏和奖章墙的油画录音棚',
                view === 'front'
                  ? 'An oil-painted sound studio in amber light and deep blue shadows'
                  : 'An oil-painted recording studio with a mixing desk, CD collection and award wall',
              )}
              onError={() => setImageError(true)}
            />
            {view === 'front' ? (
              <>
                <div className="painted-sign">
                  <span>REYNA TU’S</span>
                  <strong>SOUND STUDIO</strong>
                </div>
                <button
                  className="painted-door"
                  onClick={enter}
                  aria-label={tr(
                    '推门进入录音棚',
                    'Enter the recording studio',
                  )}
                >
                  <span className="door-insignia">
                    <Headphones size={28} />
                    <strong>
                      LISTEN
                      <br />
                      CLOSELY.
                    </strong>
                  </span>
                  <span className="enter-label">
                    {tr('推门，进入声音', 'Step inside')}
                    <ArrowUpRight size={16} />
                  </span>
                </button>
                <div className="studio-introduction">
                  <span className="overline">SOUND DESIGNER / 涂翀霆</span>
                  <h1>{tr('让故事，被听见。', 'Stories, made audible.')}</h1>
                  <p>
                    {tr(
                      '游戏 · 动画 · 影视与戏剧',
                      'Games · Animation · Film & theatre',
                    )}
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="archive-title">
                  <span className="overline">THE LISTENING ROOM</span>
                  <h1>
                    {tr(
                      '选一张 CD，听一段故事。',
                      'Choose a disc. Enter a story.',
                    )}
                  </h1>
                </div>
                <div
                  className={
                    'cd-cabinet' +
                    (picked !== null ? ' has-picked' : '') +
                    (opening ? ' case-opening' : '')
                  }
                >
                  {albums.map((a, i) => (
                    <button
                      key={a.word}
                      className={'jewel-case' + (picked === i ? ' picked' : '')}
                      style={{ '--album-color': a.color } as CSSProperties}
                      onClick={() => pick(i)}
                      aria-pressed={picked === i}
                      aria-label={
                        (picked === i
                          ? tr('打开 ', 'Open ')
                          : tr('取出 ', 'Select ')) + a[lang]
                      }
                    >
                      <div className="case-tray">
                        <Disc
                          number={a.number}
                          title={a.subtitle}
                          color={a.color}
                        />
                      </div>
                      <div className="case-lid">
                        <span className="case-catalogue">
                          CT / {a.number} / AUDIO
                        </span>
                        <strong>{a.word}</strong>
                        <span className="case-line" />
                        <span className="case-category">{a[lang]}</span>
                        <small>{a.subtitle}</small>
                        <span className="case-edition">
                          CHONGTING TU · 2026
                        </span>
                      </div>
                      <span className="case-edge">
                        {a.word} — {a.number}
                      </span>
                    </button>
                  ))}
                  <div className="cabinet-shelf first" />
                  <div className="cabinet-shelf second" />
                </div>
                <div className="wall-awards">
                  <span className="overline">RECOGNITION</span>
                  <div className="medals-grid">
                    {awards.map((a, i) => (
                      <button
                        className="wall-medal"
                        key={i}
                        onClick={() => {
                          onSound('award');
                          onAward(i);
                        }}
                        aria-label={a.name[lang]}
                      >
                        <span className="medal-ribbon" />
                        <span className="medallion">
                          <Award size={23} />
                          <strong>{['II', 'III', '10', 'III'][i]}</strong>
                        </span>
                        <span className="medal-date">{a.year}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  className="desk-hotspot"
                  aria-label={tr('近看调音台', 'Explore the mixing desk')}
                  onClick={() => jump(1)}
                >
                  <span>
                    01 / {tr('调音台', 'MIXING DESK')}{' '}
                    <ArrowUpRight size={12} />
                  </span>
                </button>
              </>
            )}
          </div>
          {view === 'shelf' && (
            <>
              <button
                className="outside-button"
                onClick={() => onView('front')}
              >
                <ArrowLeft size={16} />
                {tr('回到门外', 'Back outside')}
              </button>
              <div className="room-cue">
                <span className="status-lamp" />
                {
                  [
                    'STUDIO / OVERVIEW',
                    '01 / THE MIXING DESK',
                    '02 / THE CD ARCHIVE',
                    '03 / THE AWARD WALL',
                  ][zone]
                }
              </div>
            </>
          )}
          {imageError && (
            <output className="image-fallback">
              {tr(
                '画面暂时无法加载，请使用下方分类浏览。',
                'The artwork could not load. Browse using the categories below.',
              )}
            </output>
          )}
        </div>
        {view === 'shelf' ? (
          <>
            <div className="exploration-toolbar">
              <nav aria-label={tr('探索录音棚', 'Explore the studio')}>
                {[
                  tr('全景', 'Overview'),
                  tr('调音台', 'Console'),
                  tr('CD 收藏', 'CDs'),
                  tr('奖章墙', 'Awards'),
                ].map((n, i) => (
                  <button
                    key={n}
                    aria-current={zone === i ? 'step' : undefined}
                    onClick={() => jump(i)}
                  >
                    <span>0{i}</span>
                    {n}
                  </button>
                ))}
              </nav>
              {picked !== null ? (
                <div className="case-actions">
                  <button onClick={() => read(picked)}>
                    {tr('打开', 'Open')} {albums[picked][lang]}
                    <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => {
                      setPicked(null);
                      setOpening(false);
                      onSound('case');
                    }}
                    aria-label={tr('放回 CD', 'Return CD')}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <span className="explore-help">
                  <Mouse size={14} />
                  {tr(
                    '向下滚动，靠近声音的细节',
                    'Scroll to explore the details',
                  )}
                </span>
              )}
            </div>
            <div className="exploration-progress">
              <div ref={meter} />
            </div>
          </>
        ) : null}
        <nav
          className="album-shortcuts"
          aria-label={tr('作品与经历分类', 'Portfolio and experience')}
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
              <strong>{a[lang]}</strong>
              <ArrowUpRight size={18} />
            </button>
          ))}
        </nav>
        <div className="environment-footer">
          <span>
            <Disc3 size={14} />
            {tr(
              '每张唱片，都有它的声场。',
              'Every disc has its own sound world.',
            )}
          </span>
          <span>
            {sound
              ? tr('交互音效已开启', 'INTERACTION SOUND ON')
              : tr('点击顶部音效开关，开启聆听', 'ENABLE SOUND IN THE TOP BAR')}
          </span>
        </div>
      </div>
    </section>
  );
}
