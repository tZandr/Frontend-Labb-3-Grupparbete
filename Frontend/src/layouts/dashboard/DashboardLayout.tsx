import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../../auth";
import Sidebar from "./Sidebar";
import OfflineBanner from "./OfflineBanner";
import { ProfileProvider } from "../../context/ProfileContext";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <ProfileProvider>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-layout__main">
          <OfflineBanner />
          <Outlet />
          <button
            type="button"
            className="dashboard-layout__logout"
            onClick={handleLogout}
          >
            Log out
          </button>
        </main>
      </div>
    </ProfileProvider>
  );
}
