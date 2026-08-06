import "./Sidebar.scss";

export default function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Huvudnavigation">
      <h1 className="sidebar__logo">Bloom</h1>

      <div className="sidebar__user">
        <div className="sidebar__avatar">MJ</div>
        <div>
          <p className="sidebar__name">Maja J.</p>
          <p className="sidebar__handle">@maja.j</p>
        </div>
      </div>

      <nav className="sidebar__nav">
        <a className="sidebar__nav-item sidebar__nav-item--active" href="#">
          Dashboard
        </a>
        <a className="sidebar__nav-item" href="#">
          Ny logg
        </a>
        <a className="sidebar__nav-item" href="#">
          Community
        </a>
        <a className="sidebar__nav-item" href="#">
          Profil
        </a>
      </nav>

      <div className="sidebar__streak">
        <p>Din streak</p>
        <p className="sidebar__streak-number">14</p>
        <p>dagar i rad</p>
      </div>

      <button type="button" className="sidebar__log-button">
        + logga idag
      </button>
    </aside>
  );
}
