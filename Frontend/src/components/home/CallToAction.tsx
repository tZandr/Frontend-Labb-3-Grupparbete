// Call-to-action band — encourages visitors to create an account / log in.
import { Link } from 'react-router-dom'
import './CallToAction.scss'

export default function CallToAction() {
  return (
    <section className="cta" aria-labelledby="cta-heading">
      <div className="cta__inner">
        <h2 id="cta-heading">Ready to bloom?</h2>
        <p>
          Start logging today and build a clearer picture of your sleep, mood
          and training.
        </p>
        <Link to="/login" className="cta__button">
          Create your free space
        </Link>
      </div>
    </section>
  )
}
