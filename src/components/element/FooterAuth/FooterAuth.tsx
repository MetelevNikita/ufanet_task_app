'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'

// 

import { FaTelegram } from "react-icons/fa";
import { PiStudentLight } from "react-icons/pi";


// 

import { Container, Row, Col } from 'react-bootstrap'

// style

import styles from './FooterAuth.module.css'



const FooterAuth = () => {
  return (
    <Row className='w-100'>
      <Col md={6} xs={12} className='d-flex justify-content-center  mt-4'>
          <Link className={styles.info_block} target='_blank' href={'https://t.me/MetelevNikita'}>
            <FaTelegram style={{color: '#fc9b32', width: '25px'}}/>
            <motion.div
              whileHover={{color: '#fc9b32'}}
              whileTap={{scale: 1.10}}
            >
              Техническая поддержка
            </motion.div>
          </Link>
      </Col>

      <Col md={6} xs={12} className='d-flex justify-content-center mt-4'>
        <Link className={styles.info_block} target='_blank' href={'/api/instruction'}>
          <PiStudentLight style={{color: '#fc9b32', width: '25px'}}/>
          <motion.div
              whileHover={{color: '#fc9b32'}}
              whileTap={{scale: 1.10}}
            >
              Инструкция
            </motion.div>
        </Link>
      </Col>
    </Row>
  )
}

export default FooterAuth