'use client'

import { FC, useState, useContext } from 'react'
import Image from 'next/image'

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
import { style } from 'motion/react-client'




interface HeaderProps {

}

const Header: FC<HeaderProps>  = () => {



  const {path, setPath} = useContext(Context)
  console.log(path)


  return (

    <Container>
      <Row className='d-flex flex-row align-items-center justify-content-between'>

        <Col md={4} className='d-flex align-items-center'>
        {
          (path === '/tasks') ?
          
          <div className={styles.header_title_wrapper}>
            <Image src={logo} alt={'logo'} width={120} height={120}/>
            <div className={styles.header_title}>Вернуться на главную</div>
          </div>
          
          :
          
          <div className={styles.header_title}>Посмотреть состояние заявок</div>
        }
        </Col>

        <Col md={3} className='d-flex justify-content-center align-items-center'>
          <MyButton text={(path === '/tasks') ? 'Назад' : 'Перейти'} onClick={() => {}} type={'button'} link={(path === '/tasks') ? '/' : '/tasks'}/>
        </Col>


      </Row>


      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>

  )
}

export default Header
