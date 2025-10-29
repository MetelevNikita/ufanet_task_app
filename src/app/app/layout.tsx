// 

import '@/app/globals.css'

// 

import { Container, Row, Col } from "react-bootstrap"

// components

import LeftSideApplication from "@/components/element/LeftSifeApplication/LeftSideApplication"
import TopSideHorizontalMenu from '@/components/element/TopSideHorizontalMenu/TopSideHorizontalMenu'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    // <Container>
    //   <Row className='d-flex flex-row'>

    //     <Col md={3} sm={1} xs={1} className='d-none d-sm-block'>
    //       <LeftSideApplication />
    //     </Col>


    //     {/* XS MENU */}

    //     <Col md={9} sm={11} xs={12} className='d-block d-sm-none mt-1 mb-4'>

    //       <TopSideHorizontalMenu />

    //     </Col>

    //     {/*  */}

    //     <Col md={9} sm={11} xs={12}>
    //         <div className='app_container'>
    //           <div className='app_wrapper'>

    //             {children}

    //           </div>
    //         </div>
    //     </Col>

    //   </Row>
    // </Container>

    <Container>
      {children}
    </Container>

  )
}