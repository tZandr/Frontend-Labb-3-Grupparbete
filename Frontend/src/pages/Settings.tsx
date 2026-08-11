import { useEffect, useState } from "react";

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
    <section className="setting">
      <h1>Settings</h1>

      <div className="settings__group">
        <h2>Theme</h2>
        <button type="button" onClick={() => setTheme("light")}>
          Light
        </button>
        <button type="button" onClick={() => setTheme("dark")}>
          Dark
        </button>
      </div>

      <div className="settings__group">
        <h2>Text size</h2>
        <button type="button" onClick={() => setFontSize("small")}>
          Small
        </button>
        <button type="button" onClick={() => setFontSize("medium")}>
          Medium
        </button>
        <button type="button" onClick={() => setFontSize("large")}>
          Large
        </button>
      </div>
    </section>
  );
}
