'use client'

import { FC, useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
// styles

import styles from './Header.module.css'


// context

import { Context } from '@/utils/RootContext'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'

// img

import logo from '@/../public/logo_ufanet/logo_full.svg'
import tgIcon from '@/../public/social_icon/tg.svg'
import waIcon from '@/../public/social_icon/wa.svg'


const socialArr = [
  {
    id: 1,
    title: 'telegram',
    icon: tgIcon,
    link: ''
  },

  {
    id: 2,
    title: 'whatsapp',
    icon: waIcon,
    link: ''
  }
]


interface HeaderProps {

}

const Header: FC<HeaderProps>  = () => {



  const {path, setPath} = useContext(Context)
  console.log(path)


  return (

    <Container>
      <Row className='d-flex align-items-center justify-content-between mt-4 mb-4' md={4}>

        <Col md={5} xs={6} className='d-flex justify-content-start align-items-center'>

          <div className={styles.header_title_wrapper} onClick={() => {
            (path === '/tasks') ? window.location.href = '/' : window.location.href = '/tasks'}}>
            <Image src={logo} alt={'logo'} width={120} height={120}/>

            {(path === '/tasks') ? <motion.div whileHover={{color: '#FF6600', scale: 1.02}} className={styles.header_title}>Вернуться на главную</motion.div> : <motion.div whileHover={{color: '#FF6600', scale: 1.02}} className={styles.header_title}>Посмотреть история заявок</motion.div>}
          </div>
          
        </Col>

        <Col md={5} xs={6} className='d-flex justify-content-end align-items-center'>

          {
          
            socialArr.map((item: any, index: number): React.ReactNode => {
              return <Link key={index+1} href={item.link}><Image className={styles.social_icon}  src={item.icon} alt='icon'/></Link>
            })

          }

        </Col>


      </Row>
    </Container>

  )
}

export default Header
