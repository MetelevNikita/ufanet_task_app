'use client'

import { FC } from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

// icon

import { MdOutlineSettings } from "react-icons/md";

// styles

import styles from './Footer.module.css'

// 

import { Container, Row, Col } from 'react-bootstrap'

// 



const Footer: FC = () => {
  return (



    <Container style={{width: '100%', height: 100}} className=''>


      <Row className='d-flex flex-column align-items-center justify-content-center mb-3 mt-4'>

        <Col md={6} className='d-flex align-items-center justify-content-center mb-2'>

          <motion.div whileHover={{color: '#FF6600', scale: 1.02}} className={styles.footer_wrapper}>

            <div className={styles.footer_title}>Что бы подписаться на события ваших карточек вам необходимо добавить бота <a target='_blanck' href="https://t.me/PR_main_bot">@PR_main_bot</a> и начать работы с ним</div>

          </motion.div>
  

        </Col>

        <Col className='d-flex flex-row align-items-center justify-content-center mb-2'>
          <div className={styles.footer_line}></div>
        </Col>

        <Col md={8} className='d-flex flex-row align-items-center justify-content-center'>

          <motion.div whileHover={{color: '#FF6600', scale: 1.02}} className={styles.footer_wrapper}>

            <MdOutlineSettings className={styles.footer_icon}/>
            <div className={styles.footer_title}>Есть вопросы по приложению ?</div>

          </motion.div>
  

        </Col>


      </Row>
    </Container>


  )
}

export default Footer
