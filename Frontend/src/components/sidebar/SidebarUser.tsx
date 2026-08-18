import { Link } from "react-router-dom";

type SidebarUserProps = {
  name: string;
  email: string;
  initials: string;
  photoUrl?: string | null;
};

export default function SidebarUser({ name, email, initials, photoUrl }: SidebarUserProps) {
  return (
    <Link className="sidebar__user" to="/dashboard/profile">
      {photoUrl ? (
        <img className="sidebar__avatar" src={photoUrl} alt="" />
      ) : (
        <div className="sidebar__avatar" aria-hidden="true">
          {initials}
        </div>
      )}
      <div>
        <p className="sidebar__name">{name}</p>
        <p className="sidebar__handle">{email}</p>
      </div>
    </Link>
  );
}
