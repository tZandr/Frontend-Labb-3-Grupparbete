import { useNavigate } from "react-router-dom";
import { logout } from "../../auth";
import { useProfile } from "../../context/ProfileContext";
import SidebarLogo from "../../components/sidebar/SidebarLogo";
import SidebarUser from "../../components/sidebar/SidebarUser";
import SidebarNav from "../../components/sidebar/SidebarNav";
import SidebarStreak from "../../components/sidebar/SidebarStreak";
import SidebarSettingsButton from "../../components/sidebar/SidebarSettingsButton";
import "./Sidebar.scss";

export default function Sidebar() {
  const navigate = useNavigate();
  const { name, email, photoUrl } = useProfile();
  const initials = name.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "U";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <aside className="sidebar" aria-label="Huvudnavigation">
      <SidebarLogo />
      <SidebarUser
        name={name || "User"}
        email={email}
        initials={initials}
        photoUrl={photoUrl}
      />
      <SidebarNav />
      <SidebarStreak days={14} />
      <SidebarSettingsButton onClick={() => navigate("/dashboard/settings")} />
      <button type="button" className="sidebar__logout-button" onClick={handleLogout}>
        Log out
      </button>
    </aside>
  );
}
