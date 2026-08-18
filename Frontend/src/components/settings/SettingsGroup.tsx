import type { ReactNode } from "react";

type SettingsGroupProps = {
  label: string;
  children: ReactNode;
};

export default function SettingsGroup({ label, children }: SettingsGroupProps) {
  return (
    <div className="settings__group">
      <h2 className="settings__label">{label}</h2>
      <div className="settings__button-group">
        {children}
      </div>
    </div>
  );
}
