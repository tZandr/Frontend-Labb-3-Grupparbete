import { useEffect, useState } from "react";
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
      <h1 className="settings__title">Settings</h1>
      <p className="settings__intro">Customize how Bloom looks and feels.</p>
  
      <div className="settings__group">
        <h2 className="settings__label">Theme</h2>
        <div className="settings__button-group">
          <button
            type="button"
            className={`settings__option-btn ${theme === "light" ? "settings__option-btn--active" : ""}`}
            onClick={() => setTheme("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={`settings__option-btn ${theme === "dark" ? "settings__option-btn--active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            Dark
          </button>
        </div>
      </div>
  
      <div className="settings__group">
        <h2 className="settings__label">Text size</h2>
        <div className="settings__button-group">
          <button
            type="button"
            className={`settings__option-btn ${fontSize === "small" ? "settings__option-btn--active" : ""}`}
            onClick={() => setFontSize("small")}
          >
            Small
          </button>
          <button
            type="button"
            className={`settings__option-btn ${fontSize === "medium" ? "settings__option-btn--active" : ""}`}
            onClick={() => setFontSize("medium")}
          >
            Medium
          </button>
          <button
            type="button"
            className={`settings__option-btn ${fontSize === "large" ? "settings__option-btn--active" : ""}`}
            onClick={() => setFontSize("large")}
          >
            Large
          </button>
        </div>
      </div>
    </section>
    </div>
  );
}