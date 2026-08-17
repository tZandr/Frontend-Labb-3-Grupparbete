import SettingsGroup from "./SettingsGroup";
import SettingsOptionButton from "./SettingsOptionButton";

type FontSizeSettingsProps = {
  fontSize: string;
  onChange: (fontSize: string) => void;
};

export default function FontSizeSettings({ fontSize, onChange }: FontSizeSettingsProps) {
  return (
    <SettingsGroup label="Text size">
      <SettingsOptionButton
        isActive={fontSize === "small"}
        onClick={() => onChange("small")}
      >
        Small
      </SettingsOptionButton>
      <SettingsOptionButton
        isActive={fontSize === "medium"}
        onClick={() => onChange("medium")}
      >
        Medium
      </SettingsOptionButton>
      <SettingsOptionButton
        isActive={fontSize === "large"}
        onClick={() => onChange("large")}
      >
        Large
      </SettingsOptionButton>
    </SettingsGroup>
  );
}
