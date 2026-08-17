import { Link } from 'react-router-dom'
import heroImage from '../../images/herobloom.jpg'
import './Hero.scss'

export default function Hero() {
    return (
        <section className="hero" aria-labelledby="hero-heading">
            <div className="hero__content">
                <h1 id="hero-heading">Live in balance.
                    <br />
                    Bloom every day.</h1>
                <p className="hero__text">
                    Your space to log, reflect and grow.
                </p>
                <div className="hero__actions">
                    <Link
                        to="/login"
                        className="hero__button hero__button--primary"
                    >
                        Get started
                    </Link>
                    <Link
                        to="/login"
                        className="hero__button hero__button--secondary"
                    >
                        Log in
                    </Link>
                </div>
            </div>

            {/* Decorative brand illustration — descriptive alt for WCAG */}
            <div className="hero__media">
                <img
                    src={heroImage}
                    alt="Woman in a calm meditative pose surrounded by soft greenery and light"
                />
            </div>
        </section>
    )
}
