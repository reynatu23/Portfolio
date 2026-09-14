'use client';
import { useState } from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { workDescriptions } from './workDescriptions';
import type { Lang } from './content';

export default function DescriptionReader({
  id,
  lang,
}: {
  id: string;
  lang: Lang;
}) {
  const [open, setOpen] = useState(false);
  const description = workDescriptions[id];
  if (!description) return null;
  return (
    <section className="description-reader">
      <button
        className="cd-document-link"
        aria-expanded={open}
        aria-controls={'description-' + id}
        onClick={() => setOpen(!open)}
      >
        {open ? <ArrowLeft size={17} /> : <FileText size={17} />}
        {lang === 'zh'
          ? open
            ? '收起完整说明'
            : '阅读完整作品说明'
          : open
            ? 'Close full description'
            : 'Read the full work description'}
      </button>
      {open && (
        <article id={'description-' + id} className="description-pages">
          <header>
            <span>PRODUCTION NOTES</span>
            <h3>{lang === 'zh' ? '完整作品说明' : 'Full work description'}</h3>
          </header>
          {description[lang].split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>
      )}
    </section>
  );
}
