import React, { useEffect, useState } from 'react'
import { business, whatsappLink } from './business'

function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true" className="arrow">{diagonal ? '↗' : '↗'}</span> }
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
        <a href="#massas" onClick={() => setMenu(false)}>Nossas massas</a><a href="#estabelecimentos" onClick={() => setMenu(false)}>Para estabelecimentos</a><a href="#visite" onClick={() => setMenu(false)}>Visite a Makari</a>
        <a className="nav-contact" href={whatsappLink('supply')}>Vamos conversar <Arrow /></a>
      </nav>
    </header>
    <main id="conteudo">
      <section id="inicio" className="hero">
        <div className="hero-image"><img src="/images/yakissoba.webp" width="1536" height="1024" fetchPriority="high" alt="Prato ilustrativo de yakissoba com massa dourada, legumes e carne" /></div>
        <div className="hero-content">
          <p className="eyebrow intro-1"><span className="tiny-sun">✳</span> FÁBRICA E DISTRIBUIDORA EM RECIFE</p>
          <h1 className="intro-2">Fornecemos massas para <em>o seu negócio.</em></h1>
          <p className="hero-description intro-3">Fabricamos macarrão para yakissoba, linguini e talharim e entregamos para restaurantes, supermercados e outros estabelecimentos.</p>
          <div className="hero-actions intro-3"><a className="button button-cream" href={whatsappLink('supply')}>Solicitar cotação pelo WhatsApp <Arrow /></a><a className="text-link" href="#massas">Conhecer as massas <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="hero-bottom flex justify-between"><span>MASSAS ALIMENTÍCIAS · RECIFE, PE</span><span>Prato ilustrativo</span><a href="#massas" aria-label="Rolar para nossas massas">DESLIZE PARA DESCOBRIR ↓</a></div>
      </section>
      <div className="ribbon" aria-hidden="true"><span>Da nossa fábrica</span><i>✳</i><span>Para a sua cozinha</span><i>✳</i><span>Com sotaque recifense</span><i>✳</i></div>
      <section id="massas" className="products section-space">
        <div className="section-heading reveal"><p className="eyebrow">01 / NOSSAS MASSAS</p><div className="heading-row"><h2>Uma massa.<br/><em>Tantas possibilidades.</em></h2><p>Do encontro com os legumes ao molho da casa.<br/>Encontre a Makari na sua próxima receita.</p></div></div>
        <article className="signature reveal">
          <div className="signature-photo"><img src="/images/yakissoba.webp" loading="lazy" width="1536" height="1024" alt="Sugestão de preparo: yakissoba com legumes e carne"/><span className="photo-caption">SUGESTÃO DE PREPARO · IMAGEM ILUSTRATIVA</span><span className="specialty-stamp" aria-hidden="true">NOSSA<br/><b>especialidade</b><br/>MAKARI ✳</span></div>
          <div className="signature-copy"><span className="product-number">Nº 01 — O PROTAGONISTA</span><h3>Macarrão<br/>para <em>yakissoba.</em></h3><p>A especialidade da Makari. O ponto de partida para reunir massa, legumes e o seu jeito de preparar um bom yakissoba.</p><a className="text-link dark" href={whatsappLink('product')}>Quero conhecer <Arrow/></a><span className="signature-line" aria-hidden="true">feito para<br/>dar água na boca.</span></div>
        </article>
        <div className="other-products grid md:grid-cols-2 gap-8">
          <article className="product reveal"><div className="product-photo"><img src="/images/linguini.webp" loading="lazy" width="1536" height="1024" alt="Prato ilustrativo de linguini com tomates e manjericão"/><span className="photo-caption">SUGESTÃO DE PREPARO · IMAGEM ILUSTRATIVA</span></div><div className="product-title"><h3>Linguini</h3><span>Nº 02</span></div><p>Para o molho que você ama e as receitas que ainda vai descobrir.</p><a className="text-link dark" href={whatsappLink('product')}>Conhecer a massa <Arrow/></a></article>
          <article className="product reveal"><div className="product-photo"><img src="/images/talharim.webp" loading="lazy" width="1536" height="1024" alt="Prato ilustrativo de talharim com molho de tomate e queijo"/><span className="photo-caption">SUGESTÃO DE PREPARO · IMAGEM ILUSTRATIVA</span></div><div className="product-title"><h3>Talharim</h3><span>Nº 03</span></div><p>Um convite para caprichar no molho e reunir todo mundo à mesa.</p><a className="text-link dark" href={whatsappLink('product')}>Conhecer a massa <Arrow/></a></article>
        </div>
      </section>
      <section id="estabelecimentos" className="business section-space"><div className="business-decoration" aria-hidden="true">m</div><div className="business-content reveal"><p className="eyebrow">02 / PARA ESTABELECIMENTOS</p><h2>Na sua cozinha,<br/><em>a gente soma.</em></h2><p>Seu estabelecimento tem uma receita.<br/>A Makari tem a massa para fazer parte dela.</p><p className="business-detail">Fornecemos para estabelecimentos e fazemos entregas para clientes comerciais. Converse com nossa equipe para conhecer os produtos e consultar as condições de fornecimento.</p><a className="button button-cream" href={whatsappLink('supply')}>Vamos falar sobre fornecimento <Arrow/></a><span className="contact-caption">ATENDIMENTO COMERCIAL VIA WHATSAPP</span></div></section>
      <section className="find-us section-space"><div id="visite" className="visit reveal"><p className="eyebrow">03 / VISITE A MAKARI</p><span className="location-mark" aria-hidden="true">↗</span><h2>É de Recife.<br/><em>É daqui.</em></h2><p>A nossa fábrica também atende o público. Fale com a gente e combine sua visita à Makari.</p>{business.address && <p>{business.address}</p>}{business.hours && <p>{business.hours}</p>}<a className="button button-red" href={business.address && business.mapsUrl ? business.mapsUrl : whatsappLink('visit')}>{business.address && business.mapsUrl ? 'Como chegar' : 'Consultar atendimento'} <Arrow/></a></div><div id="onde-encontrar" className="where reveal"><p className="eyebrow">04 / ONDE ENCONTRAR</p><h2>Mais perto<br/><em>da sua mesa.</em></h2><p>Quer levar Makari para casa? Consulte os pontos de venda e saiba onde encontrar nossas massas.</p>{business.retailers.length ? business.retailers.map(retailer => <a className="text-link dark" key={retailer.url} href={retailer.url}>{retailer.name}<Arrow/></a>) : <a className="text-link dark" href={whatsappLink('retailers')}>Consultar pontos de venda <Arrow/></a>}<div className="where-note"><span aria-hidden="true">✳</span><p>Da escolha da massa<br/>ao último garfo.</p></div></div></section>
    </main>
    <footer className="footer"><div className="footer-top"><a href="#inicio" aria-label="Makari — voltar ao início"><Brand/></a><p>O seu tempero.<br/>A nossa massa.</p><div><a href={business.instagram}>Instagram <Arrow/></a><a href={business.whatsapp}>Contato comercial <Arrow/></a>{business.mapsUrl && business.address && <a href={business.mapsUrl}>Google Maps <Arrow/></a>}<span>{business.phoneLabel}</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Makari · Recife, Pernambuco</span><span>Imagens de pratos ilustrativas.</span><a href="#inicio">Voltar ao topo ↑</a></div></footer>
  </>
}
