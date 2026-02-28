import img1 from '../portfolio/IMG_5591.jpg'
import img2 from '../portfolio/IMG_0687.jpg'
import img3 from '../portfolio/IMG_6016.jpg'
import img4 from '../portfolio/IMG_1041_1166x861-min.png'
import img5 from '../portfolio/IMG_0689.jpg'
import { useInView } from 'react-intersection-observer';

const portfolioItems = [
  { id: 2, src: img2, title: 'Porsche Cayman', description: 'Oil, 50 × 60 cm' },
  { id: 3, src: img3, title: 'Porsche 911', description: 'Acrylic, 50 × 60 cm' },
  { id: 4, src: img5, title: 'Mazda RX-7', description: 'Acrylic, 50 × 60 cm' },
  { id: 1, src: img1, title: 'Porsche 911', description: 'Acrylic, 50 × 60 cm' },
  { id: 5, src: img4, title: 'Mitsubischi Lancer Evo ', description: 'Acrylic, 50 × 60 cm' },
]

function Portfolio() {
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
    <section id="portfolio" className="min-h-screen py-16 px-4 lg:px-0 lg:pr-16">
      <div className="flex flex-col items-end ">
        <h2
            className="text-5xl lg:text-[100px]  pt-20 font-bold text-white opacity-40 leading-none text-right mb-8 lg:mb-16"
            style={{fontFamily: 'Genos', fontWeight: '700'}}
        >PORTFOLIO</h2>
        <p
            className="text-xl lg:text-[30px] w-[full] lg:w-[50vw] font-bold text-white text-right opacity-80 leading-none mb-8 mt-8 lg:mb-16"
            style={{fontFamily: 'Genos', fontWeight: '700'}}
        >
          My love for cars has also been a huge part of my life since I can remember. That’s how these two worlds got
          combined into one. Capturing cars in my paintings has become my favorite way for unwinding and I’m hoping to
          do it even more in the future.
        </p>

        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-12 mb-20">
          {portfolioItems.map((item) => (
              <div key={item.id} className="text-right">
                <div className="overflow-hidden shadow-4xl rounded-xl">
                  <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-110"
                  />
                </div>
                <h3
                    className="text-3xl text-white opacity-80 mt-4"
                    style={{fontFamily: 'Genos', fontWeight: '700'}}
                >
                  {item.title}
                </h3>
                <p
                    className="text-xl text-white opacity-60"
                    style={{fontFamily: 'Genos'}}
                >
                  {item.description}
                </p>
              </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
