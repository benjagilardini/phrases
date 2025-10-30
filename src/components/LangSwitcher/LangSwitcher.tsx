import React, { useCallback } from "react";
import i18n from "../../i18n";
import "./LangSwitcher.css";

type Lang = "es" | "en";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "en", label: "English", flag: "🇬🇧" },
];

export const LangSwitcher: React.FC = () => {
  const current = (i18n.resolvedLanguage || i18n.language || "es").slice(0, 2) as Lang;

  const changeLang = useCallback((lng: Lang) => {
    if (lng !== current) i18n.changeLanguage(lng);
  }, [current]);

  const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const idx = LANGS.findIndex(l => l.code === current);
    if (e.key === "ArrowRight") {
      const next = LANGS[(idx + 1) % LANGS.length].code;
      changeLang(next);
    } else if (e.key === "ArrowLeft") {
      const prev = LANGS[(idx - 1 + LANGS.length) % LANGS.length].code;
      changeLang(prev);
    }
  };

  return (
    <div
      className="lang-switcher"
      role="group"
      aria-label="Language switcher"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {LANGS.map(({ code, label, flag }) => {
        const active = current === code;
        return (
          <button
            key={code}
            type="button"
            className={`lang-btn ${active ? "active" : ""}`}
            onClick={() => changeLang(code)}
            aria-pressed={active}
            data-lang={code}
            title={label}
          >
            <span className="flag" aria-hidden="true">{flag}</span>
            <span className="sr-only">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LangSwitcher;
