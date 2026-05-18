import { useRef, useEffect } from 'react';

interface ThemeTabsProps {
  themes: string[];
  active: string;
  onChange: (theme: string) => void;
}

export default function ThemeTabs({ themes, active, onChange }: ThemeTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const btn = activeRef.current;
      const container = scrollRef.current;
      const offset =
        btn.offsetLeft -
        container.offsetWidth / 2 +
        btn.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [active]);

  return (
    <div className="theme-tabs" ref={scrollRef}>
      <button
        className={`theme-tab${active === '__all__' ? ' theme-tab--active' : ''}`}
        onClick={() => onChange('__all__')}
        ref={active === '__all__' ? activeRef : undefined}
      >
        全部
      </button>
      {themes.map((t) => (
        <button
          key={t}
          className={`theme-tab${active === t ? ' theme-tab--active' : ''}`}
          onClick={() => onChange(t)}
          ref={active === t ? activeRef : undefined}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
