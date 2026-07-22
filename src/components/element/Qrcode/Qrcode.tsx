'use client'

import React, { FC } from 'react'
import Image from 'next/image'


// styles

import styles from './Qrcode.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// img

import qrCode from '@/../public/qr-code.svg'

interface QrCodeProps {
  title: string | React.ReactNode
  subtitle: string
  link?: string
  titleLink?: string
}



const Qrcode: FC<QrCodeProps> = ({ title, subtitle, link, titleLink }) => {
  return (

    <Container>


      <Row className='d-flex justify-content-center mb-2 mt-1'>


          <Col className={`d-flex flex-md-row flex-column ${styles.qrcode_wrapper}`}>

            <Col md={1} xs={12}>
              <Image className={styles.qrcode_image} src={qrCode} alt='qr_code'/>
            </Col>

            <Col md={10} xs={12}  className={styles.qrcode_info_wrapper}>
              <div className={styles.qrcode_title}>{title} {(link && titleLink) && <a target='_blanc' href={link}>{titleLink}</a>}</div>

              <div className={styles.qrcode_description}>{subtitle}</div>
            </Col>

          </Col>
  


      </Row>
    </Container>


  )
}

export default Qrcode
