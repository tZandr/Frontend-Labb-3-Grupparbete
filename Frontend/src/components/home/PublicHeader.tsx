import { useState } from 'react'
import { Link } from 'react-router-dom'
import './PublicHeader.scss'

export default function PublicHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="public-header">
            <nav className="public-header__nav" aria-label="Main navigation">
                <Link to="/" className="public-header__logo">
                    Bloom
                </Link>

                <button
                    className="public-header__menu-toggle"
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? 'Close' : 'Menu'}
                </button>

                <ul
                    className={
                        isMenuOpen
                            ? 'public-header__links public-header__links--open'
                            : 'public-header__links'
                    }
                >
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/support">Contact us</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/login" className="public-header__cta">
                            Get started
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
