import React from 'react'
import { Helmet } from 'react-helmet-async'

const OrganizationJsonLd: React.FC = () => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Clean Clinic',
    url: 'https://cleanoren.ru',
    logo: 'https://cleanoren.ru/assets/logo.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Ульянова, д. 69',
      addressLocality: 'Оренбург',
      addressCountry: 'RU',
    },
    sameAs: ['https://vk.com/cleanclinicorb'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-995-275-75-75',
      contactType: 'Customer service',
    },
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

export default OrganizationJsonLd
