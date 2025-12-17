import { motion } from 'framer-motion'
import { Sparkles, Zap, Shield, Globe, Image as ImageIcon, Star } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: Sparkles,
      title: '3D Carousel Experience',
      description:
        'Immerse yourself in stunning 3D anime recommendations with smooth animations and interactive controls.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Get instant access to top anime recommendations powered by the Jikan API with real-time updates.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    },
    {
      icon: Shield,
      title: 'Web3 Secure',
      description:
        'Your wallet connection is secure and private. We never store your personal information.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop',
    },
    {
      icon: Globe,
      title: 'Decentralized',
      description:
        'Built on blockchain technology, giving you full control over your anime discovery experience.',
      image: 'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?w=400&h=300&fit=crop',
    },
    {
      icon: ImageIcon,
      title: 'HD Quality',
      description:
        'Enjoy high-definition anime images and artwork in stunning detail for the best viewing experience.',
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop',
    },
    {
      icon: Star,
      title: 'Top Rated',
      description:
        'Access the most popular and highly-rated anime series curated from MyAnimeList data.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=300&fit=crop',
    },
  ]

  return (
    <section id="features" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Discover what makes AniVerse 3D the ultimate anime discovery platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm hover:border-accent/50 transition-all"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute top-4 right-4 p-3 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30">
                    <IconComponent className="text-accent" size={24} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

