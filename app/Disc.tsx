import type { CSSProperties } from 'react';

export default function Disc({
  title = 'SOUND / IMAGE / MEMORY',
  number = '01',
  color = '#9fae96',
  spinning = false,
}: {
  title?: string;
  number?: string;
  color?: string;
  spinning?: boolean;
}) {
  return (
    <div
      className={'optical-disc' + (spinning ? ' rotating' : '')}
      style={{ '--disc-tint': color } as CSSProperties}
      aria-hidden="true"
    >
      <div className="disc-print">
        <span>CHONGTING TU — SOUND DESIGN</span>
        <strong>{number}</strong>
        <small>{title}</small>
      </div>
      <div className="disc-hub" />
      <span className="disc-matrix">CT / AUDIO ARCHIVE / 2026</span>
    </div>
  );
}
