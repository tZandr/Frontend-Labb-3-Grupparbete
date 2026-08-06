import "./StatCard.scss";

// Data som kortet behöver 
type StatCardProps = {
    label: string;
    value: string;
    trend: string;
};

export default function StatCard({ label, value, trend }: StatCardProps) {
    return (
        <article className="stat-card">
            <p className="stat-card__label">{label}</p>
            <p className="stat-card__value">{value}</p>
            <p className="stat-card__trend">{trend}</p>
        </article>
    )
}