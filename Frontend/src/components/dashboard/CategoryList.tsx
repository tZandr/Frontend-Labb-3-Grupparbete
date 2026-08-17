import "./CategoryList.scss";

export default function CategoryList() {
    return (
        <section className="category-list">
            <h2 className="category-list__title">Categories</h2>
            <p className="category-list__subtitle">Entries this month</p>

            <ul className="category-list__items">
        <li className="category-list__row">
          <span className="category-list__name">Mindfulness</span>
          <div className="category-list__bar">
            <div className="category-list__fill" style={{ width: "75%" }} />
          </div>
          <span className="category-list__count">3</span>
        </li>

        <li className="category-list__row">
            <span className="category-list__name">Movement</span>
            <div className="category-list__bar">
                <div className="category-list__fill" style={{ width: "50%" }} />
            </div>
            <span className="category-list__count">2</span>
        </li>

        <li className="category-list__row">
            <span className="category-list__name">Nutrition</span>
            <div className="category-list__bar">
                <div className="category-list__fill" 
                style={{ width: "25%", backgroundColor: "#c48978" }} 
                />
            </div>
            <span className="category-list__count">1</span>
        </li>
        </ul>
        </section>
    )
}