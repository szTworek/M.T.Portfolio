import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TEXTS = ['Art', 'Passion', 'Vision']

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
  exit: {
    opacity: 0,
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}

const letterVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
  },
}

function TextWave({ texts, interval = 3000 }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [texts.length, interval])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="flex justify-end"
      >
        {texts[index].split('').map((char, i) => (
          <motion.span key={i} variants={letterVariants}>
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

function Home() {
  return (
    <section id="home" className="min-h-[100vh] flex items-center justify-end px-4 lg:px-0 lg:pr-16">
      <div className="text-right">
        <h1 className="font-normal text-white opacity-60 leading-none" style={{ fontFamily: 'Genos', fontWeight: '700' }}>
          <span className="text-[40px] lg:text-[150px] block mb-[-20px]">MAGDALENA</span>
          <span className="text-[100px] lg:text-[150px] block">TĘCZA</span>
        </h1>
        <div className="text-[50px] lg:text-[80px] text-white opacity-20 mt-4 lg:mt-25" style={{ fontFamily: 'Genos', fontWeight: '700' }}>
          <TextWave texts={TEXTS} interval={3000} />
        </div>
      </div>
    </section>
  )
}

export default Home
