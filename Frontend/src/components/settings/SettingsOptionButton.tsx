import type { ReactNode } from "react";

type SettingsOptionButtonProps = {
  isActive: boolean;
  onClick: () => void;
  children: ReactNode;
};

export default function SettingsOptionButton({
  isActive,
  onClick,
  children,
}: SettingsOptionButtonProps) {
  return (
    <button
      type="button"
      className={`settings__option-btn ${isActive ? "settings__option-btn--active" : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
