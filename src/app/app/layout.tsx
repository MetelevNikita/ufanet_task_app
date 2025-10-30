// 

import '@/app/globals.css'

// 

import { Container } from "react-bootstrap"

// 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      {children}
    </Container>
  )
}