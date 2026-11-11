import React, { useEffect, useRef, useState } from 'react'
import { business, whatsappLink } from './business'

function Brand() {
  return <img className="brand-logo" src="/images/logo-makari.png" alt="" width="150" height="150" />
}
export default function App() {
  const [menu, setMenu] = useState(false)
  const photoDialog = useRef<HTMLDialogElement>(null)
  const [zoomPhoto, setZoomPhoto] = useState<{ src: string; label: string } | null>(null)
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | undefined
    function setup() {
      observer?.disconnect()
      document.querySelectorAll('.reveal').forEach(el => el.classList.remove('waiting'))
      if (media.matches) return
      observer = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.remove('waiting'); observer?.unobserve(entry.target) }
      }), { threshold: .08 })
      document.querySelectorAll('.reveal').forEach(el => { if (el.getBoundingClientRect().top > innerHeight) el.classList.add('waiting'); observer?.observe(el) })
    }
    setup(); media.addEventListener('change', setup)
    return () => { observer?.disconnect(); media.removeEventListener('change', setup) }
  }, [])
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenu(false); document.getElementById('menu-toggle')?.focus() } }
    document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close)
  }, [])
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="header flex items-center justify-between">
      <a href="#inicio" aria-label="Makari — início"><Brand /></a>
      <button id="menu-toggle" className="menu-toggle" aria-expanded={menu} aria-controls="navigation" onClick={() => setMenu(!menu)}>{menu ? 'Fechar −' : 'Menu +'}</button>
      <nav id="navigation" className={menu ? 'navigation open' : 'navigation'} aria-label="Principal">
        <a href="#massas" onClick={() => setMenu(false)}>Macarrão para yakissoba</a><a href="#estabelecimentos" onClick={() => setMenu(false)}>Para estabelecimentos</a><a href="#sobre" onClick={() => setMenu(false)}>Sobre a Makari</a>
        <a className="nav-contact" href={whatsappLink('supply')}>Vamos conversar</a>
      </nav>
    </header>
    <main id="conteudo">
      <section id="inicio" className="hero">
        <div className="hero-image"><img src="/images/yakissoba-servido.jpg" width="1080" height="1350" fetchPriority="high" alt="Pegador levantando o macarrão de um prato de yakissoba" /></div>
        <div className="hero-content">
          <p className="eyebrow intro-1"><span className="makari-symbol" aria-hidden="true" /> FÁBRICA E DISTRIBUIDORA EM RECIFE</p>
          <h1 className="intro-2">Macarrão para yakissoba <em>para o seu negócio.</em></h1>
          <p className="hero-description intro-3">Fabricamos macarrão para yakissoba em Recife e entregamos para estabelecimentos em toda a Região Metropolitana do Recife e em Caruaru.</p>
          <div className="hero-actions intro-3"><a className="button button-cream" href={whatsappLink('supply')}>Solicitar cotação pelo WhatsApp</a><a className="text-link" href="#massas">Ver macarrões</a></div>
        </div>
        <div className="hero-bottom flex justify-between"><span>MACARRÃO PARA YAKISSOBA · RECIFE, PE</span></div>
      </section>
      <div className="ribbon makari-ribbon">
        <span>Fabricamos em Recife</span>
        <i className="ribbon-logo" aria-hidden="true" />
        <span>Especialistas em yakissoba</span>
        <i className="ribbon-logo" aria-hidden="true" />
        <span>Entregamos para empresas</span>
      </div>
      <section id="massas" className="section-space catalog" aria-labelledby="massas-title">
        <h2 id="massas-title" className="mb-8 border-b border-white/25 pb-5 text-4xl sm:text-5xl">Macarrão para yakissoba</h2>
        <div className="grid items-center gap-8 lg:grid-cols-2">
        <ul className="m-0 grid list-none grid-cols-1 gap-5 p-0 text-stone-900 sm:grid-cols-2">
          {[
            { name: 'Macarrão para yakissoba', weight: '500 g', photo: '/images/makari-yakissoba-500g.png' },
            { name: 'Macarrão para yakissoba', weight: '1 kg', photo: '/images/makari-yakissoba-1kg.png' },
          ].map(({ name, weight, photo }) => (
            <li key={weight ? `${name}-${weight}` : name} className="flex flex-col border border-stone-200 bg-white p-4">
              {photo && (
                <button type="button" className="mb-4 cursor-zoom-in" aria-label={`Ampliar embalagem de ${weight}`} onClick={() => {
                  setZoomPhoto({ src: photo, label: `Embalagem Makari de ${name} de ${weight}` })
                  photoDialog.current?.showModal()
                }}>
                <img className="h-52! w-full object-contain!" src={photo} loading="lazy" width="640" height="640" alt={`Embalagem Makari de ${name}${weight ? ` de ${weight}` : ''}`} />
                </button>
              )}
              <p className="text-sm font-semibold text-stone-600">Makari</p>
              <h3 className="mt-1! mb-6! font-sans! text-lg font-bold! tracking-normal!">{name}{weight && ` · ${weight}`}</h3>
              <a className="mt-auto bg-makari px-3 py-3 text-center text-sm font-semibold text-white! hover:bg-red-800"
                href={`${business.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de consultar a disponibilidade de ${name}${weight ? ` (${weight})` : ''}.`)}`}
                aria-label={`Consultar ${name}${weight ? ` de ${weight}` : ''} pelo WhatsApp`}>
                Consultar pelo WhatsApp
              </a>
            </li>
          ))}
        </ul>
        <img className="mx-auto h-auto! w-full max-w-[549px] drop-shadow-2xl" src="/images/yakissoba-makari-prato.png" loading="lazy" width="549" height="290" alt="Yakissoba preparado com macarrão Makari, legumes e camarões" />
        </div>
      </section>
      <section id="clientes" className="clients" aria-labelledby="clientes-title">
        <img className="clients-photo" src="/images/clientes-caminhao-makari.png" width="1600" height="1200" loading="lazy" alt="Caminhão da KarneKeijo com a marca e as embalagens do macarrão Makari na lateral" />
        <div className="clients-panel">
          <h2 id="clientes-title" className="text-4xl sm:text-5xl">Nossos principais clientes</h2>
          <ul className="mt-7 grid max-w-sm list-none grid-cols-2 gap-3 p-0">
            {['KarneKeijo', 'Marítimos', 'caruaru', 'seasa'].map(name => (
              <li key={name} className="border border-white/40 bg-white/10 px-3 py-4 text-center font-semibold">{name}</li>
            ))}
          </ul>
        </div>
      </section>
      <section className="find-us section-space">
        <div id="sobre" className="reveal">
          <p className="eyebrow">SOBRE A MAKARI</p>
          <h2>Macarrão para yakissoba <em>feito no Recife.</em></h2>
          <p>A Makari Massas Alimentícias fabrica macarrão para yakissoba em embalagens de 500 g e 1 kg. Nossa missão é oferecer uma massa de qualidade para o dia a dia de restaurantes e distribuidores.</p>
          <p>Da produção à entrega, trabalhamos para manter a qualidade e o sabor da massa que sai da nossa fábrica, passa pela cozinha dos restaurantes e chega à mesa de muitas famílias.</p>
          <p>Construímos parcerias duradouras com atendimento responsável e compromisso com nossos clientes.</p>
          <p><strong>Da nossa produção à mesa da sua família, qualidade em cada massa.</strong></p>
          <a className="text-link dark" href="#massas">Ver macarrões</a>
        </div>
        <div id="onde-encontrar" className="where reveal"><p className="eyebrow">ONDE ENCONTRAR</p><h2>Mais perto<br/><em>da sua mesa.</em></h2><p>Quer levar Makari para casa? Consulte os pontos de venda e saiba onde comprar o macarrão para yakissoba Makari.</p>{business.retailers.length ? business.retailers.map(retailer => <a className="text-link dark" key={retailer.url} href={retailer.url}>{retailer.name}</a>) : <a className="text-link dark" href={whatsappLink('retailers')}>Consultar pontos de venda</a>}<div className="where-note"><span className="makari-symbol" aria-hidden="true" /><p>Da escolha da massa<br/>ao último garfo.</p></div></div>
      </section>
    </main>
    <dialog ref={photoDialog} className="product-zoom" aria-label="Foto ampliada da embalagem">
      <form method="dialog"><button type="submit">Fechar</button></form>
      {zoomPhoto && <img src={zoomPhoto.src} alt={zoomPhoto.label} />}
    </dialog>
    <footer className="footer">
      <div className="footer-top">
        <a href="#inicio" aria-label="Makari — voltar ao início"><Brand /></a>
        <p>O seu tempero.<br />A nossa massa.</p>
        <div>
          <a className="footer-contact" href={business.instagram}>
            <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".75" fill="currentColor" stroke="none" /></svg>
            Instagram
          </a>
          <a className="footer-contact" href={business.whatsapp}>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 17.5 3.5 21l4-1a9 9 0 1 0-2.5-2.5Z" /><path d="M8 8c-1 1 .3 3.5 2.4 5.6s4.6 3.4 5.6 2.4l1-1-2.5-1.5-1 1a9 9 0 0 1-4-4l1-1L9 7Z" /></svg>
            Contato comercial
          </a>
          <a className="footer-contact" href={`tel:+55${business.phoneLabel.replace(/\D/g, '')}`}>
            <svg aria-hidden="true" viewBox="0 0 24 24"><path d="m7 3 3 5-2 2a13 13 0 0 0 6 6l2-2 5 3v3c0 1-1 1-2 1A17 17 0 0 1 3 5c0-1 0-2 1-2Z" /></svg>
            {business.phoneLabel}
          </a>
          {business.address && (
            <address className="footer-contact">
              <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>
              {business.mapsUrl ? <a href={business.mapsUrl}>{business.address}</a> : business.address}
            </address>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Makari · Recife, Pernambuco</span>
        <a href="#inicio">Voltar ao topo</a>
      </div>
    </footer>
  </>
}
