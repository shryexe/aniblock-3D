import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

export default function PricingSection() {
  const plans = [
    {
      name: 'Free',
      price: '0',
      currency: 'ETH',
      features: [
        'Basic anime recommendations',
        'Limited carousel access',
        'Standard quality images',
        'Community support',
      ],
      popular: false,
    },
    {
      name: 'Premium',
      price: '0.01',
      currency: 'ETH',
      features: [
        'Unlimited anime recommendations',
        'Full 3D carousel access',
        'HD quality images',
        'Priority support',
        'Early access to new features',
        'Exclusive content',
      ],
      popular: true,
    },
    {
      name: 'Ultimate',
      price: '0.05',
      currency: 'ETH',
      features: [
        'Everything in Premium',
        'Personalized recommendations',
        '4K quality images',
        '24/7 priority support',
        'Beta feature access',
        'NFT rewards',
        'VIP community access',
      ],
      popular: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-accent via-purple-400 to-pink-500 bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Unlock premium features and get the most out of AniVerse 3D
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 border-2 backdrop-blur-xl ${
                plan.popular
                  ? 'border-accent bg-gradient-to-br from-accent/20 to-purple-500/20 scale-105 shadow-2xl shadow-accent/50'
                  : 'border-white/10 bg-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-accent to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Sparkles size={14} />
                    Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-bold bg-gradient-to-r from-accent to-purple-400 bg-clip-text text-transparent">
                    {plan.price}
                  </span>
                  <span className="text-gray-400">{plan.currency}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className={`flex-shrink-0 mt-1 ${
                        plan.popular ? 'text-accent' : 'text-gray-400'
                      }`}
                      size={20}
                    />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-semibold transition-all ${
                  plan.popular
                    ? 'bg-gradient-to-r from-accent to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white shadow-lg shadow-accent/50'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {plan.name === 'Free' ? 'Current Plan' : 'Upgrade Now'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

