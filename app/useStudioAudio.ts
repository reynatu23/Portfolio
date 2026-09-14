'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { soundFiles, type SoundCue } from './audio';

export function useStudioAudio(ducked: boolean) {
  const [sound, setSound] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [effectsVolume, setEffectsVolume] = useState(28);
  const [musicVolume, setMusicVolume] = useState(18);
  const [error, setError] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const music = useRef<HTMLAudioElement | null>(null);
  const lastCue = useRef(0);
  const activeEffects = useRef(new Set<HTMLAudioElement>());
  useEffect(() => {
    const effects = activeEffects.current;
    const track = new Audio('/sounds/lounge.mp3');
    track.loop = true;
    track.preload = 'none';
    track.volume = 0.18;
    music.current = track;
    return () => {
      for (const effect of effects) effect.pause();
      effects.clear();
      track.pause();
      track.removeAttribute('src');
      track.load();
      const previous = context.current;
      context.current = null;
      if (previous && previous.state !== 'closed')
        void previous.close().catch(() => {});
    };
  }, []);
  useEffect(() => {
    const track = music.current;
    if (!track) return;
    const target = (musicVolume / 100) * (ducked ? 0.12 : 1),
      start = track.volume,
      time = performance.now();
    let frame = 0;
    const fade = () => {
      const t = Math.min(1, (performance.now() - time) / 350);
      track.volume = Math.max(0, Math.min(1, start + (target - start) * t));
      if (t < 1) frame = requestAnimationFrame(fade);
    };
    fade();
    return () => cancelAnimationFrame(frame);
  }, [musicVolume, ducked]);
  async function toggleSound() {
    setError(false);
    if (sound) {
      setSound(false);
      for (const effect of activeEffects.current) effect.pause();
      activeEffects.current.clear();
      if (context.current?.state === 'running')
        await context.current.suspend().catch(() => setError(true));
      return;
    }
    try {
      if (!context.current || context.current.state === 'closed')
        context.current = new AudioContext();
      await context.current.resume();
      setSound(true);
    } catch {
      setError(true);
    }
  }
  async function toggleMusic() {
    setError(false);
    const track = music.current;
    if (!track) return;
    if (musicPlaying) {
      track.pause();
      setMusicPlaying(false);
      return;
    }
    try {
      await track.play();
      setMusicPlaying(true);
    } catch {
      setMusicPlaying(false);
      setError(true);
    }
  }
  const playSound = useCallback(
    (cue: SoundCue = 'button') => {
      const ctx = context.current;
      if (
        !sound ||
        !ctx ||
        ctx.state === 'closed' ||
        effectsVolume === 0 ||
        (cue !== 'award' && performance.now() - lastCue.current < 95)
      )
        return;
      lastCue.current = performance.now();
      void ctx.resume().catch(() => setError(true));
      if (cue !== 'award') {
        const player = new Audio(soundFiles[cue]);
        player.volume = Math.min(
          1,
          (effectsVolume / 100) * (ducked ? 0.4 : 1.8),
        );
        activeEffects.current.add(player);
        const release = () => activeEffects.current.delete(player);
        player.onended = release;
        player.onerror = release;
        void player.play().catch(() => {
          release();
          setError(true);
        });
        return;
      }
      // Three quiet, inharmonic contacts suggest a hanging medal moving.
      const t = ctx.currentTime;
      [0, 0.065, 0.15].forEach((offset, contact) => {
        [1337, 2189, 3541].forEach((frequency, partial) => {
          const oscillator = ctx.createOscillator();
          const gain = ctx.createGain();
          const onset = t + offset;
          const duration = 0.12 + partial * 0.035;
          oscillator.frequency.value = frequency * (1 + contact * 0.017);
          gain.gain.setValueAtTime(0, onset);
          gain.gain.linearRampToValueAtTime(
            (((effectsVolume / 100) * 0.045) /
              ((partial + 1) * (contact + 1))) *
              (ducked ? 0.35 : 1),
            onset + 0.0015,
          );
          gain.gain.exponentialRampToValueAtTime(0.00001, onset + duration);
          oscillator.connect(gain).connect(ctx.destination);
          oscillator.start(onset);
          oscillator.stop(onset + duration + 0.01);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
          };
        });
      });
    },
    [sound, effectsVolume, ducked],
  );
  return {
    sound,
    musicPlaying,
    effectsVolume,
    musicVolume,
    error,
    toggleSound,
    toggleMusic,
    setEffectsVolume,
    setMusicVolume,
    playSound,
  };
}
