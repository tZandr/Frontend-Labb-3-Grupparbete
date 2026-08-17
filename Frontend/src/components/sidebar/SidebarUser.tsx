type SidebarUserProps = {
  name: string;
  email: string;
  initials: string;
};

export default function SidebarUser({ name, email, initials }: SidebarUserProps) {
  return (
    <div className="sidebar__user">
      <div className="sidebar__avatar">{initials}</div>
      <div>
        <p className="sidebar__name">{name}</p>
        <p className="sidebar__handle">{email}</p>
      </div>
    </div>
  );
}
