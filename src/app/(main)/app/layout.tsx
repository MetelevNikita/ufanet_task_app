// 

import '@/app/globals.css'

// 

import { Container } from "react-bootstrap"

// components

import Footer from '@/components/element/Footer/Footer'

// 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
      <Footer />
    </Container>
  )
}