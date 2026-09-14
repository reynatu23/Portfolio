'use client';
import { Music2, Pause, Play, Volume2, VolumeX, Waves } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
} from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import type { Lang } from './content';
import type { useStudioAudio } from './useStudioAudio';
export default function AudioPanel({
  audio,
  lang,
}: {
  audio: ReturnType<typeof useStudioAudio>;
  lang: Lang;
}) {
  const tr = (zh: string, en: string) => (lang === 'zh' ? zh : en);
  return (
    <Popover>
      <PopoverTrigger
        className="audio-panel-trigger"
        aria-label={tr('打开音乐和音效控制', 'Music and sound controls')}
      >
        {audio.sound || audio.musicPlaying ? (
          <Volume2 size={18} />
        ) : (
          <VolumeX size={18} />
        )}
        <span>{tr('声音', 'Audio')}</span>
      </PopoverTrigger>
      <PopoverContent
        className="studio-audio-panel"
        align="end"
        sideOffset={12}
      >
        <PopoverTitle>
          {tr('声音控制', 'Sound controls')}
          <span>STUDIO MIX</span>
        </PopoverTitle>
        <section>
          <div className="audio-channel">
            <Music2 size={18} />
            <strong>{tr('背景音乐', 'Background music')}</strong>
            <button
              onClick={() => void audio.toggleMusic()}
              aria-label={
                audio.musicPlaying
                  ? tr('暂停音乐', 'Pause music')
                  : tr('播放音乐', 'Play music')
              }
            >
              {audio.musicPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
          </div>
          <div className="audio-slider-row">
            <Slider
              value={[audio.musicVolume]}
              onValueChange={(v) =>
                audio.setMusicVolume(Array.isArray(v) ? v[0] : v)
              }
              min={0}
              max={100}
              aria-label={tr('背景音乐音量', 'Music volume')}
            />
            <output>{audio.musicVolume}%</output>
          </div>
          <p>
            Airport Lounge <span>Kevin MacLeod</span>
          </p>
        </section>
        <section>
          <div className="audio-channel">
            <Waves size={18} />
            <strong>{tr('交互音效', 'Interaction sounds')}</strong>
            <button
              aria-pressed={audio.sound}
              onClick={() => void audio.toggleSound()}
              aria-label={tr('开启或关闭交互音效', 'Toggle interaction sounds')}
            >
              {audio.sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
          <div className="audio-slider-row">
            <Slider
              value={[audio.effectsVolume]}
              onValueChange={(v) =>
                audio.setEffectsVolume(Array.isArray(v) ? v[0] : v)
              }
              onValueCommitted={() => audio.playSound('button')}
              min={0}
              max={100}
              aria-label={tr('交互音效音量', 'Effects volume')}
            />
            <output>{audio.effectsVolume}%</output>
          </div>
          <p>
            {tr(
              '柔和电子音 · 低频触感',
              'Soft electronic tones · muted transients',
            )}
          </p>
        </section>
        <small>
          {tr(
            '打开作品时，背景音乐会自动降低。',
            'Music fades down while viewing a project.',
          )}
        </small>
        {audio.error && (
          <p role="alert">
            {tr(
              '音频未能开启，请再试一次。',
              'Audio could not start. Please try again.',
            )}
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
