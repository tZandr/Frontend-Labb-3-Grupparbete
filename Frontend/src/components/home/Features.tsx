import FeatureCard from './FeatureCard'
import sleepImage from '../../images/bloom_sleep.jpg'
import moodImage from '../../images/bloom_mood.jpg'
import trainingImage from '../../images/bloom_training.jpg'
import './Features.scss'

export default function Features() {
    return (
        <section className="features" aria-labelledby="features-heading">
            <div className="features__intro">
                <h2 id="features-heading">Log what matters</h2>
                <p>
                    Track sleep, mood and training in one calm place — then
                    watch your patterns bloom over time.
                </p>
            </div>

            <div className="features__grid">
                <FeatureCard
                    title="Sleep"
                    description="Note how you rested and spot patterns that help you recover better."
                    imageSrc={sleepImage}
                    imageAlt="Person cozy under a duvet holding a warm drink — rest and sleep"
                />
                <FeatureCard
                    title="Mood"
                    description="Check in with how you feel and nurture your mental wellbeing day by day."
                    imageSrc={moodImage}
                    imageAlt="Person watering flowers growing from their mind — self-care and mood"
                />
                <FeatureCard
                    title="Training"
                    description="Log movement and workouts to keep energy and progress in balance."
                    imageSrc={trainingImage}
                    imageAlt="Person practicing a handstand yoga pose at home with plants"
                />
            </div>
        </section>
    )
}
