import { Link } from 'react-router-dom'
import './Footer.scss'

export default function Footer() {
  return (
    <footer className="public-footer">
      <div className="public-footer__inner">
        <p className="public-footer__brand">Bloom</p>
        <p className="public-footer__copy">
          © {new Date().getFullYear()} Bloom — log, reflect, grow.
        </p>
        <nav aria-label="Footer">
          <ul className="public-footer__links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/support">Contact us</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
