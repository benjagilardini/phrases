import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./components/LangSwitcher/LangSwitcher";

const App = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LangSwitcher />
      <h1>{t("appTitle")}</h1>
    </div>
  );
}

export default App;
