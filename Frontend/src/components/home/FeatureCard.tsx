type FeatureCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export default function FeatureCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: FeatureCardProps) {
  return (
    <article className="feature-card">
      <img className="feature-card__image" src={imageSrc} alt={imageAlt} />
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__text">{description}</p>
    </article>
  )
}
