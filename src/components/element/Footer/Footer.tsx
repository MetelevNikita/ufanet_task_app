'use client'

import { FC } from 'react'
import Image from 'next/image'


// styles

import styles from './Footer.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// img

import qrCode from '@/../public/qr-code.svg'



const Footer: FC = () => {
  return (



    <Container>


      <Row className='d-flex flex-column align-items-center justify-content-center mb-3 mt-3'>


        <Col md={8} className='d-flex align-items-center justify-content-center mb-2' style={{padding: 0}}>

          <div className={styles.footer_wrapper}>

            <Image src={qrCode} width={100} height={80} alt='qr_code'/>

            <div className={styles.footer_title}>Чтобы подписаться на события ваших карточек вам необходимо добавить бота <a target='_blanc' href="https://t.me/PR_main_bot">@PR_main_bot</a></div>

          </div>
  
        </Col>


        {/* line */}


        <Col className='d-flex flex-row align-items-center justify-content-center mb-2'>
          <div className={styles.footer_line}></div>
        </Col>



      </Row>
    </Container>


  )
}

export default Footer
