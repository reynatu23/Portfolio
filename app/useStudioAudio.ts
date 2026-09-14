'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SoundCue } from './audio';

export function useStudioAudio(ducked: boolean) {
  const [sound, setSound] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [effectsVolume, setEffectsVolume] = useState(28);
  const [musicVolume, setMusicVolume] = useState(18);
  const [error, setError] = useState(false);
  const context = useRef<AudioContext | null>(null);
  const music = useRef<HTMLAudioElement | null>(null);
  const lastCue = useRef(0);
  useEffect(() => {
    const track = new Audio('/sounds/lounge.mp3');
    track.loop = true;
    track.preload = 'none';
    track.volume = 0.18;
    music.current = track;
    return () => {
      track.pause();
      track.removeAttribute('src');
      track.load();
      void context.current?.close();
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
      await context.current?.suspend();
      return;
    }
    try {
      context.current ??= new AudioContext();
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
        effectsVolume === 0 ||
        performance.now() - lastCue.current < 95
      )
        return;
      lastCue.current = performance.now();
      void ctx.resume();
      const t = ctx.currentTime,
        duration = cue === 'door' ? 0.36 : cue === 'award' ? 0.3 : 0.19;
      const base = { button: 180, case: 230, door: 120, award: 310 }[cue];
      const osc = ctx.createOscillator(),
        harmonic = ctx.createOscillator(),
        gain = ctx.createGain(),
        filter = ctx.createBiquadFilter();
      osc.type = 'sine';
      harmonic.type = 'sine';
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.exponentialRampToValueAtTime(base * 0.72, t + duration);
      harmonic.frequency.setValueAtTime(base * 1.5, t);
      harmonic.frequency.exponentialRampToValueAtTime(
        base * 1.05,
        t + duration,
      );
      filter.type = 'lowpass';
      filter.frequency.value = 850;
      filter.Q.value = 0.5;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(
        (effectsVolume / 100) * 0.12 * (ducked ? 0.35 : 1),
        t + 0.025,
      );
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.connect(filter);
      harmonic.connect(filter);
      filter.connect(gain).connect(ctx.destination);
      osc.start(t);
      harmonic.start(t + 0.012);
      osc.stop(t + duration + 0.03);
      harmonic.stop(t + duration + 0.03);
      harmonic.onended = () => {
        osc.disconnect();
        harmonic.disconnect();
        filter.disconnect();
        gain.disconnect();
      };
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
