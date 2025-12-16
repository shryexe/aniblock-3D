import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

export default function AnimeCarousel() {
  const [animeData, setAnimeData] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        const response = await fetch(
          'https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=15'
        )
        const data = await response.json()
        setAnimeData(data.data || [])
      } catch (error) {
        console.error('Error fetching anime:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnime()
  }, [])

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % animeData.length)
  }

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + animeData.length) % animeData.length)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (animeData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <p className="text-gray-400">No anime data available</p>
      </div>
    )
  }

  const getCardPosition = (cardIndex) => {
    const total = animeData.length
    const prevIndex = (index - 1 + total) % total
    const nextIndex = (index + 1) % total

    if (cardIndex === index) {
      return {
        x: 0,
        scale: 1.15,
        zIndex: 20,
        rotateY: 0,
        opacity: 1,
      }
    } else if (cardIndex === nextIndex) {
      return {
        x: 220,
        scale: 0.85,
        zIndex: 10,
        rotateY: -25,
        opacity: 0.5,
      }
    } else if (cardIndex === prevIndex) {
      return {
        x: -220,
        scale: 0.85,
        zIndex: 10,
        rotateY: 25,
        opacity: 0.5,
      }
    } else {
      return {
        x: 0,
        scale: 0,
        zIndex: 0,
        rotateY: 0,
        opacity: 0,
      }
    }
  }

  const visibleIndices = [
    (index - 1 + animeData.length) % animeData.length,
    index,
    (index + 1) % animeData.length,
  ]

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center perspective-1000">
      <AnimatePresence mode="wait">
        {visibleIndices.map((cardIndex) => {
          const anime = animeData[cardIndex]
          const position = getCardPosition(cardIndex)

          return (
            <motion.div
              key={cardIndex}
              className="absolute w-[400px] h-[550px]"
              initial={false}
              animate={{
                x: position.x,
                scale: position.scale,
                rotateY: position.rotateY,
                opacity: position.opacity,
              }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              style={{
                transformStyle: 'preserve-3d',
                zIndex: position.zIndex,
              }}
            >
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-slate-800/50 backdrop-blur-sm">
                <img
                  src={anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url}
                  alt={anime.title}
                  className="w-full h-full object-cover"
                />
                {cardIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6"
                  >
                    <h3 className="text-2xl font-bold mb-2 line-clamp-2">
                      {anime.title}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-lg font-semibold">
                          {anime.score || 'N/A'}
                        </span>
                      </div>
                    </div>
                    <a
                      href={anime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-accent hover:bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Watch Now
                      <ExternalLink size={18} />
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 z-30 p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  )
}

