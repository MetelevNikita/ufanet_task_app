'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'

// 

import styles from './page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import MySelect from '@/components/UI/MySelectMulti/MySelect'
import MyInput from '@/components/UI/MyInput/MyInput'

// img

import logo from '@/../public/logo_ufanet/logo_full.svg'

// fn lib

import { postTask } from '@/lib/postTask'

//

import directions from '@/database/direction.json'
import { MenuType } from '@/types/types'



const prMenu = [

  {
    label: 'Выберите тип продукта',
    value: '',
  },

  {
    label: 'Проекты и продвижение услуг',
    value: 'projects',
  },

  {
    label: 'Мероприятие',
    value: 'events',
  },

  {
    label: 'Прочее',
    value: 'other',
  },

]

const eventMenu = [
  {
    label: 'Выберите тип мероприятия',
    value: '',

  },
  {
    label: 'Внешнее мероприятие (Сторонние мероприятия)',
    value: '',
  },
  {
    label: 'Внутреннее мероприятие (Для сотрудников)',
    value: '',
  },
  {
    label: 'Выставки, выезды, конференции',
    value: '',
  },
]

const branchMenu = [
  {
    label: 'Выберите филиал',
    value: 'Выберите филиал',
  },
  {
    label: 'Все филиалы',
    value: 'Все филиалы',
  },
  {
    label: 'Уфа',
    value: 'Уфа',
  },
  {
    label: 'Оренбуржье',
    value: 'Оренбуржье',
  },
  {
    label: 'Поволжье',
    value: 'Поволжье',
  },
  {
    label: 'Южный куст',
    value: 'Южный куст',
  },
  {
    label: 'Северный куст',
    value: 'Северный куст',
  },
    {
    label: 'Западный куст',
    value: 'Западный куст',
  },
    {
    label: 'Московская область',
    value: 'Московская область',
  },
  {
    label: 'Нижегородский филиал',
    value: 'Нижегородский филиал',
  },
  {
    label: 'Нет привязки к филиалам',
    value: 'Нет привязки к филиалам',
  },
]





