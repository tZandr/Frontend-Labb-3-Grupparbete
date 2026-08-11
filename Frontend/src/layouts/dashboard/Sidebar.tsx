import { useNavigate } from "react-router-dom";
import { getStoredUser, logout } from "../../auth";
import "./Sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  const user = getStoredUser();
  const initials = user?.name.split(" ").filter(Boolean).map((name) => name[0]).join("").slice(0, 2).toUpperCase() ?? "U";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="sidebar" aria-label="Huvudnavigation">
      <h1 className="sidebar__logo">Bloom</h1>
      <div className="sidebar__user">
        <div className="sidebar__avatar">{initials}</div>
        <div><p className="sidebar__name">{user?.name ?? "User"}</p><p className="sidebar__handle">{user?.email ?? ""}</p></div>
      </div>
      <nav className="sidebar__nav">
        <a className="sidebar__nav-item sidebar__nav-item--active" href="#">Dashboard</a>
        <a className="sidebar__nav-item" href="#">Ny logg</a><a className="sidebar__nav-item" href="#">Community</a><a className="sidebar__nav-item" href="#">Profil</a>
      </nav>
      <div className="sidebar__streak"><p>Din streak</p><p className="sidebar__streak-number">14</p><p>dagar i rad</p></div>
      <button type="button" className="sidebar__log-button">+ logga idag</button>
      <button type="button" className="sidebar__logout-button" onClick={handleLogout}>Log out</button>
    </aside>
  );
}
