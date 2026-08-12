import { NavLink, useNavigate } from "react-router-dom";
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
  <NavLink
    to="/dashboard"
    end
    className={({ isActive }) =>
      `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
    }
  >
    Dashboard
  </NavLink>

  <NavLink
    to="/dashboard/new-log"
    className={({ isActive }) =>
      `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
    }
  >
    New log
  </NavLink>

  <a className="sidebar__nav-item" href="#">
    Community
  </a>
  <a className="sidebar__nav-item" href="#">
    Profile
  </a>
</nav>
      <div className="sidebar__streak"><p>Your streak is</p><p className="sidebar__streak-number">14</p><p>days in a row</p></div>
      <button type="button" className="sidebar__log-button">Settings</button>
      <button type="button" className="sidebar__logout-button" onClick={handleLogout}>Log out</button>
    </aside>
  );
}
