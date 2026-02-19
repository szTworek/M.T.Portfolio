import img1 from '../portfolio/IMG_5591.jpeg'
import img2 from '../portfolio/IMG_0305-min.jpeg'
import img3 from '../portfolio/IMG_6016.jpeg'
import img4 from '../portfolio/IMG_1041_1166x861-min.png'
import img5 from '../portfolio/fea177b1-999c-4f73-a5b8-dec23d4d5206.jpg'

const portfolioItems = [
  { id: 1, src: img1, title: 'Porsche 911', description: 'Acrylic, 50 × 60 cm' },
  { id: 2, src: img2, title: 'Porsche Cayman', description: 'Oil, 50 × 60 cm' },
  { id: 3, src: img3, title: 'Porsche 911', description: 'Acrylic, 50 × 60 cm' },
  { id: 4, src: img4, title: 'Mitsubischi Lancer Evo ', description: 'Acrylic, 50 × 60 cm' },
  { id: 5, src: img5, title: 'Mazda RX-7', description: 'Acrylic, 50 × 60 cm' },
]

function Portfolio() {
  return (
    <section id="portfolio" className="min-h-screen py-16 px-4 lg:px-0 lg:pr-16">
      <div className="flex flex-col items-end">
        <h2
          className="text-[100px] lg:text-[100px] font-bold text-white opacity-40 leading-none text-right mb-8 lg:mb-16"
          style={{ fontFamily: 'Genos', fontWeight: '700' }}
        >
          BRING
          <br />
          ART
          <br />
          INTO
          <br />
          YOUR
          <br />
          SPACE.
        </h2>

        <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-12">
          {portfolioItems.map((item) => (
            <div key={item.id} className="text-right">
              <div className="overflow-hidden">
                <img
                  src={item.src}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out hover:scale-110"
                />
              </div>
              <h3
                className="text-2xl text-white opacity-60 mt-4"
                style={{ fontFamily: 'Genos', fontWeight: '700' }}
              >
                {item.title}
              </h3>
              <p
                className="text-sm text-white opacity-40"
                style={{ fontFamily: 'Genos' }}
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
