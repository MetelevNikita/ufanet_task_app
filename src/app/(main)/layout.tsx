import React from "react";
import { Suspense } from "react";

// 

import { Container, Row, Col } from "react-bootstrap";

// 

import RootContext from "@/utils/RootContext";

// 

import Header from "@/components/element/Header/Header";


export default async function MainLayout ({children}: {children: React.ReactNode}) {

  return (
    <Container>
      <Suspense fallback={
        <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-4'>
          <Col md={12}>
            <div className='d-flex flex-row justify-content-center align-items-center'>Загрузка...</div>
          </Col>
        </Row>
      }>
      <RootContext>
          <Header />
              {children}
      </RootContext>
      </Suspense>
    </Container>

  )
}