'use client'

import { FC } from 'react'
import Image from 'next/image'


// styles

import styles from './Qrcode.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// img

import qrCode from '@/../public/qr-code.svg'



const Qrcode: FC = () => {
  return (

    <Container>


      <Row className='d-flex justify-content-center mb-2 mt-1'>


          <Col className={`d-flex flex-md-row flex-column ${styles.qrcode_wrapper}`}>

            <Col md={1} xs={12}>
              <Image className={styles.qrcode_image} src={qrCode} alt='qr_code'/>
            </Col>

            <Col md={10} xs={12}  className={styles.qrcode_info_wrapper}>
              <div className={styles.qrcode_title}>Сначала сканируйте QR-код и подпишитесь на бота в Telegram, только после этого заполняйте форму для ТЗ. <a target='_blanc' href="https://t.me/PR_main_bot">@PR_main_bot</a></div>

              <div className={styles.qrcode_description}>Примечание: В боте Telegram вы сможете отслеживать, что происходит с вашим ТЗ, на каждом этапе обработки.</div>
            </Col>

          </Col>
  


      </Row>
    </Container>


  )
}

export default Qrcode
