// Somente informações fornecidas/confirmadas. Preencha os campos pendentes após validação.
export const business = {
  name: 'Makari',
  city: 'Recife',
  instagram: 'https://www.instagram.com/makariyakissoba/',
  whatsapp: 'https://wa.me/5581992345470',
  phoneLabel: '(81) 99234-5470',
  address: null as string | null,
  hours: null as string | null,
  mapsUrl: null as string | null,
  retailers: [] as { name: string; url: string }[],
  messages: {
    supply: 'Olá! Tenho um estabelecimento e gostaria de conhecer as massas Makari e as condições de fornecimento.',
    visit: 'Olá! Gostaria de consultar o endereço, os horários e o atendimento ao público na fábrica Makari.',
    retailers: 'Olá! Gostaria de saber onde encontrar as massas Makari e quais são os pontos de venda.',
    product: 'Olá! Gostaria de saber mais sobre as massas Makari.',
  },
}
export function whatsappLink(subject: keyof typeof business.messages) {
  return `${business.whatsapp}?text=${encodeURIComponent(business.messages[subject])}`
}
