'use client'

import { FC, useState, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, scale } from 'motion/react'
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



const socialArr = [
  {
    id: 1,
    title: 'telegram',
    icon: tgIcon,
    link: 'https://t.me/MetelevNikita'
  },

]


interface HeaderProps {

}

const Header: FC<HeaderProps>  = () => {



  const {path, setPath} = useContext(Context)

  return (

    <Container>
      <Row className='d-flex align-items-center justify-content-around mt-4 mb-4' md={4}>

        <Col md={2} xs={12} className='d-flex flex-md-row flex-column justify-content-start align-items-center mt-2 mb-2'>
              <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 1.15}}><Link href={'/'}><Image src={logo} alt={'logo'} width={120} height={120}/></Link></motion.div>
        </Col>

        <Col md={3} xs={12} className='d-flex flex-md-row flex-column justify-content-start align-items-center mt-2 mb-2'>

            <MyButton text={(path === '/tasks') ? 'Вернуться на главную' : 'Посмотреть история заявок'} onClick={() => {(path === '/tasks') ? window.location.href = '/' : window.location.href = '/tasks'}} type={'button'} />
        
        </Col>

        <Col md={7} xs={12} className='d-flex flex-row justify-content-md-end justify-content-center align-items-center mt-2 mb-2'>


            <motion.div onClick={() => {window.location.href = socialArr[0].link}} whileHover={{color: '#FF6600', scale: 1.02}} className={[styles.header_info_title, 'd-flex'].join(' ')}>Что то не работает? Пишите.</motion.div>

            {
            
              socialArr.map((item: any, index: number): React.ReactNode => {
                return <Link key={index+1} target={'_blank'} href={item.link}><Image className={styles.social_icon}  src={item.icon} alt='icon'/></Link>
              })

            }



        </Col>


      </Row>
    </Container>

  )
}

export default Header
