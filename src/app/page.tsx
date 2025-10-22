'use client'

import { FC, useState, useContext, useEffect } from 'react'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import Logo from '@/components/element/Logo/Logo'
import MyInput from '@/components/UI/MyInput/MyInput'


// types

import { MenuType } from '@/types/types'

// image

import logo from '@/../public/logo_ufanet/logo_full.svg'
import MenuElement from '@/components/element/Menu/MenuElement'

// db

import directionsData from '@/database/direction.json'

// Context

import { Context } from '@/utils/RootContext'


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

  const [stickers, setStickers] = useState<any>([])
  const {path, setPath} = useContext(Context)

  // 

  const [fio, setFio] = useState('')
  const [subdivision, setSubdivision] = useState('')
  const [tgId, setTgId] = useState('')
  const [branch, setBranch] = useState('')
  const [leader, setLeader] = useState('')


  const fioField = new MyField('ФИО', 'Введите ФИО', 'text', 'fio')
  const subdivisionField = new MyField('Подразделение', 'Введите подразделение', 'text', 'subdivision')
  const tgIdField = new MyField('Телеграм ID', 'Введите телеграм ID', 'text', 'tgId')
  const branchField = new MyField('Филиал', 'Выберите филиал', 'select', 'branch')
  const leaderField = new MyField('Лидер мероприятия', 'Введите лидера мероприятия', 'text', 'leader')


  // 


  useEffect(() => {
    setPath('/')
  }, [])



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
      <Row className='d-flex justify-content-center align-items-center mt-3 mb-3'>
        <Col md={5} className='d-flex justify-content-center align-items-center'>
        
              <Logo image={logo} title={'СЕРВИС ЗАЯВОК НА РАЗРАБОТКУ ПРОЕКТА'} subtitle={'При заполнении заявки необходимо заполнять все поля,в случаи их не заполнения заявка не будет отправленна исполнителю'}/>

        </Col>

        <Col md={5}>

            {fioField.createFiled(fio, setFio)}
            {subdivisionField.createFiled(subdivision, setSubdivision)}
            {tgIdField.createFiled(tgId, setTgId)}
            {branchField.createFiled(branch, setBranch)}
            {leaderField.createFiled(leader, setLeader)}
            
        </Col>



      </Row>





      <Row className='d-flex justify-content-center align-items-center mt-3 mb-3'>
        <Col md={10} className='d-grid flex-wrap justify-content-center align-items-center' style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 2fr))',
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
