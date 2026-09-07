export type SoundCue = 'door' | 'case' | 'button' | 'award';
export const soundFiles: Record<SoundCue, string> = {
  door: '/sounds/door.mp3',
  case: '/sounds/case.mp3',
  button: '/sounds/button.mp3',
  award: '/sounds/award.mp3',
};
