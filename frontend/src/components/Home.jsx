import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {useInView} from "react-intersection-observer";

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
  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.6,
    triggerOnce: false,
  });

  // Hook dla drugiego tekstu (nagłówka z literami)
  const { ref: headingRef, inView: headingInView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });
  return (
    <section id="home" className="flex items-center justify-end px-4 lg:px-0 lg:pr-16">
      <div className="text-right">
        <div className={"min-h-[100vh] flex items-end justify-center  px-4 lg:px-0 flex-col "}>
          <h1 className="font-normal text-white opacity-70 leading-none"
              style={{fontFamily: 'Genos', fontWeight: '700'}}>
            <span className="text-[40px] lg:text-[150px] block mb-[-20px]">MAGDALENA</span>
            <span className="text-[100px] lg:text-[150px] block">TĘCZA</span>
          </h1>
          <div className="text-[50px] lg:text-[80px] text-white opacity-20 mt-4 lg:mt-25"
               style={{fontFamily: 'Genos', fontWeight: '700'}}>
            <TextWave texts={TEXTS} interval={3000}/>
          </div>
        </div>
        <div ref={textRef} className={'min-h-[50vh] flex flex-col items-center justify-center'}>
          <p
              className={`text-3xl lg:text-[40px] lg:text-[40px] w-full lg:w-[50vw] font-bold text-right text-white leading-none mb-10 mt-8 transition-opacity duration-1000 ease-in-out block ${textInView ? 'opacity-60' : 'opacity-0'}`}
              style={{fontFamily: 'Genos', fontWeight: '700'}}
          >
            I’ve always been interested in art and creating beautiful things from scratch using a variety of tools but
            what instantly stood out for me the most was painting. I’ve used that as an opportunity to express myself in
            many different ways throughout the years.
          </p>
        </div>
        <h2
            ref={headingRef}
            className=" border-b-1 border-b-white/20 text-[100px] lg:text-[100px] font-bold leading-none text-right  mt-6 h-[100vh] w-full flex flex-col justify-center"
            style={{fontFamily: 'Genos', fontWeight: '700'}}
        >
          {/* Każde słowo to osobny span z innym docelowym opacity i opóźnieniem (delay) */}
          <span
              className={`transition-opacity duration-300 ease-in-out block text-[#E85C4B] ${headingInView ? 'opacity-50' : 'opacity-0'}`}>BRING</span>
          <span
              className={`transition-opacity duration-300 ease-in-out block delay-100 text-[#E5953E] ${headingInView ? 'opacity-70' : 'opacity-0'}`}>ART</span>
          <span
              className={`transition-opacity duration-300 ease-in-out block delay-200 text-[#E7C12C] ${headingInView ? 'opacity-50' : 'opacity-0'}`}>INTO</span>
          <span
              className={`transition-opacity duration-300 ease-in-out block delay-300  text-[#93D74F] ${headingInView ? 'opacity-70' : 'opacity-0'}`}>YOUR</span>
          <span
              className={`transition-opacity duration-300 ease-in-out block delay-400 text-[#5AC2CC] ${headingInView ? 'opacity-50' : 'opacity-0'}`}>SPACE.</span>
        </h2>
      </div>

    </section>
  )
}

export default Home
