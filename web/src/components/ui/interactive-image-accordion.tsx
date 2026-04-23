import { useState, type SyntheticEvent } from 'react'

export type AccordionItemData = {
  id: number
  title: string
  imageUrl: string
}

/** Service-line imagery aligned with GLC homepage (construction / excavation). */
const accordionItems: AccordionItemData[] = [
  {
    id: 1,
    title: 'Excavation & Site Prep',
    imageUrl:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Foundations & Civil',
    imageUrl:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Septic & Utilities',
    imageUrl:
      'https://images.unsplash.com/photo-1581092160562-40aa08f37a0d?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Drainage & Hardscaping',
    imageUrl:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Hauling & Clearing',
    imageUrl:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop',
  },
]

type AccordionItemProps = {
  item: AccordionItemData
  isActive: boolean
  onMouseEnter: () => void
}

function AccordionItem({ item, isActive, onMouseEnter }: AccordionItemProps) {
  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget
    el.onerror = null
    el.src =
      'https://placehold.co/400x450/2E2B28/F8BE12?text=Ground+Level'
  }

  return (
    <div
      className={`
        relative h-[450px] overflow-hidden cursor-pointer rounded-none
        border border-[var(--gray-200)] shadow-[var(--shadow-card)]
        transition-[width] duration-700 [transition-timing-function:var(--ease-expo)]
        ${isActive ? 'w-[400px]' : 'w-[60px]'}
      `}
      onMouseEnter={onMouseEnter}
    >
      <img
        src={item.imageUrl}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={handleImgError}
      />
      <div className="absolute inset-0 bg-[var(--charcoal-deep)]/45" />

      <span
        className={`
          absolute whitespace-nowrap text-center
          font-[family-name:var(--font-body)] text-[13px] font-extrabold uppercase
          tracking-[0.08em] text-[var(--white)]
          transition-all duration-300 [transition-timing-function:var(--ease-expo)]
          ${
            isActive
              ? 'bottom-6 left-1/2 max-w-[90%] -translate-x-1/2 rotate-0 text-[var(--yellow-core)]'
              : 'bottom-24 left-1/2 w-auto -translate-x-1/2 rotate-90 text-left text-[var(--white)]'
          }
        `}
      >
        {item.title}
      </span>
    </div>
  )
}

export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleItemHover = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div
      className="bg-[var(--white)] text-[var(--text-900)] [font-family:var(--font-body)]"
      style={{ borderTop: '1px solid var(--gray-200)' }}
    >
      <section
        className="container"
        style={{ paddingBlock: 'var(--section-v)' }}
        aria-labelledby="accordion-services-heading"
      >
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-center">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <div
              className="eyebrow eyebrow--dark mx-auto justify-center md:mx-0 md:justify-start"
              style={{ marginBottom: '16px' }}
            >
              What We Do
            </div>
            <h2
              id="accordion-services-heading"
              className="services__heading [text-wrap:balance]"
            >
              Six Core
              <br />
              <span>Service Lines</span>
            </h2>
            <p className="services__intro mx-auto mt-6 max-w-xl md:mx-0">
              From initial site clearing to final drainage, Ground Level
              Contracting delivers end-to-end excavation and civil infrastructure
              services for commercial builds across Barrie, Midland, Orillia, and Simcoe County.
            </p>
            <div className="mt-8 flex justify-center md:justify-start">
              <a href="tel:+17056194902" className="btn-primary">
                Request a Quote
                <svg
                  className="arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-3 overflow-x-auto p-2 md:gap-4 md:p-4 [scrollbar-width:thin]">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
