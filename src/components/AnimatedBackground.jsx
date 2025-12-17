import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'

export default function AnimatedBackground() {
  const [colors, setColors] = useState({
    primary: '#3b82f6', // Blue
    secondary: '#2563eb', // Darker Blue
    tertiary: '#60a5fa', // Light Blue
  })

  useEffect(() => {
    // Blue gradient color sets - all variations of blue
    const colorSets = [
      { primary: '#3b82f6', secondary: '#2563eb', tertiary: '#60a5fa' }, // Sky Blue - Royal Blue - Light Blue
      { primary: '#2563eb', secondary: '#1d4ed8', tertiary: '#3b82f6' }, // Royal Blue - Navy Blue - Sky Blue
      { primary: '#60a5fa', secondary: '#3b82f6', tertiary: '#93c5fd' }, // Light Blue - Sky Blue - Lighter Blue
      { primary: '#1e40af', secondary: '#3b82f6', tertiary: '#60a5fa' }, // Deep Blue - Sky Blue - Light Blue
      { primary: '#1e3a8a', secondary: '#2563eb', tertiary: '#3b82f6' }, // Navy - Royal Blue - Sky Blue
      { primary: '#3b82f6', secondary: '#60a5fa', tertiary: '#93c5fd' }, // Sky Blue - Light Blue - Lighter Blue
      { primary: '#2563eb', secondary: '#1e40af', tertiary: '#3b82f6' }, // Royal Blue - Deep Blue - Sky Blue
      { primary: '#1d4ed8', secondary: '#3b82f6', tertiary: '#60a5fa' }, // Dark Blue - Sky Blue - Light Blue
    ]

    const interval = setInterval(() => {
      const randomSet = colorSets[Math.floor(Math.random() * colorSets.length)]
      setColors(randomSet)
    }, 4000) // Change colors every 4 seconds for smoother transitions

    return () => clearInterval(interval)
  }, [])

  // Generate random stickers/shapes - memoized to prevent recalculation
  const stickers = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const seed = i * 0.618 // Golden ratio for better distribution
      return {
        id: i,
        size: (Math.sin(seed) * 50 + 50) + 40,
        x: (Math.cos(seed * 2) * 30 + 50),
        y: (Math.sin(seed * 3) * 30 + 50),
        duration: 20 + (i % 5) * 3,
        delay: (i % 4) * 1.2,
        shape: ['circle', 'square', 'triangle', 'star'][i % 4],
        xOffset: Math.sin(seed) * 150,
        yOffset: Math.cos(seed * 1.5) * 150,
      }
    })
  }, [])

  // Memoize orb positions
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const seed = i * 0.785
      return {
        id: i,
        width: (Math.sin(seed) * 200 + 250) + 200,
        height: (Math.sin(seed) * 200 + 250) + 200,
        left: (Math.cos(seed * 2) * 30 + 50),
        top: (Math.sin(seed * 3) * 30 + 50),
        xOffset: Math.sin(seed) * 400,
        yOffset: Math.cos(seed * 1.5) * 400,
        duration: 20 + i * 2,
        delay: i * 0.5,
      }
    })
  }, [])

  return (
    <div 
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        perspective: 1000,
      }}
    >
      {/* Animated Blue Gradient Background with Changing Lighting */}
      <motion.div
        className="absolute inset-0"
        style={{
          willChange: 'background, opacity',
          transform: 'translateZ(0)',
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 30%, ${colors.primary}25 0%, transparent 60%),
             radial-gradient(circle at 80% 70%, ${colors.secondary}20 0%, transparent 55%),
             radial-gradient(circle at 50% 50%, ${colors.tertiary}15 0%, transparent 50%),
             radial-gradient(circle at 10% 80%, ${colors.primary}18 0%, transparent 45%)`,
            `radial-gradient(circle at 80% 20%, ${colors.secondary}25 0%, transparent 60%),
             radial-gradient(circle at 20% 60%, ${colors.primary}20 0%, transparent 55%),
             radial-gradient(circle at 60% 80%, ${colors.tertiary}18 0%, transparent 50%),
             radial-gradient(circle at 40% 30%, ${colors.secondary}15 0%, transparent 45%)`,
            `radial-gradient(circle at 50% 20%, ${colors.tertiary}25 0%, transparent 60%),
             radial-gradient(circle at 30% 70%, ${colors.primary}22 0%, transparent 55%),
             radial-gradient(circle at 70% 50%, ${colors.secondary}18 0%, transparent 50%),
             radial-gradient(circle at 90% 80%, ${colors.tertiary}15 0%, transparent 45%)`,
            `radial-gradient(circle at 15% 50%, ${colors.primary}20 0%, transparent 60%),
             radial-gradient(circle at 85% 40%, ${colors.secondary}25 0%, transparent 55%),
             radial-gradient(circle at 45% 80%, ${colors.tertiary}18 0%, transparent 50%),
             radial-gradient(circle at 65% 20%, ${colors.primary}15 0%, transparent 45%)`,
          ],
          opacity: [0.8, 1, 0.9, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Additional Blue Gradient Layers for Depth */}
      <motion.div
        className="absolute inset-0"
        style={{
          willChange: 'background',
          transform: 'translateZ(0)',
        }}
        animate={{
          background: [
            `linear-gradient(135deg, ${colors.primary}08 0%, transparent 50%, ${colors.secondary}08 100%)`,
            `linear-gradient(225deg, ${colors.secondary}08 0%, transparent 50%, ${colors.tertiary}08 100%)`,
            `linear-gradient(315deg, ${colors.tertiary}08 0%, transparent 50%, ${colors.primary}08 100%)`,
            `linear-gradient(45deg, ${colors.primary}08 0%, transparent 50%, ${colors.secondary}08 100%)`,
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Moving Stickers/Shapes */}
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          className="absolute"
          style={{
            left: `${sticker.x}%`,
            top: `${sticker.y}%`,
            width: `${sticker.size}px`,
            height: `${sticker.size}px`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            x: [
              sticker.xOffset * 0.5,
              sticker.xOffset,
              sticker.xOffset * 0.7,
              sticker.xOffset * 0.5,
            ],
            y: [
              sticker.yOffset * 0.5,
              sticker.yOffset,
              sticker.yOffset * 0.7,
              sticker.yOffset * 0.5,
            ],
            rotate: [0, 360, 0],
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{
            duration: sticker.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: sticker.delay,
          }}
        >
          {sticker.shape === 'circle' && (
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                background: `linear-gradient(135deg, ${colors.primary}50, ${colors.secondary}50)`,
                boxShadow: `0 0 ${sticker.size}px ${colors.primary}40, 0 0 ${sticker.size * 2}px ${colors.secondary}20`,
              }}
              animate={{
                boxShadow: [
                  `0 0 ${sticker.size}px ${colors.primary}40, 0 0 ${sticker.size * 2}px ${colors.secondary}20`,
                  `0 0 ${sticker.size * 1.5}px ${colors.secondary}50, 0 0 ${sticker.size * 2.5}px ${colors.tertiary}30`,
                  `0 0 ${sticker.size}px ${colors.tertiary}40, 0 0 ${sticker.size * 2}px ${colors.primary}20`,
                  `0 0 ${sticker.size}px ${colors.primary}40, 0 0 ${sticker.size * 2}px ${colors.secondary}20`,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          {sticker.shape === 'square' && (
            <motion.div
              className="w-full h-full rounded-2xl rotate-45"
              style={{
                background: `linear-gradient(135deg, ${colors.secondary}50, ${colors.tertiary}50)`,
                boxShadow: `0 0 ${sticker.size}px ${colors.secondary}40, 0 0 ${sticker.size * 2}px ${colors.tertiary}20`,
              }}
              animate={{
                boxShadow: [
                  `0 0 ${sticker.size}px ${colors.secondary}40, 0 0 ${sticker.size * 2}px ${colors.tertiary}20`,
                  `0 0 ${sticker.size * 1.5}px ${colors.primary}50, 0 0 ${sticker.size * 2.5}px ${colors.secondary}30`,
                  `0 0 ${sticker.size}px ${colors.tertiary}40, 0 0 ${sticker.size * 2}px ${colors.primary}20`,
                  `0 0 ${sticker.size}px ${colors.secondary}40, 0 0 ${sticker.size * 2}px ${colors.tertiary}20`,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          {sticker.shape === 'triangle' && (
            <motion.div
              className="w-full h-full"
              style={{
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                background: `linear-gradient(135deg, ${colors.tertiary}50, ${colors.primary}50)`,
                boxShadow: `0 0 ${sticker.size}px ${colors.tertiary}40, 0 0 ${sticker.size * 2}px ${colors.primary}20`,
              }}
              animate={{
                boxShadow: [
                  `0 0 ${sticker.size}px ${colors.tertiary}40, 0 0 ${sticker.size * 2}px ${colors.primary}20`,
                  `0 0 ${sticker.size * 1.5}px ${colors.secondary}50, 0 0 ${sticker.size * 2.5}px ${colors.tertiary}30`,
                  `0 0 ${sticker.size}px ${colors.primary}40, 0 0 ${sticker.size * 2}px ${colors.secondary}20`,
                  `0 0 ${sticker.size}px ${colors.tertiary}40, 0 0 ${sticker.size * 2}px ${colors.primary}20`,
                ],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          {sticker.shape === 'star' && (
            <motion.div
              className="w-full h-full flex items-center justify-center text-4xl"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                style={{
                  filter: `drop-shadow(0 0 ${sticker.size / 4}px ${colors.primary})`,
                  color: colors.primary,
                }}
                animate={{
                  filter: [
                    `drop-shadow(0 0 ${sticker.size / 4}px ${colors.primary})`,
                    `drop-shadow(0 0 ${sticker.size / 2}px ${colors.secondary})`,
                    `drop-shadow(0 0 ${sticker.size / 4}px ${colors.tertiary})`,
                  ],
                  color: [colors.primary, colors.secondary, colors.tertiary],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ⭐
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Floating Blue Light Orbs - Enhanced Lighting Atmosphere */}
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            width: `${orb.width}px`,
            height: `${orb.height}px`,
            left: `${orb.left}%`,
            top: `${orb.top}%`,
            willChange: 'transform, background, opacity',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            x: [
              orb.xOffset * 0.3,
              orb.xOffset,
              orb.xOffset * 0.6,
              orb.xOffset * 0.3,
            ],
            y: [
              orb.yOffset * 0.3,
              orb.yOffset,
              orb.yOffset * 0.6,
              orb.yOffset * 0.3,
            ],
            background: [
              `radial-gradient(circle, ${colors.primary}40, ${colors.secondary}20, transparent 70%)`,
              `radial-gradient(circle, ${colors.secondary}40, ${colors.tertiary}20, transparent 70%)`,
              `radial-gradient(circle, ${colors.tertiary}40, ${colors.primary}20, transparent 70%)`,
              `radial-gradient(circle, ${colors.primary}40, ${colors.secondary}20, transparent 70%)`,
            ],
            opacity: [0.3, 0.6, 0.4, 0.5],
            scale: [1, 1.6, 1.1, 1.4],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {/* Pulsing Light Rings */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          className="absolute rounded-full border-2"
          style={{
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) translateZ(0)',
            borderColor: colors.primary,
            willChange: 'transform, border-color, opacity',
            backfaceVisibility: 'hidden',
          }}
          animate={{
            borderColor: [colors.primary, colors.secondary, colors.tertiary, colors.primary],
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  )
}

