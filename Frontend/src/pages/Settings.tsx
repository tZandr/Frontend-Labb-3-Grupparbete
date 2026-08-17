import { useEffect, useState } from "react";
import SettingsHeader from "../components/settings/SettingsHeader";
import ThemeSettings from "../components/settings/ThemeSettings";
import FontSizeSettings from "../components/settings/FontSizeSettings";
import "./Settings.scss";

export default function Settings() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("fontSize") || "medium"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-font", fontSize);
    localStorage.setItem("fontSize", fontSize);
  }, [fontSize]);

  return (
    <div className="settings-container">
    <section className="settings">
      <SettingsHeader />
      <ThemeSettings theme={theme} onChange={setTheme} />
      <FontSizeSettings fontSize={fontSize} onChange={setFontSize} />
    </section>
    </div>
  );
}
