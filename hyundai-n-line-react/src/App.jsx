import { useRef } from 'react'
import HyundaiLogo from './components/HyundaiLogo.jsx'
import Button from './components/Button.jsx'
import SectionTitle from './components/SectionTitle.jsx'
import QuickActions from './components/QuickActions.jsx'
import Car360 from './components/Car360.jsx'
import EnquiryForm from './components/EnquiryForm.jsx'
import { Icon } from './icons.jsx'
import { SITE } from './config.js'

const highlights = [
  { image: '/images/highlight-led.png', label: <>Twin Horn<br />LED DRLs</> },
  { image: '/images/alloy.png', label: <>Diamond-Cut<br />N Alloys</> },
  { image: '/images/steering.png', label: <>N Line Steering<br />Wheel</> },
  { image: '/images/gear.png', label: <>N Line<br />Gear Knob</> },
]

const performance = [
  {
    icon: 'engine',
    title: 'Powertrain',
    text: '1.5L Turbo GDi petrol engine producing up to 160 PS and 253 Nm of torque.',
  },
  {
    icon: 'transmission',
    title: 'Transmission',
    text: '6-speed manual or 7-speed dual-clutch automatic (DCT), depending on grade.',
  },
  {
    icon: 'mode',
    title: 'Drive Modes',
    text: 'Selectable drive modes (Eco, Normal, Sport) to match your mood on the road.',
  },
]

const tech = [
  { icon: 'screen', title: '10.25” Touchscreen Infotainment' },
  { icon: 'connected', title: 'Bluelink Connected Car' },
  { icon: 'wireless', title: 'Wireless Phone Connectivity' },
  { icon: 'fan', title: 'Automatic Climate Control' },
]

const safetyLeft = [
  '6 Airbags (Dual front, side, and curtain)',
  'Electronic Stability Control (ESC)',
  'Vehicle Stability Management (VSM)',
  'Hill-start Assist Control (HAC)',
]

const safetyRight = [
  'Surround View Monitor',
  'Blind Spot View Monitor',
  'Tyre Pressure Monitoring System',
  'Electronic Parking Brake with Auto Hold',
]

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function SliderDots({ count = 8, showArrow = false }) {
  return (
    <div className="slider-dots" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <span key={index} className={index === 0 ? 'active' : ''} />
      ))}
      {showArrow && <Icon name="chevronRight" size={20} strokeWidth={2.2} />}
    </div>
  )
}

