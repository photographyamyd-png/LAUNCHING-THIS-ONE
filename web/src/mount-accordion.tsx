import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LandingAccordionItem } from '@/components/ui/interactive-image-accordion'
import './embed-tailwind.css'

const mountId = 'glc-react-accordion-root'
const el = document.getElementById(mountId)

if (el) {
  createRoot(el).render(
    <StrictMode>
      <LandingAccordionItem />
    </StrictMode>,
  )
}
