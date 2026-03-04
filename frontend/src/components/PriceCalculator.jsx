import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DIMENSIONS = {
  '20x30': '20 × 30 cm',
  '40x50': '40 × 50 cm',
  '50x70': '50 × 70 cm',
  'custom': 'Custom',
}

const OPTIONS = [
  { id: 'semi_acrylic', label: 'Semi-realism Acrylic' },
  { id: 'realism_acrylic', label: 'Realism Acrylic' },
  { id: 'realism_oil', label: 'Realism Oil' },
]

const PRICING_DATA = {
  "20x30-semi_acrylic": { "hours": 30, "pricePLN": 500, "priceUSD": 140 },
  "20x30-realism_acrylic": { "hours": 40, "pricePLN": 700, "priceUSD": 190 },
  "20x30-realism_oil": { "hours": 40, "pricePLN": 800, "priceUSD": 220 },

  "40x50-semi_acrylic": { "hours": 60, "pricePLN": 700, "priceUSD": 190 },
  "40x50-realism_acrylic": { "hours": 70, "pricePLN": 900, "priceUSD": 250 },
  "40x50-realism_oil": { "hours": 70, "pricePLN": 1000, "priceUSD": 270 },

  "50x70-semi_acrylic": { "hours": 100, "pricePLN": 1000, "priceUSD": 270 },
  "50x70-realism_acrylic": { "hours": 120, "pricePLN": 1200, "priceUSD": 330 },
  "50x70-realism_oil": { "hours": 120, "pricePLN": 1500, "priceUSD": 410 }
}

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
  const [dimension, setDimension] = useState('')
  const [option, setOption] = useState('')
  const [result, setResult] = useState(null)

  const handleDimensionChange = (e) => {
    setDimension(e.target.value)
    setResult(null)
  }

  const handleOptionChange = (id) => {
    setOption(id)
    setResult(null)
  }

  const handleCalculate = () => {
    if (!dimension || !option) return

    if (dimension === 'custom') {
      setResult({ isCustom: true, customFields: ['dimensions'] })
      return
    }

    const priceKey = `${dimension}-${option}`
    const pricing = PRICING_DATA[priceKey]

    if (!pricing) return

    setResult({
      isCustom: false,
      hours: pricing.hours,
      pricePLN: pricing.pricePLN,
      priceUSD: pricing.priceUSD,
    })
  }

  const isFormComplete = dimension && option

  const selectStyles = "w-full bg-black/30 backdrop-blur-lg border border-white/10 rounded-lg px-4 py-3 text-white text-left focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-300 cursor-pointer [&>option]:bg-black [&>option]:text-white"

  return (
      <section id="price-calculator" className="min-h-[calc(100vh-4rem)] lg:min-h-[70vh] flex items-center justify-center lg:justify-end px-4 lg:px-0 lg:pr-16">
        <div className="lg: max-w-xl w-full text-right">
          <h2
              className="text-6xl lg:text-[80px] mb-8 font-bold text-white opacity-60 leading-none text-right"
              style={{ fontFamily: 'Genos' }}
          >
            Price Estimator
          </h2>

          <div className="space-y-6">
            <div className="flex items-center gap-4 text-xl">
              <label
                  htmlFor="dimensions"
                  className="w-28 font-medium text-white text-left shrink-0"
                  style={{ fontFamily: 'Genos' }}
              >
                Dimensions
              </label>
              <select
                  id="dimensions"
                  name="dimensions"
                  value={dimension}
                  onChange={handleDimensionChange}
                  className={selectStyles}
                  style={{ fontFamily: 'Genos' }}
              >
                <option value="" disabled>Select dimensions</option>
                {Object.entries(DIMENSIONS).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {OPTIONS.map((opt) => (
                  <button
                      key={opt.id}
                      onClick={() => handleOptionChange(opt.id)}
                      className={`py-4 px-2 rounded-lg border backdrop-blur-lg  transition-all duration-300 ${
                          option === opt.id
                              ? 'bg-white/20 border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                              : 'bg-black/30 border-white/10 text-white hover:border-white/30 hover:bg-black/40'
                      }`}
                      style={{ fontFamily: 'Genos' }}
                  >
                    {opt.label}
                  </button>
              ))}
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
                              {result.priceUSD.toLocaleString('pl-PL')} <span className="text-xl text-white/60">USD</span>
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