export default function App() {
  const brochureToast = useRef(null)

  const brochure = (event) => {
    if (SITE.brochureUrl) return
    event?.preventDefault?.()

    if (brochureToast.current) window.clearTimeout(brochureToast.current)
    const node = document.getElementById('brochure-toast')
    if (node) {
      node.classList.add('show')
      brochureToast.current = window.setTimeout(() => node.classList.remove('show'), 3500)
    }
  }

  const quickAction = (key) => {
    if (key === 'dealer') {
      window.open(SITE.dealerMapsUrl, '_blank', 'noopener,noreferrer')
      return
    }
    if (key === 'brochure') {
      brochure()
      return
    }
    if (key === 'finance') {
      scrollToId('ownership')
      return
    }
    scrollToId('enquire')
  }

  return (
    <main>
      <div id="brochure-toast" className="toast">
        Brochure file/link can be connected as soon as it is provided.
      </div>

      <header className="topbar">
        <div className="container topbar-inner">
          <HyundaiLogo />
          <img src="/images/n-line-header-exact.png" className="nline-logo" alt="N Line" />

          <div className="header-right">
            <div className="header-icons" aria-label="Header shortcuts">
              <button type="button" aria-label="Search"><Icon name="search" size={20} strokeWidth={1.45} /></button>
              <button type="button" aria-label="Share"><Icon name="share" size={20} strokeWidth={1.45} /></button>
              <button type="button" aria-label="Account"><Icon name="user" size={21} strokeWidth={1.35} /></button>
            </div>
          </div>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="hero-kicker">{SITE.modelKicker}</div>
            <h1>
              <span className="hero-line">BORN TO</span>
              <span className="hero-line"><span className="blue">STAND</span> APART.</span>
            </h1>

            <div className="hero-buttons">
              <Button onClick={() => scrollToId('enquire')}>Book a Test Drive</Button>
              <Button variant="outline" href={SITE.brochureUrl || '#'} onClick={brochure}>Download Brochure</Button>
            </div>
          </div>

          <img className="hero-car" src="/images/hero-red.png" alt={`Red ${SITE.modelName}`} />
          <QuickActions onAction={quickAction} />
        </div>
      </section>

      <section className="section sport-section">
        <div className="container sport-grid">
          <div className="sport-copy">
            <h2>Sport, sharpened.</h2>
            <p>{SITE.modelName} takes everything you know about Sri Lanka&apos;s favourite SUV and gives it an edge. Sharper lines, a lowered stance and signature N red accents bring Hyundai&apos;s motorsport identity to the daily drive.</p>
            <p>A turbocharged heart, a driver-focused cabin and a chassis tuned for confidence — {SITE.modelName} is built for those who want more from every journey, without giving up everyday practicality.</p>

            <div className="price-card">
              <span>STARTING PRICE</span>
              <strong>Price on Request</strong>
              <small>1.5L Turbo GDi Petrol | FWD</small>
            </div>
          </div>

          <div className="sport-image-wrap">
            <img src="/images/sport-black-cropped.png" alt={`Black ${SITE.modelName}`} />
          </div>
        </div>
      </section>

      <section className="section highlights-section" id="highlights">
        <div className="container">
          <SectionTitle ghost="Key Highlights" title="Designed to make a statement." />

          <div className="highlight-grid">
            {highlights.map((item, index) => (
              <article className="highlight-card" key={index}>
                <img src={item.image} alt="" />
                <div>{item.label}</div>
              </article>
            ))}
          </div>

          <div className="center-actions">
            <button className="whatsapp-pill" type="button" onClick={() => scrollToId('enquire')}>
              <Icon name="chat" size={16} strokeWidth={1.7} />
              Quick question? WhatsApp us
            </button>
          </div>
        </div>
      </section>

      <section className="section design-intro" id="design">
        <div className="container">
          <SectionTitle
            ghost="Exterior Design"
            title="Bold by design. Unmistakable on the road."
            text="Every panel has a purpose. Dark chrome, red highlights and N-exclusive detailing turn Creta's familiar silhouette into something unmistakably sportier."
          />
        </div>
        <img className="wide-banner" src="/images/bold-banner.png" alt={`${SITE.modelName} exterior`} />
      </section>

      <section className="section indicator-section">
        <div className="container indicator-grid">
          <div className="indicator-copy">
            <h3>LED sequential turn<br className="desktop-br" /> indicators</h3>
            <SliderDots count={8} showArrow />
            <Button variant="outline" onClick={() => scrollToId('enquire')}>Click to Enquire</Button>
          </div>

          <div className="angled-image">
            <img src="/images/indicator-framed.png" alt="LED sequential turn indicator detail" />
          </div>
        </div>
      </section>

      <section className="section interior-section">
        <div className="container">
          <SectionTitle ghost="Interior Comfort" title="Step inside. Feel the difference." />

          <div className="interior-main-grid">
            <img src="/images/interior-road.png" alt={`${SITE.modelName} in motion`} />
            <div>
              <h3>Driver-Focused Cabin</h3>
              <p>Step inside and the sporty intent continues. Black surfaces with red stitching, metal pedals and an N-branded steering wheel put you in the mood before you&apos;ve even started the engine — while Creta&apos;s everyday space and comfort stay exactly where they should be.</p>
            </div>
          </div>

          <div className="interior-cards">
            <article>
              <div className="slant-card"><img src="/images/gear-framed.png" alt="Sliding center console" /></div>
              <span>Sliding center console</span>
            </article>
            <article>
              <div className="slant-card"><img src="/images/seats-framed.png" alt="Relaxation comfort seats" /></div>
              <span>Relaxation comfort seats</span>
            </article>
            <article>
              <div className="slant-card"><img src="/images/steering-framed.png" alt="Dual displays and steering wheel" /></div>
              <span>Dual 12.3-inch displays</span>
            </article>
          </div>

          <SliderDots count={6} />

          <div className="center-actions interior-action">
            <Button variant="outline" onClick={() => scrollToId('enquire')}>See full cabin specs</Button>
          </div>
        </div>
      </section>

      <section className="section performance-section">
        <div className="container">
          <SectionTitle ghost="Performance" title="Power that demands attention." />
          <div className="info-card-grid three">
            {performance.map((item) => (
              <article className="info-card" key={item.title}>
                <Icon name={item.icon} size={38} strokeWidth={1.65} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tech-section">
        <div className="container">
          <SectionTitle ghost="Convenience & Technology" title="Technology that moves with you." />
          <div className="tech-grid">
            {tech.map((item) => (
              <article className="tech-card" key={item.title}>
                <Icon name={item.icon} size={30} strokeWidth={1.7} />
                <span>{item.title}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section safety-section">
        <div className="container">
          <SectionTitle ghost="Safety" title="Confidence in every direction." />

          <div className="safety-grid">
            <article className="safety-card">
              <img src="/images/safety-airbags.png" alt="Six airbags safety illustration" />
              <div className="safety-content">
                <h3><Icon name="shield" size={28} strokeWidth={1.8} />Core Safety</h3>
                <ul>
                  {safetyLeft.map((text) => <li key={text}><Icon name="checkCircle" size={15} strokeWidth={1.8} /><span>{text}</span></li>)}
                </ul>
              </div>
            </article>

            <article className="safety-card">
              <img src="/images/safety-sensors.png" alt="Driver assistance illustration" />
              <div className="safety-content">
                <h3><Icon name="eye" size={28} strokeWidth={1.8} />Driver Assist &amp; Monitoring</h3>
                <ul>
                  {safetyRight.map((text) => <li key={text}><Icon name="checkCircle" size={15} strokeWidth={1.8} /><span>{text}</span></li>)}
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section viewer-section" id="360">
        <div className="container">
          <SectionTitle title="Colours & 360° View" />
          <Car360 />
          <div className="viewer-actions">
            <Button onClick={() => scrollToId('enquire')}>Book a Test Drive</Button>
            <Button variant="outline" onClick={() => scrollToId('enquire')}>Enquire Now</Button>
          </div>
        </div>
      </section>

      <section className="section ownership-section" id="ownership">
        <div className="container">
          <SectionTitle title="Warranty & Ownership" />
          <div className="info-card-grid three ownership-grid">
            <article className="info-card">
              <Icon name="warranty" size={38} strokeWidth={1.8} />
              <h3>Warranty Term</h3>
              <p>Manufacturer warranty terms to be confirmed with Hyundai Sri Lanka (Abans Auto).</p>
            </article>
            <article className="info-card">
              <Icon name="service" size={38} strokeWidth={1.8} />
              <h3>Service Package</h3>
              <p>Scheduled maintenance package details to be confirmed with Abans Auto.</p>
            </article>
            <article className="info-card">
              <Icon name="roadside" size={38} strokeWidth={1.8} />
              <h3>Roadside Assist</h3>
              <p>Roadside assistance terms to be confirmed with Abans Auto.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section enquiry-section" id="enquire">
        <div className="container narrow">
          <SectionTitle title="Enquire Now" text="Leave your details and our team will get back to you shortly." />
          <EnquiryForm />
        </div>
      </section>

      <section className="ready-strip">
        <div className="container ready-grid">
          <div>
            <h2>Ready to go beyond?</h2>
            <p>Book a showroom visit or download the brochure to learn more about {SITE.modelName}.</p>
            <a className="dealer-link" href={SITE.dealerMapsUrl} target="_blank" rel="noreferrer">Dealer locator — Abans Auto, Colombo</a>
          </div>

          <div className="ready-actions">
            <Button variant="light" onClick={() => scrollToId('enquire')}>Book a Showroom Visit</Button>
            <Button variant="outline-light" onClick={() => scrollToId('enquire')}>Enquire Now</Button>
            <Button variant="outline-light" href={SITE.brochureUrl || '#'} onClick={brochure}>Download Brochure</Button>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <HyundaiLogo light />
            <small>© 2026 Hyundai Sri Lanka —<br />Hyundai by Abans Auto. All Rights Reserved.</small>
          </div>
          <div className="footer-links">
            <button>Privacy Policy</button>
            <button>Terms of Use</button>
            <button>Sitemap</button>
            <button onClick={() => scrollToId('enquire')}>Contact Us</button>
          </div>
        </div>
      </footer>
    </main>
  )
}
