import './App.css'
import backgroundImage from './assets/rainbowcanvas.png'
import Menu from './components/Menu'
import Content from './components/Content'

function App() {
  return (
    <div className="flex min-h-screen">
      {/* Tło */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      <Menu />
      <Content />
    </div>
  )
}

export default App
