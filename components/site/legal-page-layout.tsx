import { InnerPageLayout } from '@/components/site/inner-page-layout'

type LegalPageLayoutProps = {
  badge: string
  title: string
  intro: string
  image: string
  imageAlt: string
  sections: readonly { heading: string; paragraphs: readonly string[] }[]
}

export function LegalPageLayout({
  badge,
  title,
  intro,
  image,
  imageAlt,
  sections,
}: LegalPageLayoutProps) {
  return (
    <InnerPageLayout
      badge={badge}
      title={title}
      intro={intro}
      image={image}
      imageAlt={imageAlt}
    >
      <div className="site-inner-page__sections">
        {sections.map((section) => (
          <article key={section.heading} className="site-inner-page__section">
            <h2 className="site-h3 mb-4 text-[var(--site-text)]">{section.heading}</h2>
            <div className="space-y-4">
              {section.paragraphs.map((paragraph, i) => (
                <p key={i} className="site-body-sm leading-relaxed text-[var(--site-text-muted)]">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </InnerPageLayout>
  )
}
