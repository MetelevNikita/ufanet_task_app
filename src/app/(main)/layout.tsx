import React from "react";

// 

import { Container } from "react-bootstrap";

// 

import RootContext from "@/utils/RootContext";

// 

import Header from "@/components/element/Header/Header";


export default async function MainLayout ({children}: {children: React.ReactNode}) {

  return (
    <Container>
      <RootContext>
          <Header />
              {children}
      </RootContext>
    </Container>

  )
}