// Homepage route (/) — public landing page for Bloom.
import PublicHeader from '../components/home/PublicHeader'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import CallToAction from '../components/home/CallToAction'
import Footer from '../components/home/Footer'
import './Home.scss'

export default function Home() {
    return (
        <div className="home-page">
            <PublicHeader />
            <main>
                <Hero />
                <Features />
                <CallToAction />
            </main>
            <Footer />
        </div>
    )
}
