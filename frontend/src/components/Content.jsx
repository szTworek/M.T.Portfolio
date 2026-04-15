import Home from './Home'
import Portfolio from './Portfolio'
import PriceCalculator from './PriceCalculator'
import Contact from './Contact'

function Content() {
  return (
    <main
      id="content-container"
      className="w-full lg:w-[80%] ml-0 lg:ml-[20%] pt-16 lg:pt-0 text-white"
    >
      <Home />
      <Portfolio />
      <PriceCalculator />
      <Contact />
    </main>
  )
}

export default Content
