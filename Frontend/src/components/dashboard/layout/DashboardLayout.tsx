import Sidebar from "./Sidebar";
import DashboardPage from "../../../pages/DashboardPage";
import "./DashboardLayout.scss";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-layout__main">
        <DashboardPage />
      </main>
    </div>
  );
}
