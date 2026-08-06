import StatCard from "../components/dashboard/StatCard";
import "./Dashboard.scss";
import LogsList from "../components/dashboard/LogsList";
import CategoryList from "../components/dashboard/CategoryList";

export default function DashboardPage() {
    return (
        <section className="dashboard-page">
            <h1 className="dashboard-page__title">Hello Maja 🌿</h1>
            <p className="dashboard-page__subtitle">
                Tuesday June 10 - you've logged 14 days in a row
                </p>

                <div className="dashboard-page__stats-grid">
                    <StatCard label="Energy (avg)" value="3.8" trend="↑ from 3.2" />
                    <StatCard label="Sleep (avg)" value="3.5" trend="→ stable" />
                    <StatCard label="Mood (avg)" value="4.1" trend="↑ best week" />
                    <StatCard label="Streak" value="14" trend="days in a row" />
                </div>

            <div className="dashboard-page__bottom">
                <LogsList />
                <CategoryList />
                </div>
        </section>
    );
}

