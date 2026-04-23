"use client";

import { useState } from "react";
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Home,
  Phone,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SmartLink } from "@/components/ui/smart-link";
import { ROUTES } from "@/lib/routes";
import type { NavLink } from "@/content/types";

type Props = {
  open: boolean;
  onClose: () => void;
  /** Quick links from `navigation.json` → `mobile.links` (single source of truth). */
  mobileLinks: NavLink[];
  serviceLinks: Array<{ label: string; href: string }>;
  companyLinks: NavLink[];
  utilityPhoneDisplay: string;
  utilityPhoneHref: string;
};

function NestedDrawerLink({
  href,
  onClose,
  children,
}: {
  href: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <SmartLink href={href} onClick={onClose} className="gl-drawer-nested-link">
      <ArrowRight className="gl-drawer-nested-link__icon" size={16} strokeWidth={2.25} aria-hidden />
      <span className="gl-drawer-nested-link__text">{children}</span>
    </SmartLink>
  );
}

function DrawerSection({
  label,
  icon: SectionIcon,
  itemVariants,
  children,
}: {
  label: string;
  icon: LucideIcon;
  itemVariants: Variants;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div variants={itemVariants} className="gl-drawer-section">
      <button
        type="button"
        className={`gl-drawer-section__trigger${expanded ? " is-open" : ""}`}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className="gl-drawer-section__trigger-label">
          <SectionIcon className="gl-drawer-section__trigger-icon" size={20} strokeWidth={2.25} aria-hidden />
          {label}
        </span>
        <ChevronDown className="gl-drawer-section__chevron" size={18} strokeWidth={2.25} aria-hidden />
      </button>
      {expanded && <div className="gl-drawer-section__links">{children}</div>}
    </motion.div>
  );
}

export function MobileDrawer({
  open,
  onClose,
  mobileLinks,
  serviceLinks,
  companyLinks,
  utilityPhoneDisplay,
  utilityPhoneHref,
}: Props) {
  const reduceMotion = useReducedMotion();

  const itemVariants: Variants = reduceMotion
    ? { visible: { opacity: 1 }, hidden: { opacity: 1 } }
    : {
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] },
        },
        hidden: {
          opacity: 0,
          x: 18,
          transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
        },
      };

  const containerVariants: Variants = reduceMotion
    ? {}
    : {
        visible: {
          transition: { staggerChildren: 0.044, delayChildren: 0.08 },
        },
        hidden: {
          transition: { staggerChildren: 0.03, staggerDirection: -1 },
        },
      };

  return (
    <>
      <nav
        className={`gl-mobile-drawer${open ? " open" : ""}`}
        aria-label="Mobile navigation"
        id="mobile-drawer"
      >
        <button
          type="button"
          className="gl-mobile-drawer__close"
          aria-label="Close menu"
          onClick={onClose}
        >
          <X size={22} strokeWidth={2.25} aria-hidden />
        </button>

        <motion.div
          className="gl-mobile-drawer__motion"
          initial="hidden"
          animate={open ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <SmartLink href={ROUTES.home} onClick={onClose} className="gl-drawer-top-link">
              <Home className="gl-drawer-top-link__icon" size={20} strokeWidth={2.25} aria-hidden />
              <span>Home</span>
            </SmartLink>
          </motion.div>
          {mobileLinks.map((l) => (
            <motion.div key={`${l.href}-${l.label}`} variants={itemVariants}>
              <SmartLink href={l.href} onClick={onClose} className="gl-drawer-top-link">
                <ArrowRight className="gl-drawer-top-link__icon" size={20} strokeWidth={2.25} aria-hidden />
                <span>{l.label}</span>
              </SmartLink>
            </motion.div>
          ))}

          <DrawerSection label="Services" icon={Wrench} itemVariants={itemVariants}>
            <NestedDrawerLink href={ROUTES.services} onClose={onClose}>
              All Services
            </NestedDrawerLink>
            {serviceLinks.map((l) => (
              <NestedDrawerLink key={l.href} href={l.href} onClose={onClose}>
                {l.label}
              </NestedDrawerLink>
            ))}
          </DrawerSection>

          <DrawerSection label="Company" icon={Building2} itemVariants={itemVariants}>
            {companyLinks.map((l) => (
              <NestedDrawerLink key={`co-${l.href}-${l.label}`} href={l.href} onClose={onClose}>
                {l.label}
              </NestedDrawerLink>
            ))}
          </DrawerSection>

          <motion.div variants={itemVariants} className="gl-drawer-cta">
            <a href={utilityPhoneHref} className="gl-drawer-phone" onClick={onClose}>
              <Phone className="gl-drawer-phone__icon" size={20} strokeWidth={2.25} aria-hidden />
              {utilityPhoneDisplay}
            </a>
            <SmartLink href={ROUTES.contact} className="btn-primary gl-drawer-cta__quote" onClick={onClose}>
              Get a Quote
            </SmartLink>
          </motion.div>
        </motion.div>
      </nav>
      <div
        className={`gl-mobile-overlay${open ? " open" : ""}`}
        id="mobile-overlay"
        onClick={onClose}
        role="presentation"
      />
    </>
  );
}
