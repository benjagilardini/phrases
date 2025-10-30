import React from "react";
import i18n from "../../i18n";

export const LangSwitcher: React.FC = () => {
  return (
    <div style={{ marginBottom: 10 }}>
      <button onClick={() => i18n.changeLanguage("es")}>🇪🇸</button>
      <button onClick={() => i18n.changeLanguage("en")}>🇬🇧</button>
    </div>
  );
};
