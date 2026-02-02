'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button, LinkButton } from '@/components/ui';
import { navItems, externalLinks } from '@/lib/data';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 40,
    restDelta: 0.0001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Vitality Spark Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-royal-purple via-pink-500 to-white origin-left z-[100]"
        style={{ scaleX }}
      >
        {/* Leading Spark Glow */}
        <div className="absolute top-0 right-0 bottom-0 w-[100px] bg-gradient-to-r from-transparent to-white/80 blur-[2px]" />
        <div className="absolute top-0 right-0 bottom-0 w-[20px] bg-white blur-[4px] shadow-[0_0_10px_4px_rgba(255,255,255,0.6)]" />
      </motion.div>

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth h-auto",
          // At top: sits flush (0 padding). On scroll: floats down (py-4 or top-4)
          isScrolled ? "py-4 flex justify-center" : "py-0"
        )}
      >
        {/* Gradient border effect when scrolled (optional, maybe remove for cleaner look or keep) */}
        {isScrolled && (
          <motion.div
            className="hidden lg:block absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-periwinkle/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}

        <nav
          className={cn(
            "flex items-center justify-between transition-all duration-500 relative z-50",
            // Shape & Size
            isScrolled
              ? "w-[95%] max-w-6xl rounded-full px-6 py-3"
              : "w-full rounded-none px-6 py-5 border-b border-pink-500/50",
            // Background & Effects
            isScrolled
              ? "glass-pill bg-royal-purple/90 border border-pink-500/50 shadow-[0_0_30px_rgba(255,20,147,0.5)]"
              : "bg-midnight-purple/95 backdrop-blur-md shadow-[0_4px_30px_-5px_rgba(255,20,147,0.4)]"
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Inner container for alignment */}
          <div className={cn(
            "flex items-center justify-between w-full mx-auto",
            // Use same max-width as site container to align logo/nav with page content
            isScrolled ? "max-w-full" : "container-custom py-0"
          )}>
            {/* Logo */}
            <Link
              href="/"
              className="relative z-10 group"
              aria-label="Healthspan Productions - Home"
            >
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Logo mark */}
                <div className="relative w-10 h-10 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 bg-periwinkle/20 rounded-full"
                    whileHover={{
                      backgroundColor: 'rgba(107, 92, 231, 0.4)',
                      boxShadow: '0 0 20px rgba(107, 92, 231, 0.4)'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <svg
                    viewBox="0 0 40 40"
                    className="w-8 h-8 text-periwinkle transition-transform duration-300 group-hover:scale-105"
                    fill="currentColor"
                  >
                    <path d="M20 4C11.163 4 4 11.163 4 20s7.163 16 16 16 16-7.163 16-16S28.837 4 20 4zm0 28c-6.627 0-12-5.373-12-12S13.373 8 20 8s12 5.373 12 12-5.373 12-12 12z" />
                    <path d="M20 12c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 12c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z" />
                    <circle cx="20" cy="20" r="2" />
                  </svg>
                </div>
                {/* Logo text - Visible on all screens now */}
                <div className="flex flex-col ml-2 justify-center">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none transition-colors duration-300">
                    Healthspan
                  </span>
                  <span className="font-sans text-[10px] sm:text-xs font-bold text-periwinkle uppercase tracking-[0.3em] leading-tight mt-0.5 ml-0.5">
                    Collective
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      `
                      px-3 py-2 rounded-lg
                      font-bold text-xs uppercase tracking-[0.15em]
                      transition-all duration-400 ease-smooth
                      relative overflow-hidden
                      hover:text-white
                      `,
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-white font-bold'
                        : 'text-white/80 hover:text-white'
                    )}
                  >
                    <span className="flex items-center gap-1 relative z-10">
                      {item.label}
                      {item.children && (
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                    {/* Animated underline on hover */}
                    <motion.span
                      className="absolute bottom-1 left-6 right-6 h-0.5 bg-periwinkle origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {item.children && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className={`
                          absolute top-full left-0 mt-2
                          min-w-[220px]
                          bg-royal-purple/95 backdrop-blur-xl
                          rounded-xl shadow-2xl
                          border border-white/10
                          overflow-hidden
                          origin-top-left
                        `}
                      >
                        {item.children.map((child, index) => (
                          <motion.div
                            key={child.label}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                          >
                            <Link
                              href={child.href}
                              className={cn(
                                `
                                block px-5 py-3
                                text-sm
                                transition-all duration-300
                                hover:bg-white/5 hover:text-periwinkle
                                hover:pl-6
                                `,
                                pathname === child.href ? 'text-periwinkle bg-white/5' : 'text-text-light'
                              )}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <LinkButton
                href={externalLinks.collective}
                external
                variant="primary"
                size="sm"
              >
                Join The Collective
              </LinkButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden relative z-10 w-10 h-10 flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span
                  className={cn(
                    'w-full h-0.5 bg-white transition-all duration-300 origin-center',
                    isMobileMenuOpen && 'rotate-45 translate-y-2'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-white transition-all duration-300',
                    isMobileMenuOpen && 'opacity-0'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-0.5 bg-white transition-all duration-300 origin-center',
                    isMobileMenuOpen && '-rotate-45 -translate-y-2'
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden fixed inset-0 z-40 bg-midnight-purple/95 backdrop-blur-2xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className="flex flex-col items-center justify-center min-h-screen p-8"
              >
                <nav className="flex flex-col items-center gap-6">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          `
                          block font-display text-3xl font-semibold
                          transition-all duration-300
                          hover:text-[#FF1493] hover:tracking-wider
                          `,
                          pathname === item.href ? 'text-[#FF1493]' : 'text-white'
                        )}
                      >
                        {item.label}
                      </Link>

                      {/* Mobile dropdown items */}
                      {item.children && (
                        <motion.div
                          className="mt-3 flex flex-col gap-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        >
                          {item.children.map((child, childIndex) => (
                            <motion.div
                              key={child.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{
                                duration: 0.3,
                                delay: index * 0.1 + 0.2 + childIndex * 0.05
                              }}
                            >
                              <Link
                                href={child.href}
                                className={cn(
                                  `
                                  text-lg
                                  transition-colors duration-300
                                hover:text-[#FF1493]
                                `,
                                  pathname === child.href ? 'text-[#FF1493]' : 'text-text-muted'
                                )}
                              >
                                {child.label}
                              </Link>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </nav>

                <motion.div
                  className="mt-12"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={externalLinks.collective}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-8 py-4 rounded-full bg-gradient-to-r from-royal-purple via-periwinkle to-pink-500 text-white font-bold tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(107,92,231,0.5)] hover:shadow-[0_0_30px_rgba(255,20,147,0.6)] transition-all duration-300 transform hover:scale-105"
                  >
                    Join The Collective
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header >
    </>
  );
}
