// Somente informações fornecidas/confirmadas. Preencha os campos pendentes após validação.
export const business = {
  name: 'Makari',
  city: 'Recife',
  instagram: 'https://www.instagram.com/makariyakissoba/',
  whatsapp: 'https://wa.me/5581992345470',
  phoneLabel: '(81) 99234-5470',
  address: 'Rua Catiguá, 187, Vasco da Gama, Recife – PE',
  hours: null as string | null,
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua%20Catigu%C3%A1%2C%20187%2C%20Vasco%20da%20Gama%2C%20Recife%20%E2%80%93%20PE',
  retailers: [] as { name: string; url: string }[],
  messages: {
    supply: 'Olá! Tenho um estabelecimento e gostaria de conhecer o macarrão para yakissoba Makari e as condições de fornecimento.',
    visit: 'Olá! Gostaria de consultar o endereço, os horários e o atendimento ao público na fábrica Makari.',
    retailers: 'Olá! Gostaria de saber onde encontrar o macarrão para yakissoba Makari e quais são os pontos de venda.',
    product: 'Olá! Gostaria de saber mais sobre o macarrão para yakissoba Makari.',
  },
}
export function whatsappLink(subject: keyof typeof business.messages) {
  return `${business.whatsapp}?text=${encodeURIComponent(business.messages[subject])}`
}
