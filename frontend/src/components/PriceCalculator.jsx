import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DIMENSIONS = {
  '20x30': { label: '30 × 40 cm', baseHours: 48 },
  '40x50': { label: '40 × 50 cm', baseHours: 100 },
  '70x90': { label: '70 × 100 cm', baseHours: 200 },
  'custom': { label: 'Custom', baseHours: null },
}

const TECHNIQUES = {
  acrylic: { label: 'Acrylic', multiplier: 0.6 },
  oil: { label: 'Oil', multiplier: 1.0 },
  other: { label: 'Other', multiplier: null },
}

const STYLES = {
  semi_realism: { label: 'Semi-realism', multiplier: 0.8 },
  realism: { label: 'Realism', multiplier: 1.0 },
  other: { label: 'Other', multiplier: null },
}

const HOURLY_RATE = 40
const EUR_RATE = 4.3

const resultVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    }
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 }
  }
}

function PriceCalculator() {
  const [formData, setFormData] = useState({
    dimensions: '',
    technique: '',
    style: '',
  })
  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setResult(null)
  }

  const handleCalculate = () => {
    const { dimensions, technique, style } = formData

    if (!dimensions || !technique || !style) return

    const customFields = []
    if (dimensions === 'custom') customFields.push('dimensions')
    if (technique === 'other') customFields.push('technique')
    if (style === 'other') customFields.push('style')

    if (customFields.length > 0) {
      setResult({ isCustom: true, customFields })
      return
    }

    const baseHours = DIMENSIONS[dimensions].baseHours
    const techniqueMultiplier = TECHNIQUES[technique].multiplier
    const styleMultiplier = STYLES[style].multiplier

    const totalHours = Math.round(baseHours * techniqueMultiplier * styleMultiplier)
    const pricePLN = totalHours * HOURLY_RATE
    const priceEUR = Math.round(pricePLN / EUR_RATE)

    setResult({
      isCustom: false,
      hours: totalHours,
      pricePLN,
      priceEUR,
    })
  }

  const isFormComplete = formData.dimensions && formData.technique && formData.style

  const selectStyles = "w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white text-left focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-300 cursor-pointer [&>option]:bg-black [&>option]:text-white"

  return (
    <section id="price-calculator" className="min-h-[calc(100vh-4rem)] lg:min-h-[70vh] flex items-center justify-center lg:justify-end px-4 lg:px-0 lg:pr-16">
      <div className="lg: max-w-xl w-full text-right">
        <h2
          className="text-5xl lg:text-[80px] mb-8 pt-20 font-bold text-white opacity-40 leading-none text-right"
          style={{ fontFamily: 'Genos' }}
        >
          Price Estimator
        </h2>

        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <label
              htmlFor="dimensions"
              className="w-28 text-lg font-medium text-white text-left"
              style={{ fontFamily: 'Genos' }}
            >
              Dimensions
            </label>
            <select
              id="dimensions"
              name="dimensions"
              value={formData.dimensions}
              onChange={handleChange}
              className={selectStyles}
              style={{ fontFamily: 'Genos' }}
            >
              <option value="" disabled>Select dimensions</option>
              {Object.entries(DIMENSIONS).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="technique"
              className="w-28 text-lg font-medium text-white text-left"
              style={{ fontFamily: 'Genos' }}
            >
              Technique
            </label>
            <select
              id="technique"
              name="technique"
              value={formData.technique}
              onChange={handleChange}
              className={selectStyles}
              style={{ fontFamily: 'Genos' }}
            >
              <option value="" disabled>Select technique</option>
              {Object.entries(TECHNIQUES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4">
            <label
              htmlFor="style"
              className="w-28 text-lg font-medium text-white text-left"
              style={{ fontFamily: 'Genos' }}
            >
              Style
            </label>
            <select
              id="style"
              name="style"
              value={formData.style}
              onChange={handleChange}
              className={selectStyles}
              style={{ fontFamily: 'Genos' }}
            >
              <option value="" disabled>Select style</option>
              {Object.entries(STYLES).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCalculate}
            disabled={!isFormComplete}
            className="w-full mt-4 bg-black/60 hover:bg-black/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            style={{ fontFamily: 'Genos' }}
          >
            Calculate
          </button>
        </div>

        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              variants={resultVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
            >
              {result.isCustom ? (
                <>
                  <p
                    className="text-lg text-white/80 text-center leading-relaxed"
                    style={{ fontFamily: 'Genos' }}
                  >
                    Custom settings selected. Check the estimation for standard {result.customFields.join(', ')} to see the price, or contact me to learn more about a custom project.
                  </p>
                  <a
                    href="#contact"
                    className="block mt-6 w-full bg-black/60 hover:bg-black/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/20 text-center"
                    style={{ fontFamily: 'Genos' }}
                  >
                    Contact Me
                  </a>
                </>
              ) : (
                <>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-baseline justify-between gap-4">
                      <p
                        className="text-lg uppercase tracking-wider text-white/60"
                        style={{ fontFamily: 'Genos' }}
                      >
                        Estimated Hours
                      </p>
                      <p
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: 'Genos' }}
                      >
                        {result.hours} <span className="text-xl text-white/60">h</span>
                      </p>
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <p
                        className="text-lg uppercase tracking-wider text-white/60"
                        style={{ fontFamily: 'Genos' }}
                      >
                        Estimated Price
                      </p>
                      <p
                        className="text-3xl font-bold text-white"
                        style={{ fontFamily: 'Genos' }}
                      >
                        {result.priceEUR.toLocaleString('pl-PL')} <span className="text-xl text-white/60">EUR</span>
                      </p>
                    </div>
                    <p
                      className="text-xl text-white/30 text-right"
                      style={{ fontFamily: 'Genos' }}
                    >
                      ~{result.pricePLN.toLocaleString('pl-PL')} PLN
                    </p>
                  </div>
                  <a
                    href="#contact"
                    className="block mt-8 w-full bg-black/60 hover:bg-black/80 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 border border-white/20 text-center"
                    style={{ fontFamily: 'Genos' }}
                  >
                    Contact Me
                  </a>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PriceCalculator
