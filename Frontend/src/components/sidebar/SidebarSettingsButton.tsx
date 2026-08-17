type SidebarSettingsButtonProps = {
  onClick: () => void;
};

export default function SidebarSettingsButton({ onClick }: SidebarSettingsButtonProps) {
  return (
    <button
      type="button"
      className="sidebar__log-button"
      onClick={onClick}
    >
      Settings
    </button>
  );
}
