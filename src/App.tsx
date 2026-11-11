import React, { useEffect, useState } from 'react'
import { business, whatsappLink } from './business'

function Brand() {
  return <img className="brand-logo" src="/images/logo-makari.png" alt="" width="150" height="150" />
}
export default function App() {
  const [menu, setMenu] = useState(false)
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
        <div className="hero-image"><img src="/images/yakissoba.webp" width="1536" height="1024" fetchPriority="high" alt="Prato ilustrativo de yakissoba com massa dourada, legumes e carne" /></div>
        <div className="hero-content">
          <p className="eyebrow intro-1"><span className="tiny-sun">✳</span> FÁBRICA E DISTRIBUIDORA EM RECIFE</p>
          <h1 className="intro-2">Macarrão para yakissoba <em>para o seu negócio.</em></h1>
          <p className="hero-description intro-3">Fabricamos macarrão para yakissoba em Recife e entregamos para estabelecimentos em toda a Região Metropolitana do Recife e em Caruaru.</p>
          <div className="hero-actions intro-3"><a className="button button-cream" href={whatsappLink('supply')}>Solicitar cotação pelo WhatsApp</a><a className="text-link" href="#massas">Ver embalagens</a></div>
        </div>
        <div className="hero-bottom flex justify-between"><span>MACARRÃO PARA YAKISSOBA · RECIFE, PE</span><span>Prato ilustrativo</span><a href="#massas" aria-label="Ver embalagens de macarrão para yakissoba">DESLIZE PARA DESCOBRIR</a></div>
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
                <img className="mb-4 h-52! w-full object-contain!" src={photo} loading="lazy" width="640" height="640" alt={`Embalagem Makari de ${name}${weight ? ` de ${weight}` : ''}`} />
              )}
              <p className="text-sm font-semibold text-stone-600">Makari</p>
              <h3 className="mt-1 mb-4 font-sans! text-lg font-bold! tracking-normal!">{name}{weight && ` · ${weight}`}</h3>
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
      <section className="section-space border-b border-stone-200" aria-labelledby="clientes-title">
        <h2 id="clientes-title" className="text-4xl sm:text-5xl">Quem compra da Makari</h2>
        <p className="mt-3 text-sm text-stone-600">Nomes provisórios para apresentação.</p>
        <ul className="mt-7 grid list-none grid-cols-2 gap-4 p-0 md:grid-cols-4">
          {['Loja 1', 'Loja 2', 'Loja 3', 'Loja 4'].map(name => (
            <li key={name} className="border border-stone-200 bg-white px-4 py-6 text-center font-semibold">{name}</li>
          ))}
        </ul>
      </section>
      <section className="find-us section-space"><div id="sobre" className="reveal"><p className="eyebrow">SOBRE A MAKARI</p><h2>Macarrão para yakissoba <em>feito no Recife.</em></h2><p>Fabricamos macarrão para yakissoba em embalagens de 500 g e 1 kg e fornecemos para restaurantes, supermercados e outros estabelecimentos.</p><a className="text-link dark" href="#massas">Ver embalagens</a></div><div id="onde-encontrar" className="where reveal"><p className="eyebrow">ONDE ENCONTRAR</p><h2>Mais perto<br/><em>da sua mesa.</em></h2><p>Quer levar Makari para casa? Consulte os pontos de venda e saiba onde comprar o macarrão para yakissoba Makari.</p>{business.retailers.length ? business.retailers.map(retailer => <a className="text-link dark" key={retailer.url} href={retailer.url}>{retailer.name}</a>) : <a className="text-link dark" href={whatsappLink('retailers')}>Consultar pontos de venda</a>}<div className="where-note"><span aria-hidden="true">✳</span><p>Da escolha da massa<br/>ao último garfo.</p></div></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#inicio" aria-label="Makari — voltar ao início"><Brand/></a><p>O seu tempero.<br/>A nossa massa.</p><div><a href={business.instagram}>Instagram</a><a href={business.whatsapp}>Contato comercial</a>{business.mapsUrl && business.address && <a href={business.mapsUrl}>Google Maps</a>}<span>{business.phoneLabel}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Makari · Recife, Pernambuco</span><span>Imagens de pratos ilustrativas.</span><a href="#inicio">Voltar ao topo</a></div></footer>
  </>
}
