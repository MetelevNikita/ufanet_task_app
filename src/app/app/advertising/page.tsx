'use client'

import { FC, useState } from 'react'
import Image from 'next/image'

// styles

import styles from './page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// img

import logo from '@/../public/logo_ufanet/logo_full.svg'

// components

import MyInput from '@/components/UI/MyInput/MyInput'
import MyButton from '@/components/UI/MyButton/MyButton'
import MySelect from '@/components/UI/MySelectMulti/MySelect'


const page = () => {






  return (

    <Container>

      
      <Row className='d-flex flex-row justify-content-center align-items-center'>
        <Col md={4}>
          <Image src={logo} alt={'logo'}  width={200}/>
        </Col>

        <Col md={4}>

          <div>Вы находитесь на вкладке для создания заявки в PR отдел</div>

        </Col>
      </Row>


      <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>

  


      </Row>






      <Row className='d-flex flex-row justify-content-center align-items-center'>
          <Col className='mb-3' md={4}>
            <MyButton
              text={'Создать заявку'}
              onClick={() => {''}}
              type={'button'}
            />
          </Col>

          <Col className='mb-3' md={4}>
            <MyButton
              text={'На главную'}
              onClick={() => {window.location.href = '/'}}
              type={'button'}
            />
          </Col>
      </Row>
      
    </Container>

  )
}

export default page
