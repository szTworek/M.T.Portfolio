import { useState } from 'react'
import { Instagram, Mail, Phone } from 'lucide-react'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement form submission
    console.log('Form submitted:', formData)
  }

  const inputStyles = "w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-transparent transition-all duration-300"

  return (
    <section id="contact" className="min-h-[calc(100vh-4rem)] lg:min-h-[100vh] flex items-center justify-center lg:justify-end px-4 lg:px-0 lg:pr-16">
      <div className="max-w-2xl w-full">
        <h2
          className="text-5xl font-bold mb-10 text-white opacity-80 text-right"
          style={{ fontFamily: 'Genos' }}
        >
          Contact
        </h2>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-end ">
          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-6 pb-6 border-b lg:pb-0 lg:border-b-0 lg:pl-12 lg:border-l border-white/20">
            <a
              href="https://www.instagram.com/sk8erboi_______"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-white hover:text-white/70 transition-colors duration-300"
            >
              <Instagram size={28} strokeWidth={2} />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Genos' }}
              >
                @sk8erboi_______
              </span>
            </a>

            <a
              href="mailto:email@example.com"
              className="flex items-center gap-4 text-white hover:text-white/70 transition-colors duration-300"
            >
              <Mail size={28} strokeWidth={2} />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Genos' }}
              >
                magdalenatecza@interia.pl
              </span>
            </a>

            <a
              href="tel:+48123456789"
              className="flex items-center gap-4 text-white hover:text-white/70 transition-colors duration-300"
            >
              <Phone size={28} strokeWidth={2} />
              <span
                className="text-xl font-bold"
                style={{ fontFamily: 'Genos' }}
              >
                +48 734 446 427
              </span>
            </a>
          </div>

          {/* Email Form */}
          {/*<form onSubmit={handleSubmit} className="flex-1 space-y-5">*/}
          {/*  <div className="flex items-center gap-4">*/}
          {/*    <label*/}
          {/*      htmlFor="name"*/}
          {/*      className="w-20 text-lg font-medium text-white text-left"*/}
          {/*      style={{ fontFamily: 'Genos' }}*/}
          {/*    >*/}
          {/*      Name*/}
          {/*    </label>*/}
          {/*    <input*/}
          {/*      type="text"*/}
          {/*      id="name"*/}
          {/*      name="name"*/}
          {/*      value={formData.name}*/}
          {/*      onChange={handleChange}*/}
          {/*      placeholder="Your name"*/}
          {/*      className={inputStyles}*/}
          {/*      style={{ fontFamily: 'Genos' }}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <div className="flex items-center gap-4">*/}
          {/*    <label*/}
          {/*      htmlFor="email"*/}
          {/*      className="w-20 text-lg font-medium text-white text-left"*/}
          {/*      style={{ fontFamily: 'Genos' }}*/}
          {/*    >*/}
          {/*      Email*/}
          {/*    </label>*/}
          {/*    <input*/}
          {/*      type="email"*/}
          {/*      id="email"*/}
          {/*      name="email"*/}
          {/*      value={formData.email}*/}
          {/*      onChange={handleChange}*/}
          {/*      placeholder="your@email.com"*/}
          {/*      className={inputStyles}*/}
          {/*      style={{ fontFamily: 'Genos' }}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <div className="flex items-start gap-4">*/}
          {/*    <label*/}
          {/*      htmlFor="message"*/}
          {/*      className="w-20 text-lg font-medium text-white text-left pt-3"*/}
          {/*      style={{ fontFamily: 'Genos' }}*/}
          {/*    >*/}
          {/*      Message*/}
          {/*    </label>*/}
          {/*    <textarea*/}
          {/*      id="message"*/}
          {/*      name="message"*/}
          {/*      value={formData.message}*/}
          {/*      onChange={handleChange}*/}
          {/*      placeholder="Your message..."*/}
          {/*      rows={4}*/}
          {/*      className={inputStyles + " resize-none"}*/}
          {/*      style={{ fontFamily: 'Genos' }}*/}
          {/*    />*/}
          {/*  </div>*/}

          {/*  <button*/}
          {/*    type="submit"*/}
          {/*    style={{ fontFamily: 'Genos' }}*/}
          {/*    disabled*/}
          {/*    className="w-full mt-4 bg-black/60 text-white font-semibold py-3 px-6 rounded-lg transition-all*/}
          {/*  +duration-300 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"*/}
          {/*  >*/}
          {/*    Send Message*/}
          {/*  </button>*/}
          {/*</form>*/}
        </div>
      </div>
    </section>
  )
}

export default Contact
