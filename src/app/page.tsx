'use client'

import { FC, useState, useContext, useEffect } from 'react'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import Logo from '@/components/element/Logo/Logo'

// 

import MySelect from '@/components/UI/MySelectMulti/MySelect'
import MyButton from '@/components/UI/MyButton/MyButton'
import MyInput from '@/components/UI/MyInput/MyInput'

// db

import directions from '@/database/direction.json'

// types

import { SelectType } from '@/types/types'
import { MenuType } from '@/types/types'

// BD types

import { TaskType } from '@/types/types'

// image

import logo from '@/../public/logo_ufanet/logo_full.svg'
import MenuElement from '@/components/element/Menu/MenuElement'

// db

import directionsData from '@/database/direction.json'

// Context

import { Context } from '@/utils/RootContext'

// lib/functions

import { postTask } from '@/lib/postTask'


// menu


const menu: MenuType[] = directionsData.data

// 

const page: FC = () => {

  const [stickers, setStickers] = useState<any>([])


  const {path, setPath} = useContext(Context)

  useEffect(() => {
    setPath('/')
  }, [])


  useEffect(() => {
    if (typeof window !== "undefined") {


      const cached = sessionStorage.getItem('cached')

      if (cached) {
        setStickers(JSON.parse(cached))
        return
      }

      const steackersPack = async () => {
        const stickers = await getSteackers()
        setStickers(stickers.data)
        sessionStorage.setItem('cached', JSON.stringify(stickers.data))
      }
      steackersPack()
    }

  }, [])



  // getStickers


  const getSteackers = async () => {
    try {

      const responce = await fetch('/api/stickers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!responce.ok) {
        throw new Error(
          JSON.stringify({
            status: 'error',
            message: `Ошибка получения стикеров: ${responce.statusText} - ${responce.status}`
          })
        )
      }

      const data = await responce.json()
      return data

      
    } catch (error) {
      console.log(error)
    }
  }


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


  const priorityData = selectorDataStickers(stickers, 'Приоритет')

  console.log(priorityData)


  if (priorityData.length < 1) {
    return <Row><Col><div>LOADING</div></Col></Row>
  }


  return (

    <Container>
      <Row className='d-flex justify-content-center align-items-center mt-3 mb-3'>
        <Col md={6} className='d-flex justify-content-center align-items-center'>
        
              <Logo image={logo} title={'СЕРВИС ЗАЯВОК НА РАЗРАБОТКУ ПРОЕКТА'} subtitle={'При заполнении заявки необходимо заполнять все поля,в случаи их не заполнения заявка не будет отправленна исполнителю'}/>

        </Col>
      </Row>


      <Row className='d-flex justify-content-center align-items-center'>
        <Col md={6} className='d-grid flex-wrap justify-content-center align-items-center' style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 2fr))',
            justifyItems: 'center',
            alignItems: 'center',
            gap: '1rem'
        }}>
        {
          (menu.length < 1) ? <></> : menu.map((item: MenuType, index: number): React.ReactNode => {
            return <MenuElement link='' key={index} text={item.label} onClick={(e) => {
              sessionStorage.setItem('department', item.value)
              window.location.href = `/${item.value}`
            }}/>
          })
        }

        </Col>
      </Row>


    </Container>

  )
}

export default page
