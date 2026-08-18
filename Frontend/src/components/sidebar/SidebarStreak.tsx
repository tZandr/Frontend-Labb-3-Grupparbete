type SidebarStreakProps = {
  days: number;
};

export default function SidebarStreak({ days }: SidebarStreakProps) {
  return (
    <div className="sidebar__streak">
      <p>Your streak</p>
      <p className="sidebar__streak-number">{days}</p>
      <p>days in a row</p>
    </div>
  );
}
