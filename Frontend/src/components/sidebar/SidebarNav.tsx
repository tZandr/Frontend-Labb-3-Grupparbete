import { NavLink } from "react-router-dom";

export default function SidebarNav() {
  return (
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
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) =>
          `sidebar__nav-item ${isActive ? "sidebar__nav-item--active" : ""}`
        }
      >
        Profile
      </NavLink>
    </nav>
  );
}
