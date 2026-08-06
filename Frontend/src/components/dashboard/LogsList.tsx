import "./LogsList.scss";

export default function LogsList() {
    return (
        <section className="logs-list">
            <div className="logs-list__header">
                <h2 className="logs-list__title">Your recent logs</h2>
                <a className="logs-list__link" href="#">
                    See all logs
                </a>
            </div>

            <ul className="logs-list__list">
            <li className="logs-list__item">
                <p className="logs-list__day">Today</p>
                <p className="logs-list__scores">Energy 4 - Mood 5 - Sleep 3</p>
                <p className="logs-list__note">I had a great day!</p>
            </li>

            <li className="logs-list__item">
                <p className="logs-list__day">Yesterday</p>
                <p className="logs-list__scores">Energy 3 - Mood 4 - Sleep 2</p>
                <p className="logs-list__note">Felt a bit tired today.</p>
            </li>
            </ul>
        </section>
    )
}