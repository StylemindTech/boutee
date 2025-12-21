"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import localBirdImage from "../../assets/Logo2025Black.svg"
import mobileLogo from "../../assets/mobile-logo.svg"
import closeMenuIcon from "../../assets/icons/close.svg"
import arrow from "../../assets/icons/dropdown-arrow.svg"
import navMenu from "../../assets/icons/toggle-nav.svg"

// SIMPLE LINKS (used when dropdown is disabled)
const links = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Our Jewellers", href: "/our-jewellers" },
  { name: "Ring Inspiration", href: "/inspiration" },
  { name: "Our Technology", href: "/our-technology" },
  { name: "About Us", href: "/about-us" },
  { name: "Advice & Guides", href: "/blog" },
]

// DESKTOP LINKS WITH DROPDOWN
const originalLinks = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Our Jewellers", href: "/our-jewellers" },
  { name: "Ring Inspiration", href: "/inspiration" },
  { name: "Advice & Guides", href: "/blog" },
  {
    name: "Learn More",
    dropdown: [
      { name: "Our Technology", href: "/our-technology" },
      { name: "About Us", href: "/about-us" },
      { name: "Advice & Guides", href: "/blog" },
    ],
  },
]

const menuVariants = {
  hidden: { clipPath: "circle(0% at 100% 0%)", opacity: 0 },
  visible: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
    transition: { type: "spring", stiffness: 80, restDelta: 2 },
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  // Toggle dropdown navigation
  const useDropdownMenu = true

  return (
    <header className="bg-white md:pt-[12px] lg:px-[48px] pt-[8px] px-[12px] md:px-[24px] relative z-50">
      <nav className="max-w-[1504px] bg-secondary md:py-5 py-[11px] pl-[16px] pr-[17px] md:px-8 md:rounded-3xl rounded-[16px] flex justify-between items-center mx-auto">
        {/* Logo */}
        <a href="/">
          <img
            src={localBirdImage.src}
            alt="Boutee logo"
            className="h-auto w-full max-w-[80px] md:max-w-[100px]"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          <div className="flex gap-8 items-center">
            {!useDropdownMenu ? (
              // SIMPLIFIED VERSION - NO DROPDOWNS
              links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-base font-figtree text-textPrimary border-b border-transparent hover:border-[#2C2C30] transition-colors duration-150"
                >
                  {link.name}
                </a>
              ))
            ) : (
              // ORIGINAL VERSION WITH DROPDOWNS
              originalLinks.map((link, idx) =>
                link.dropdown ? (
                  <div key={idx} className="relative group">
                    <button
                      className="flex items-center gap-1 cursor-pointer font-figtree text-textPrimary"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      {link.name}
                      <img
                        src={arrow.src}
                        alt=""
                        className="transition-transform duration-300 rotate-180 group-hover:rotate-0"
                      />
                    </button>
                    <div className="absolute -left-8 mt-2 w-40 bg-white border border-[#F0F1F5] rounded-2xl p-2 flex flex-col items-center gap-2 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all">
                      {link.dropdown.map((sublink, sidx) => (
                        <a
                          key={sidx}
                          href={sublink.href}
                          className="py-2 hover:bg-secondary w-full text-center rounded-sm text-base font-figtree text-textPrimary"
                        >
                          {sublink.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : (
                  <a
                    key={idx}
                    href={link.href}
                    className="text-base font-figtree text-textPrimary border-b border-transparent hover:border-[#2C2C30] transition-colors duration-150"
                  >
                    {link.name}
                  </a>
                )
              )
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
          <a href="https://app.boutee.co.uk" className="font-figtree text-textPrimary px-2 py-1 border border-[#2C2C30] rounded-[12px] cursor-pointer w-[76px] text-[16px] leading-[20px] h-[36px] flex items-center justify-center">
            Log in
          </a>
          <a href="https://app.boutee.co.uk" className="font-figtree w-[87px] h-[36px] rounded-[12px] bg-btnPrimary text-white cursor-pointer flex items-center justify-center">
            Sign up
          </a>
        </div>
      </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="focus:outline-none cursor-pointer"
            aria-label="Open menu"
          >
            <img src={navMenu.src} alt="" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 z-50 flex flex-col justify-between bg-secondary rounded-2xl m-3 sm:m-4 pt-2 pl-3 pr-2 pb-8"
            >
              {/* Top bar */}
              <div className="flex justify-between items-center pl-[8px]">
                <img src={localBirdImage.src} alt="Boutee logo" className="h-auto w-full max-w-[80px]" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="focus:outline-none cursor-pointer"
                  aria-label="Close menu"
                >
                  <img src={closeMenuIcon.src} alt="" />
                </button>
              </div>

              {/* Links */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-4 text-lg font-figtree py-10 text-textPrimary"
              >
                {!useDropdownMenu ? (
                  // SIMPLIFIED MOBILE MENU
                  <>
                    {links.map((link, idx) => (
                      <motion.a
                        key={idx}
                        href={link.href}
                        variants={itemVariants}
                        className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                      >
                        {link.name}
                      </motion.a>
                    ))}
                    <motion.a
                      href="/faq"
                      variants={itemVariants}
                      className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                    >
                      FAQs
                    </motion.a>
                    <motion.a
                      href="/contact-us"
                      variants={itemVariants}
                      className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                    >
                      Contact
                    </motion.a>
                  </>
                ) : (
                  // ORIGINAL MOBILE MENU WITH DROPDOWN ITEMS
                  <>
                    {originalLinks.map((link, idx) =>
                      link.dropdown ? (
                        link.dropdown.map((sublink, sidx) => (
                          <motion.a
                            key={`${idx}-${sidx}`}
                            href={sublink.href}
                            variants={itemVariants}
                            className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                          >
                            {sublink.name}
                          </motion.a>
                        ))
                      ) : (
                        <motion.a
                          key={idx}
                          href={link.href}
                          variants={itemVariants}
                          className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                        >
                          {link.name}
                        </motion.a>
                      )
                    )}
                    <motion.a
                      href="/faq"
                      variants={itemVariants}
                      className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                    >
                      FAQs
                    </motion.a>
                    <motion.a
                      href="/contact-us"
                      variants={itemVariants}
                      className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary"
                    >
                      Contact
                    </motion.a>
                  </>
                )}
              </motion.div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 px-6">
                <a
                  href="https://app.boutee.co.uk"
                  className="border border-[#2C2C30] rounded-xl py-3.5 px-6 w-full font-figtree font-medium text-base leading-5 flex items-center justify-center"
                >
                  Log in
                </a>

                <a
                  href="https://app.boutee.co.uk"
                  className="rounded-xl py-3.5 px-6 bg-btnPrimary text-white w-full font-figtree font-medium text-base leading-5 flex items-center justify-center"
                >
                  Sign up
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
