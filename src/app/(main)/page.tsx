'use client'

import { FC, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

// styles

import styles from './page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

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


import Qrcode from '@/components/element/Qrcode/Qrcode'
import MyButton from '@/components/UI/MyButton/MyButton'


// startModal

import ModalInfo from '@/components/modals/ModalInfo/modalInfo'
import { BsInfoCircle } from "react-icons/bs";

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
  const [modalOn, setModalOn] = useState<boolean>(false)

  // 

  useEffect(() => {
    setPath('/')
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setModalOn(true)
    }, 2000)
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

      {
        (modalOn) && (
          <Row>
            <Col>

              <ModalInfo
                title={'Перед заполнением заявки просьба подписаться на бота'}
                link={'PR_main_bot'}
                image={<BsInfoCircle style={{width: '60px', color: '#FC9B32'}}/>}
                btnTitleOne={'Закрыть'}
                onClickOne={() => {
                  setModalOn(false)
                  }}/>
            
            </Col>
          </Row>
        )
      }

      <Row className='d-flex justify-content-center'>
        <Col md={8} className='d-flex justify-content-center mb-1' style={{padding: '0'}}>
          <Qrcode
              title={`Сначала сканируйте QR-код и подпишитесь на бота в Telegram, только после этого заполняйте форму для ТЗ. `}
              subtitle='Примечание: В боте Telegram вы сможете отслеживать, что происходит с вашим ТЗ, на каждом этапе обработки.'
              link="https://t.me/PR_main_bot"
              titleLink='@PR_main_bot'
            />
        </Col>
      </Row>

      <Row className='d-flex justify-content-center'>
        <Col md={4} style={{padding: '0'}}>

        <div className={styles.bg_left_container}>
          <div className={styles.bg_left_wrapper}>

              <div className={styles.left_title}>Сервис приема заявок <br></br> в PR-службу</div>
              <div className={styles.left_subtitle}>Все запросы в PR-службу принимаются через данный сервис.</div>
              <div className={styles.left_subtitle_past}>Чтобы ваша задача была решена быстро и точно:<br></br>1. Выберите отдел из списка, соответствующий вашему запросу.
              <br></br>2. Подробно опишите задачу в специальной форме.</div> 

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
