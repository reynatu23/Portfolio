'use client';
/* eslint-disable next/no-img-element -- Portfolio posters are local pre-sized JPEG assets. */
import { useCallback, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  Disc3,
  FileText,
  Mail,
  Play,
  Plus,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';
import StudioScene, { albums } from './StudioScene';
import Disc from './Disc';
import AudioPanel from './AudioPanel';
import { useStudioAudio } from './useStudioAudio';
import {
  awards,
  chapters,
  experience,
  projects,
  type Lang,
  type Project,
} from './content';

const credits = [
  {
    cue: { zh: '背景音乐', en: 'Background music' },
    name: 'Airport Lounge',
    author: 'Kevin MacLeod (incompetech.com)',
    url: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100806',
  },
];

export default function Portfolio() {
  const [view, setView] = useState<'front' | 'shelf' | 'reader'>('front');
  const [lang, setLang] = useState<Lang>('zh');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Project | null>(null);
  const [awardIndex, setAwardIndex] = useState<number | null>(null);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const audio = useStudioAudio(selected !== null);
  const { sound, playSound } = audio;
  const tr = (zh: string, en: string) => (lang === 'zh' ? zh : en);
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);
  function switchView(next: 'front' | 'shelf') {
    setView(next);
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  const read = useCallback((n: number) => {
    setPage(n);
    setView('reader');
    setSelected(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);
  const go = useCallback(
    (n: number) => {
      if (n < 1 || n > 6 || n === page) return;
      playSound('button');
      read(n);
    },
    [page, playSound, read],
  );
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (
        view !== 'reader' ||
        selected ||
        awardIndex !== null ||
        creditsOpen ||
        e.altKey ||
        e.ctrlKey ||
        e.metaKey
      )
        return;
      if (
        (e.target as HTMLElement).closest(
          'button,a,input,textarea,video,summary,[role="dialog"]',
        )
      )
        return;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(page + 1);
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(page - 1);
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [view, selected, awardIndex, creditsOpen, go, page]);
  function openProject(project: Project) {
    setVideoError(false);
    setSelected(project);
    playSound('case');
  }
  const album = albums[Math.min(page, 4) - 1];
  const award = awardIndex === null ? null : awards[awardIndex];

  return (
    <div className={'cd-site view-' + view}>
      <a className="cd-skip-link" href="#main-content">
        {tr('跳到主要内容', 'Skip to content')}
      </a>
      <header className="cd-masthead">
        <button
          className="cd-wordmark"
          onClick={() => switchView('front')}
          aria-label={tr('回到工作室入口', 'Studio entrance')}
        >
          <span>CT</span>
          <span>
            CHONGTING TU<small>SOUND DESIGN PORTFOLIO</small>
          </span>
        </button>
        <nav
          className="cd-main-nav"
          aria-label={tr('主导航', 'Main navigation')}
        >
          <button
            aria-current={view === 'front' ? 'page' : undefined}
            onClick={() => {
              playSound();
              switchView('front');
            }}
          >
            {tr('工作室', 'Studio')}
          </button>
          <button
            aria-current={
              view === 'shelf' || (view === 'reader' && page < 4)
                ? 'page'
                : undefined
            }
            onClick={() => {
              playSound();
              switchView('shelf');
            }}
          >
            {tr('CD 收藏', 'CD collection')}
          </button>
          <button
            aria-current={view === 'reader' && page >= 4 ? 'page' : undefined}
            onClick={() => {
              playSound('case');
              read(4);
            }}
          >
            {tr('过往经历', 'Experience')}
          </button>
        </nav>
        <div className="cd-header-actions">
          <AudioPanel audio={audio} lang={lang} />
          <button
            className="language-switch"
            onClick={() => {
              playSound();
              setLang(lang === 'zh' ? 'en' : 'zh');
            }}
            aria-label={tr('Switch to English', '切换为中文')}
          >
            <b className={lang === 'zh' ? 'active' : ''}>中</b>
            <span>/</span>
            <b className={lang === 'en' ? 'active' : ''}>EN</b>
          </button>
        </div>
      </header>

      <main id="main-content">
        {view !== 'reader' ? (
          <StudioScene
            key={view}
            lang={lang}
            view={view}
            onView={switchView}
            onRead={read}
            onSound={playSound}
            onAward={setAwardIndex}
            onDrama={() =>
              openProject(projects.find((p) => p.id === 'bathroom')!)
            }
            sound={sound}
          />
        ) : (
          <section className="listening-room">
            <div className="album-breadcrumb">
              <button
                onClick={() => {
                  playSound('case');
                  switchView('shelf');
                }}
              >
                <ArrowLeft size={16} />
                {tr('放回 CD · 返回录音棚', 'Return CD · Back to studio')}
              </button>
              <span>
                CT / {album.word} / {String(page).padStart(2, '0')}
              </span>
            </div>
            <div className="open-album">
              <aside className="disc-side">
                <div className="side-label">
                  <span>SIDE A / THE DISC</span>
                  <Disc3 size={17} />
                </div>
                <div className="disc-cradle">
                  <Disc
                    title={album.subtitle}
                    number={album.number}
                    color={album.color}
                  />
                </div>
                <div className="disc-caption">
                  <span className="overline">CHONGTING TU — {album.word}</span>
                  <h1>{album[lang]}</h1>
                  <p>{tr('声音、画面与记忆。', 'Sound, image & memory.')}</p>
                </div>
                <nav
                  className="album-tracklist"
                  aria-label={tr('专辑曲目', 'Album tracks')}
                >
                  {chapters.slice(1).map((c, i) => (
                    <button
                      key={c.en}
                      onClick={() => go(i + 1)}
                      aria-current={page === i + 1 ? 'page' : undefined}
                    >
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      {c[lang]}
                      <ArrowUpRight size={15} />
                    </button>
                  ))}
                </nav>
                <a className="album-contact" href="mailto:reyna.tu@outlook.com">
                  <Mail size={14} />
                  reyna.tu@outlook.com
                </a>
              </aside>
              <article className="album-insert" key={page}>
                <div className="side-label">
                  <span>SIDE B / LINER NOTES</span>
                  <span>0{page} — 06</span>
                </div>
                <h2>{chapters[page][lang]}</h2>
                {page <= 2 && (
                  <div
                    className={
                      'record-projects' + (page === 2 ? ' cinema-projects' : '')
                    }
                  >
                    {projects
                      .filter(
                        (p) => p.category === (page === 1 ? 'games' : 'films'),
                      )
                      .map((p) => (
                        <button
                          className="record-project"
                          key={p.id}
                          onClick={() => openProject(p)}
                        >
                          <span className="record-frame">
                            <img
                              src={'/media/' + p.id + '.jpg'}
                              alt={p.title[lang]}
                              loading="lazy"
                            />
                            <span className="record-play">
                              <Play size={19} fill="currentColor" />
                            </span>
                            <span className="record-duration">
                              {p.duration}
                            </span>
                          </span>
                          <span className="record-type">{p.type[lang]}</span>
                          <strong>
                            {p.title[lang]}
                            <ArrowUpRight size={17} />
                          </strong>
                          <span className="record-summary">
                            {p.summary[lang]}
                          </span>
                        </button>
                      ))}
                  </div>
                )}
                {page === 3 && (
                  <div className="broadcast-sleeve">
                    <div className="broadcast-mark">
                      <span className="status-lamp" />
                      ON AIR<span>LIVE / SOUND / PEOPLE</span>
                    </div>
                    <span className="overline">CCTV.COM / 2023</span>
                    <h3>
                      {tr(
                        '成都大运会特别节目',
                        'Chengdu Universiade special programme',
                      )}
                    </h3>
                    <p>
                      {tr(
                        '在央视网原创策划中心担任编导 / 制作人助理，参与海外嘉宾协调、主题曲录制、宣传小片制作与直播准备。',
                        'As a production assistant at CCTV.com’s Original Planning Centre, I supported international guests, theme-song recording, promotional films and live-broadcast preparation.',
                      )}
                    </p>
                    <button className="liner-link" onClick={() => go(5)}>
                      {tr('阅读完整实习经历', 'Read the full experience')}
                      <ArrowRight size={16} />
                    </button>
                    <p className="liner-note">
                      {tr('节目影像整理中。', 'Programme footage to follow.')}
                    </p>
                  </div>
                )}
                {page === 4 && (
                  <div className="education-liners">
                    <section>
                      <span className="overline">
                        2025 — 2026 / EDINBURGH, UK
                      </span>
                      <h3>{tr('爱丁堡大学', 'The University of Edinburgh')}</h3>
                      <strong>
                        {tr('声音设计 · 理学硕士', 'MSc Sound Design')}
                      </strong>
                      <p>
                        {tr(
                          '电影声音、互动游戏音频、声音装置与声音艺术、创意音乐和音频编程。',
                          'Film sound, interactive game audio, sound installations and sound art, creative music and audio programming.',
                        )}
                      </p>
                    </section>
                    <section>
                      <span className="overline">
                        2021 — 2025 / HANGZHOU, CHINA
                      </span>
                      <h3>
                        {tr(
                          '浙江传媒学院',
                          'Communication University of Zhejiang',
                        )}
                      </h3>
                      <strong>
                        {tr('录音艺术 · 本科', 'BA Recording Arts')}
                      </strong>
                      <p>
                        {tr(
                          '影视录音、环绕声制作、声学基础与现场扩声。GPA 3.75 / 5.00。',
                          'Film recording, surround sound production, acoustics and live sound. GPA 3.75 / 5.00.',
                        )}
                      </p>
                    </section>
                    <section>
                      <span className="overline">
                        {tr('常用创作工具', 'CREATIVE TOOLKIT')}
                      </span>
                      <p>
                        Pro Tools · Reaper · Cubase · Logic
                        <br />
                        Wwise · Unity · Unreal Engine · Max/MSP
                      </p>
                    </section>
                    <button className="liner-link" onClick={() => go(5)}>
                      {tr(
                        '下一首 · 工作与实习',
                        'Next track · Work & internships',
                      )}
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
                {page === 5 && (
                  <div className="experience-liners">
                    {experience.map((x, i) => (
                      <details key={x.name.en} open={i === 0 || i === 3}>
                        <summary>
                          <span>
                            <span className="overline">{x.date}</span>
                            <strong>{x.name[lang]}</strong>
                            <span className="experience-role">
                              {x.role[lang]}
                            </span>
                          </span>
                          <Plus size={19} />
                        </summary>
                        <div className="experience-body">
                          <p>{x.desc[lang]}</p>
                          <ul>
                            {x.details[lang].map((d) => (
                              <li key={d}>{d}</li>
                            ))}
                          </ul>
                          {'projectUrl' in x && x.projectUrl && (
                            <a
                              className="liner-link"
                              href={x.projectUrl}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Chasing Kaleidorider
                              <ArrowUpRight size={16} />
                            </a>
                          )}
                        </div>
                      </details>
                    ))}
                  </div>
                )}
                {page === 6 && (
                  <div className="recognition-list">
                    {awards.map((a, i) => (
                      <button
                        key={a.name.en}
                        onClick={() => {
                          playSound('award');
                          setAwardIndex(i);
                        }}
                      >
                        <span className="recognition-seal">
                          <Award size={27} />
                        </span>
                        <span>
                          <span className="overline">{a.year}</span>
                          <strong>{a.name[lang]}</strong>
                          <span>{a.note[lang]}</span>
                        </span>
                        <ArrowUpRight size={17} />
                      </button>
                    ))}
                    <p className="liner-note">
                      {tr(
                        '这些奖章也挂在录音棚右侧的墙上。',
                        'You can also find these medals on the studio wall.',
                      )}
                    </p>
                  </div>
                )}
                <footer className="insert-footer">
                  <span>CHONGTING TU / SOUND DESIGN</span>
                  <span>TRACK 0{page}</span>
                </footer>
              </article>
            </div>
            <Pagination
              className="album-pagination"
              aria-label={tr('专辑内容翻页', 'Browse album notes')}
            >
              <PaginationContent>
                <PaginationItem>
                  <button
                    disabled={page === 1}
                    onClick={() => go(page - 1)}
                    aria-label={tr('上一页', 'Previous page')}
                  >
                    <ArrowLeft size={18} />
                  </button>
                </PaginationItem>
                {chapters.slice(1).map((c, i) => (
                  <PaginationItem key={c.en}>
                    <PaginationLink
                      href={'#track-' + (i + 1)}
                      isActive={page === i + 1}
                      aria-label={c[lang]}
                      onClick={(e) => {
                        e.preventDefault();
                        go(i + 1);
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <button
                    disabled={page === 6}
                    onClick={() => go(page + 1)}
                    aria-label={tr('下一页', 'Next page')}
                  >
                    <ArrowRight size={18} />
                  </button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </section>
        )}
      </main>
      <footer className="site-colophon">
        <span>© 2026 CHONGTING TU</span>
        <button onClick={() => setCreditsOpen(true)}>
          {tr('音乐与音效来源', 'Sound credits')}
        </button>
        <a href="mailto:reyna.tu@outlook.com">
          LET’S TALK
          <ArrowUpRight size={16} />
        </a>
      </footer>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="cd-project-dialog" showCloseButton={false}>
          {selected && (
            <>
              <DialogClose
                className="cd-dialog-close"
                aria-label={tr('关闭作品', 'Close project')}
              >
                <X size={21} />
              </DialogClose>
              <div className="project-dialog-heading">
                <span className="overline">{selected.type[lang]}</span>
                <DialogTitle>{selected.title[lang]}</DialogTitle>
                <DialogDescription>{selected.summary[lang]}</DialogDescription>
              </div>
              {/* No captions were supplied for these sound-design portfolio excerpts. */}
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                key={selected.id}
                controls
                playsInline
                preload="metadata"
                poster={'/media/' + selected.id + '.jpg'}
                src={'/media/' + selected.id + '.mp4'}
                onError={() => setVideoError(true)}
              />
              {videoError && (
                <p>
                  {tr('视频暂时无法播放。', 'The video could not play.')}{' '}
                  <a
                    href={'/media/' + selected.id + '.mp4'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {tr('单独打开视频', 'Open video directly')}
                  </a>
                </p>
              )}
              <div className="project-dialog-copy">
                <div className="project-tags">
                  {selected.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                {selected.details[lang].split('\n').map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {selected.pdf && (
                  <a
                    className="cd-document-link"
                    href={'/documents/' + selected.id + '.pdf'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileText size={17} />
                    {tr(
                      '阅读原始作品说明 · PDF',
                      'Read the original work description · PDF',
                    )}
                    <ArrowUpRight size={16} />
                  </a>
                )}
                <p className="playback-note">
                  {tr(
                    '网页提供立体声试听版本，建议佩戴耳机。',
                    'Stereo web preview. Headphones recommended.',
                  )}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={award !== null}
        onOpenChange={(open) => {
          if (!open) setAwardIndex(null);
        }}
      >
        <DialogContent className="award-dialog" showCloseButton={false}>
          {award && (
            <>
              <DialogClose
                className="cd-dialog-close"
                aria-label={tr('关闭奖章', 'Close award')}
              >
                <X size={21} />
              </DialogClose>
              <div
                className="award-art"
                aria-hidden="true"
                style={{
                  backgroundPosition: [
                    '0% 0%',
                    '100% 0%',
                    '0% 100%',
                    '100% 100%',
                  ][awardIndex ?? 0],
                }}
              />
              <span className="overline">RECOGNITION / {award.year}</span>
              <DialogTitle>{award.name[lang]}</DialogTitle>
              <DialogDescription>{award.note[lang]}</DialogDescription>
              {awardIndex === 0 && (
                <button
                  className="award-film-link"
                  onClick={() => {
                    setAwardIndex(null);
                    openProject(projects.find((p) => p.id === 'tidal-surge')!);
                  }}
                >
                  <Play size={16} />
                  {tr('观看《潮涌》', 'Watch Tidal Surge')}
                </button>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={creditsOpen} onOpenChange={setCreditsOpen}>
        <DialogContent className="credits-dialog" showCloseButton={false}>
          <DialogClose
            className="cd-dialog-close"
            aria-label={tr('关闭来源说明', 'Close credits')}
          >
            <X size={21} />
          </DialogClose>
          <DialogTitle>
            {tr('音乐与音效来源', 'Music & sound credits')}
          </DialogTitle>
          <DialogDescription>
            {tr(
              '背景音乐为 Kevin MacLeod 的 Airport Lounge（CC BY 4.0）。门、CD 盒与按钮使用 Freesound 的 CC0 录音；奖章使用合成的轻微金属碰撞声。音乐与音效均可独立控制。',
              'Music: Airport Lounge by Kevin MacLeod (CC BY 4.0). Door, CD case and button sounds use CC0 Freesound recordings; medal contacts are synthesized. Music and effects have separate controls.',
            )}
          </DialogDescription>
          <ul>
            {credits.map((c) => (
              <li key={c.url}>
                <span>{c.cue[lang]}</span>
                <a href={c.url} target="_blank" rel="noreferrer">
                  {c.name}
                  <ArrowUpRight size={15} />
                </a>
                <small>{c.author} / CC BY 4.0</small>
              </li>
            ))}
          </ul>
          <a
            className="cd-document-link"
            href="/sounds/CREDITS.md"
            target="_blank"
            rel="noreferrer"
          >
            {tr('交互音效作者与来源', 'Interaction recording credits')}
            <ArrowUpRight size={15} />
          </a>
          <a
            className="cd-document-link"
            href="https://creativecommons.org/licenses/by/4.0/"
            target="_blank"
            rel="noreferrer"
          >
            Creative Commons Attribution 4.0
            <ArrowUpRight size={15} />
          </a>
        </DialogContent>
      </Dialog>
      <div className="sr-only" aria-live="polite">
        {view === 'reader'
          ? chapters[page][lang]
          : view === 'shelf'
            ? tr('已进入录音棚', 'Inside the recording studio')
            : tr('录音棚入口', 'Studio entrance')}
      </div>
    </div>
  );
}
