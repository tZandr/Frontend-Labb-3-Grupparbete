import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { ProfileProvider } from "../../context/ProfileContext";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  return (
    <ProfileProvider>
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-layout__main">
          <Outlet />
        </main>
      </div>
    </ProfileProvider>
  );
}
