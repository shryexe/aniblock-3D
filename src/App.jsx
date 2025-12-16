import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import AnimeCarousel from './AnimeCarousel'
import PricingSection from './components/PricingSection'
import FeaturesSection from './components/FeaturesSection'
import Hero3DImage from './components/Hero3DImage'
import AnimatedBackground from './components/AnimatedBackground'
import Footer from './components/Footer'

function App() {
  const { isConnected } = useAccount()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-black relative">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Enhanced Header/Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('#home')
              }}
              className="text-3xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent cursor-pointer"
            >
              AniVerse 3D
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.href)
                  }}
                  className="text-gray-300 hover:text-accent transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
              <ConnectButton />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <ConnectButton />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-accent transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      scrollToSection(link.href)
                    }}
                    className="text-gray-300 hover:text-accent transition-colors font-medium py-2"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>
        <section id="home">
          {isConnected ? (
            <div className="container mx-auto px-6 py-12">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold mb-4"
                  >
                    Welcome to AniVerse 3D
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-400 text-lg"
                  >
                    Explore premium 3D anime recommendations
                  </motion.p>
                </div>
                <AnimeCarousel />
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] gap-12 px-6 py-12">
              {/* Left Side - Text Content */}
              <div className="text-center lg:text-left max-w-2xl space-y-8 flex-1">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-accent via-purple-400 to-pink-500 bg-clip-text text-transparent"
                >
                  Unlock the Next Gen of Anime
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-xl text-gray-400 mb-12"
                >
                  Connect your wallet to access premium 3D suggestions.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <ConnectButton.Custom>
                    {({ account, chain, openConnectModal, mounted }) => {
                      return (
                        <button
                          onClick={openConnectModal}
                          className="px-8 py-4 bg-gradient-to-r from-accent to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white text-lg font-semibold rounded-2xl shadow-lg shadow-accent/50 transition-all transform hover:scale-105"
                        >
                          Connect Wallet
                        </button>
                      )
                    }}
                  </ConnectButton.Custom>
                </motion.div>
              </div>

              {/* Right Side - 3D Image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="flex-1 flex items-center justify-center"
              >
                <Hero3DImage />
              </motion.div>
            </div>
          )}
        </section>

        {/* Features Section */}
        {!isConnected && <FeaturesSection />}

        {/* Pricing Section */}
        {!isConnected && <PricingSection />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App

