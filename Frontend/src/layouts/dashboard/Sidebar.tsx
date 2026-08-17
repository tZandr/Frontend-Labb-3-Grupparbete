import { useNavigate } from "react-router-dom";
import { getStoredUser, logout } from "../../auth";
import SidebarLogo from "../../components/sidebar/SidebarLogo";
import SidebarUser from "../../components/sidebar/SidebarUser";
import SidebarNav from "../../components/sidebar/SidebarNav";
import SidebarStreak from "../../components/sidebar/SidebarStreak";
import SidebarSettingsButton from "../../components/sidebar/SidebarSettingsButton";
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
      <SidebarLogo />
      <SidebarUser
        name={user?.name ?? "User"}
        email={user?.email ?? ""}
        initials={initials}
      />
      <SidebarNav />
      <SidebarStreak days={14} />
      <SidebarSettingsButton onClick={() => navigate("/dashboard/settings")} />
    </aside>
  );
}
