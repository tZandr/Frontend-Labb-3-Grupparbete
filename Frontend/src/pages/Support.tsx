import PublicHeader from '../components/home/PublicHeader'
import Footer from '../components/home/Footer'
import SupportImage from '../components/support/SupportImage'
import SupportIntro from '../components/support/SupportIntro'
import SupportForm from '../components/support/SupportForm'
import './Support.scss'

export default function Support() {
  return (
    <div className="support-page">
      <PublicHeader />
      <main>
        <section className="support-hero" aria-labelledby="support-heading">
          <div className="support-hero__content">
            <SupportIntro />
            <SupportForm />
          </div>
          <SupportImage />
        </section>
      </main>
      <Footer />
    </div>
  )
}
