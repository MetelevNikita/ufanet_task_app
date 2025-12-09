'use client'

import { FC, useState, useContext, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// styles

import styles from './page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import Logo from '@/components/element/Logo/Logo'
import MyInput from '@/components/UI/MyInput/MyInput'


// types

import { MenuType } from '@/types/types'

// image

import bgImage from '@/../public/background/right_image.png'

// db

import directionsData from '@/database/direction.json'

// Context

import { Context } from '@/utils/RootContext'

// compoennts

import MyButton from '@/components/UI/MyButton/MyButton'


// menu


const menu: MenuType[] = directionsData.data

// field Class

class MyField {

    title: string
    placeholder: string
    type: string
    name: string


    constructor( title: string, placeholder: string, type: string, name: string ) {
      this.title = title
      this.placeholder = placeholder
      this.type = type
      this.name = name

    }


    createFiled(data: string, setData: any) {

      return  <Col md={12}>
                  <MyInput name={this.name} placeholder={this.placeholder} type={this.type} title={this.title} onChange={(e: any) => setData(e.target.value)} value={data}/>
              </Col>
    }
}





const page: FC = () => {

  const {path, setPath} = useContext(Context)

  // 

  useEffect(() => {
    setPath('/')
  }, [])

  const router = useRouter()



  const selectorDataStickers = (stickers: any, name: string) => {
    try {
      

      const selectorData = stickers.find((item: {name: string}) => item.name === name)

      if (!selectorData) {
        return [];
      }


      const states = selectorData.states.map((item: {name: string, id: string}) => {
        return {
          value: item.id,
          label: item.name
        }
      })


      return [{
        name: selectorData.name,
        states: states
      }]

    } catch (error) {
      console.log(error)
      return []
    }
  }





  return (


    <Container>

      <Row md={8} className='d-flex justify-content-center'>

        <Col md={4} style={{padding: '0'}}>

        <div className={styles.bg_left_container}>

          <div className={styles.bg_left_wrapper}>

              <div className={styles.left_title}>СЕРВИС ЗАЯВОК НА РАЗРАБОТКУ ПРОЕКТА</div>
              <div className={styles.left_subtitle}>При заполнении заявки необходимо заполнять все поля, в случаи их не заполнения заявка не будет отправлена исполнителю</div>

              {
                (menu.length > 1 ) && menu.map((item: MenuType, index: number) => {
                  return <Col key={index+1} className='mb-2 mt-2'><MyButton text={item.label} onClick={() => {
                      router.push(`/app?department=${item.label}`)
                  }} type={'button'} /></Col>
                })
              }




          </div>


        </div>
        
        </Col>


        <Col md={4} style={{padding: '0'}} className='d-none d-md-block d-lg-block'>

          <Image className={styles.bg_right} src={bgImage} alt={''} />
        
        </Col>



      </Row>


    </Container>

    

  )
}

export default page
