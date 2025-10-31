import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useTranslation } from "react-i18next";

const App = () => {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("appTitle");
  }, [i18n.language, t]);

  return (
    <AppRoutes />
  );
}

export default App;