const page: FC = () => {






  const deraptment = (typeof window !== "undefined") ? sessionStorage.getItem('department') : ''

  const currentDepartment = directions.data.find((item: MenuType): Boolean=> {
    return item.value === deraptment
  })


  console.log(currentDepartment)


  const [productSelector, setProductSelector] = useState<string>('')
  const [eventSelector, setEventSelector] = useState<string>('')
  const [branchSelector, setBranchSelector] = useState<string>('')



  useEffect(() => {
    setPrTask((prev: any) => ({...prev, product: productSelector}))
  }, [productSelector])


  useEffect(() => {
    setPrTask((prev: any) => ({...prev, branch: branchSelector}))
  }, [branchSelector])


  useEffect(() => {
    setPrTask((prev: any) => ({...prev, event: eventSelector}))
  }, [eventSelector])

  //


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


  class MySelector {
    title: string
    name: string
    options: { label: string, value: string }[]

    constructor(title: string, name: string, options: { label: string, value: string }[]) {
      this.title = title
      this.name = name
      this.options = options
    }

    createSelector(data: string, setData: any) {
      return(
            <Col md={12}>
              <MySelect title={this.title} name={this.name} options={this.options} value={data} onChange={(e: any) => {setData(e.target.value)}} />
            </Col>
            )
    }
    
  }


    const [prTask, setPrTask] = useState<any>({
      deraptment: deraptment,
      product: productSelector,
      event: eventSelector,
      name: '',
      subdivision: '',
      tgId: '',
      branch: branchSelector,
      title: '',
      description: '',
      target: '',
      build: '',
      leader: '',
      place: '',
      site: '',
      participants: '',
      date: '',
    })



  // BASE SELECT

  const productSelect = new MySelector('Тип заявки', 'product', prMenu)
  const eventSelect = new MySelector('Тип мероприятия', 'event', eventMenu)



  // BASE FIELDS

  const name = new MyField('Ваше имя', 'текст', 'text', 'name')
  const subdivision = new MyField('Ваш отдел', 'текст', 'text', 'subdivision')
  const tgId = new MyField('Ваш Telegram ID', 'число', 'number', 'tgId')
  const branchSelect = new MySelector('Филиал', 'branch', branchMenu)
  const titleField = new MyField('Название проекта / услуги', 'текст', 'text', 'title')
  const descriptionField = new MyField('Описание проекта / услуги', 'текст', 'text', 'description')
  const targetField = new MyField('Цель', 'текст', 'text', 'target')
  const buildField = new MyField('Что необходимо сделать?', 'Текст', 'text', 'build')
  const leaderField = new MyField('Лидер мероприятия', 'текст', 'text', 'leader')
  const placeField = new MyField('Место проведения мероприятия', 'текст', 'text', 'place')
  const siteField = new MyField('Сайт мероприятия', 'текст', 'text', 'site')
  const participantsField = new MyField('Список участников', 'текст', 'text', 'participants')
  const dateField = new MyField('Дата проведения', 'Выберите дату проведения', 'date', 'date')

  // 

  const promotionBlock = () => {
    return (
      <Col md={8}>
        

        {titleField.createFiled(prTask.title, (e: any) => {setPrTask({...prTask, title: e})})}
        {descriptionField.createFiled(prTask.description, (e: any) => {setPrTask({...prTask, description: e})})}
        {targetField.createFiled(prTask.target, (e: any) => {setPrTask({...prTask, target: e})})}
        {buildField.createFiled(prTask.build, (e : any) => {setPrTask({...prTask, build: e})})}
        {dateField.createFiled(prTask.date, (e: any) => {setPrTask({...prTask, date: e})})}
      
      </Col>
    )
  }

  const eventsBlock = () => {


    return (
      <Col md={8}>
      
        {eventSelect.createSelector(eventSelector, (e: any) => {setEventSelector(e)})}

        {
          (eventSelector === 'Внешнее мероприятие (Сторонние мероприятия)' || eventSelector=== 'Внутреннее мероприятие (Для сотрудников)')
          &&
          (
            <>

            {titleField.createFiled(prTask.title, (e: any) => {setPrTask({...prTask, title: e})})}
            {descriptionField.createFiled(prTask.description, (e: any) => {setPrTask({...prTask, description: e})})}
            {placeField.createFiled(prTask.place, (e: any) => {setPrTask({...prTask, place: e})})}
            {targetField.createFiled(prTask.target, (e: any) => {setPrTask({...prTask, target: e})})}
            {leaderField.createFiled(prTask.leader, (e: any) => {setPrTask({...prTask, leader: e})})}
            {buildField.createFiled(prTask.build, (e : any) => {setPrTask({...prTask, build: e})})}
            {dateField.createFiled(prTask.date, (e: any) => {setPrTask({...prTask, date: e})})}

            </>
          )
        }

        {
          (eventSelector === 'Выставки, выезды, конференции') &&
          (
            <>

            {titleField.createFiled(prTask.title, (e: any) => {setPrTask({...prTask, title: e})})}
            {descriptionField.createFiled(prTask.description, (e: any) => {setPrTask({...prTask, description: e})})}
            {siteField.createFiled(prTask.site, (e: any) => {setPrTask({...prTask, site: e})})}
            {placeField.createFiled(prTask.place, (e: any) => {setPrTask({...prTask, place: e})})}
            {targetField.createFiled(prTask.target, (e: any) => {setPrTask({...prTask, target: e})})}
            {leaderField.createFiled(prTask.leader, (e: any) => {setPrTask({...prTask, leader: e})})}
            {participantsField.createFiled(prTask.participants, (e: any) => {setPrTask({...prTask, participants: e})})}
            {buildField.createFiled(prTask.build, (e : any) => {setPrTask({...prTask, build: e})})}
            {dateField.createFiled(prTask.date, (e: any) => {setPrTask({...prTask, date: e})})}
          
            </>
        )
        }
      
      </Col>
    )
  }

  const otherBlock = () => {

    return (
      <Col md={8}>

        {buildField.createFiled(prTask.build, (e : any) => {setPrTask({...prTask, build: e})})}
        {targetField.createFiled(prTask.target, (e: any) => {setPrTask({...prTask, target: e})})}
        {dateField.createFiled(prTask.date, (e: any) => {setPrTask({...prTask, date: e})})}
      </Col>
    )
  }

  // 

  const firstCurrentSelect = (data: string) => {
    switch (data) {
      case 'Проекты и продвижение услуг':
        return promotionBlock()
      case 'Мероприятие':
        return eventsBlock()
      case 'Прочее':
        return otherBlock()
      default:
        return (
          <Col md={8} className='mt-4 b-4'>
            <div className={styles.type_product_title}>Тип услуги</div>
          </Col>
        )
    }
  }


  // RENDER FIELD



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


      <form action={postTask}>

      <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>


          <Col md={8}>

            {name.createFiled(prTask.name, (e: any) => {setPrTask({...prTask, name: e})})}
            {subdivision.createFiled(prTask.subdivision, (e: any) => {setPrTask({...prTask, subdivision: e})})}
            {tgId.createFiled(prTask.tgId, (e: any) => {setPrTask({...prTask, tgId: e})})}
            {branchSelect.createSelector(branchSelector, (e: any) => {setBranchSelector(e)})}

          </Col>


        
           <Col md={8}>
            {productSelect.createSelector(productSelector, (e: any) => {setProductSelector(e)})}
           </Col>

           {
            firstCurrentSelect(productSelector)
           }

      </Row>

      <Row className='d-flex flex-row justify-content-center align-items-center'>
          <Col className='mb-3' md={4}>
            <MyButton
              text={'Создать заявку'}
              onClick={() => {console.log('succees')
              }}
              type={'submit'}
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
      </form>
      
    </Container>

  )
}

export default page
