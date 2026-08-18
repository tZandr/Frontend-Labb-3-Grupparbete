import SettingsGroup from "./SettingsGroup";
import SettingsOptionButton from "./SettingsOptionButton";

type ThemeSettingsProps = {
  theme: string;
  onChange: (theme: string) => void;
};

export default function ThemeSettings({ theme, onChange }: ThemeSettingsProps) {
  return (
    <SettingsGroup label="Theme">
      <SettingsOptionButton
        isActive={theme === "light"}
        onClick={() => onChange("light")}
      >
        Light
      </SettingsOptionButton>
      <SettingsOptionButton
        isActive={theme === "dark"}
        onClick={() => onChange("dark")}
      >
        Dark
      </SettingsOptionButton>
    </SettingsGroup>
  );
}
