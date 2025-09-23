"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import localBirdImage from "../../assets/Logo.svg"
import mobileLogo from "../../assets/mobile-logo.svg"
import closeMenuIcon from "../../assets/icons/close.svg"
import arrow from "../../assets/icons/dropdown-arrow.svg"
import navMenu from "../../assets/icons/toggle-nav.svg"

const links = [
  { name: "How It Works", href: "/how-it-works" },
  { name: "Inspiration", href: "/inspiration" },
  {
    name: "Learn More",
    dropdown: [
      { name: "About Us", href: "/about-us" },
      { name: "Our Jewellers", href: "/our-jewellers" },
      { name: "Our Technology", href: "/our-technology" },
      { name: "Blog", href: "/blog" },
    ],
  },
  { name: "For Jewellers", href: "/for-jewellers" },
]

const menuVariants = {
  hidden: { clipPath: "circle(0% at 100% 0%)", opacity: 0 },
  visible: {
    clipPath: "circle(150% at 50% 50%)",
    opacity: 1,
    transition: { type: "spring", stiffness: 30, restDelta: 2 },
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)",
    opacity: 0,
    transition: { duration: 0.4 },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white md:pt-[12px] lg:px-[48px] pt-[8px] px-[12px] md:px-[24px] relative z-50">
      <nav className="max-w-[1504px] bg-secondary md:py-5 py-[11px] pl-[16px] pr-[17px] md:px-8 md:rounded-3xl rounded-[16px] flex justify-between items-center mx-auto">
        {/* Logo */}
        <a href="/">
          <img
            src={localBirdImage.src}
            alt="Boutee logo"
            className="h-auto w-[70px] md:h-full md:w-full"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-8">
          <div className="flex gap-8 items-center">
            {links.map((link, idx) =>
              link.dropdown ? (
                <div key={idx} className="relative group">
                  <button className="flex items-center gap-1 cursor-pointer font-figtree text-textPrimary">
                    {link.name}
                    <img
                      src={arrow.src}
                      alt="arrow"
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
                  className="text-base font-figtree text-textPrimary hover:border-b border-[#2C2C30] transition-all duration-150"
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="font-figtree text-textPrimary px-2 py-1 border border-[#2C2C30] rounded-[12px] cursor-pointer w-[76px] text-[16px] leading-[20px] h-[36px]">
              Log in
            </button>
            <button className="font-figtree w-[87px] h-[36px] rounded-[12px] bg-btnPrimary text-white cursor-pointer">
              Sign up
            </button>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(true)} className="focus:outline-none cursor-pointer">
            <img src={navMenu.src} alt="menu" />
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
              className="fixed inset-0 z-50 flex flex-col justify-between bg-secondary rounded-2xl m-3 sm:m-4 pt-2 pl-3 pr-2 pb-8 "
            >
              {/* Top bar */}
              <div className="flex justify-between items-center">
                <img src={mobileLogo.src} alt="Boutee logo" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="focus:outline-none cursor-pointer"
                >
                  <img src={closeMenuIcon.src} alt="close "/>
                </button>
              </div>

              {/* Links */}
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-4 text-lg font-figtree py-10 text-textPrimary"
              >
                {links.map((link, idx) =>
                  link.dropdown ? (
                    link.dropdown.map((sublink, sidx) => (
                      <motion.a
                        key={sidx}
                        href={sublink.href}
                        variants={itemVariants}
                        className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary "
                      >
                        {sublink.name}
                      </motion.a>
                    ))
                  ) : (
                    <motion.a
                      key={idx}
                      href={link.href}
                      variants={itemVariants}
                      className="w-full text-center p-2 font-figtree font-normal text-base leading-5 text-textPrimary "
                    >
                      {link.name}
                    </motion.a>
                  )
                )}
              </motion.div>

              {/* Buttons */}
              <div className="flex justify-center gap-3 px-6">
                <button className="border border-[#2C2C30] rounded-xl py-3.5 px-6 w-full font-figtree font-medium text-base leading-5">
                  Log in
                </button>
                <button className="rounded-xl py-3.5 px-6 bg-btnPrimary text-white w-full font-figtree font-medium text-base leading-5">
                  Sign up
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
