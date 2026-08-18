import SettingsHeader from "../components/settings/SettingsHeader";
import ThemeSettings from "../components/settings/ThemeSettings";
import FontSizeSettings from "../components/settings/FontSizeSettings";
import { useTheme } from "../context/ThemeContext";
import "./Settings.scss";

export default function Settings() {
  const { theme, fontSize, setTheme, setFontSize } = useTheme();

  return (
    <div className="settings-container">
      <section className="settings">
        <SettingsHeader />
        <ThemeSettings theme={theme} onChange={(value) => setTheme(value as "light" | "dark")} />
        <FontSizeSettings fontSize={fontSize} onChange={(value) => setFontSize(value as "small" | "medium" | "large")} />
      </section>
    </div>
  );
}