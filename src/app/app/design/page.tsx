'use client'

import React, { FC, useState, useEffect } from 'react'
import Image from 'next/image'

// styles

import styles from './page.module.css'

//

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import MyInput from '@/components/UI/MyInput/MyInput'
import MySelect from '@/components/UI/MySelectMulti/MySelect'
import MyTextArea from '@/components/UI/MyTextArea/MyTextArea'
import MyFile from '@/components/UI/MyFile/MyFile'

// img

import logo from '@/../public/logo_ufanet/logo_full.svg'

// lib

import { postTask } from '@/lib/postTask'

// directions

import directions from '@/database/direction.json'

// types

import { DesignFormType } from "@/types/types";
import { MenuType } from '@/types/types'

// selectors

const typeSelectorsArr: MenuType[] = [
  {
    id: 1,
    label: 'Выберите тип проекта',
    value: '',
  },
  {
    id: 2,
    label: 'Разработка с нуля',
    value: 'new project',
  },
  {
    id: 3,
    label: 'Адаптация и внесение изменений в макет',
    value: 'adaptation project',
  },
  {
    id: 4,
    label: 'Другое',
    value: 'other',
  }
]

const orientationSelectorsArr: MenuType[] = [
  {
    id: 1,
    label: 'Выберите ориентацию макета',
    value: '',
  },
  {
    id: 2,
    label: 'Вертикальный',
    value: 'vertical',
  },
  {
    id: 3,
    label: 'Горизонтальный',
    value: 'horizontal',
  },
  {
    id: 4,
    label: 'Круг',
    value: 'circle',
  },
  {
    id: 5,
    label: 'Квадрат',
    value: 'box',
  }
  
]


const branchSelectorsArr: MenuType[] = [
  {
    id: 1,
    label: 'Выберите филиал',
    value: 'Выберите филиал',
  },
  {
    id: 2,
    label: 'Все филиалы',
    value: 'Все филиалы',
  },
  {
    id: 3,
    label: 'Уфа',
    value: 'Уфа',
  },
  {
    id: 4,
    label: 'Оренбуржье',
    value: 'Оренбуржье',
  },
  {
    id: 5,
    label: 'Поволжье',
    value: 'Поволжье',
  },
  {
    id: 6,
    label: 'Южный куст',
    value: 'Южный куст',
  },
  {
    id: 7,
    label: 'Северный куст',
    value: 'Северный куст',
  },
  {
    id: 8,
    label: 'Западный куст',
    value: 'Западный куст',
  },
  {
    id: 9,
    label: 'Московская область',
    value: 'Московская область',
  },
  {
    id: 10,
    label: 'Нижегородский филиал',
    value: 'Нижегородский филиал',
  },
  {
    id: 11,
    label: 'Нет привязки к филиалам',
    value: 'Нет привязки к филиалам',
  },
]

// class

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


    createFiled(data: string, setData: any): React.ReactNode {

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

    createSelector(data: string, setData: any): React.ReactNode {
      return(
            <Col md={12}>
              <MySelect title={this.title} name={this.name} options={this.options} value={data} onChange={(e: any) => {setData(e.target.value)}} />
            </Col>
            )
    }
    
  }

  class MyFileField {
    title: string
    placeholder: string
    name: string

    constructor(title: string, placeholder: string, name: string) {
      this.title = title
      this.placeholder = placeholder
      this.name = name
    }

    uploadFile(data: File, setData: any): React.ReactNode {
      return(
              <Col md={12}>
                <MyFile title={this.title} name={this.name} placeholder={this.placeholder} value={data} onChange={(e: any) => {setData(e.target.files[0])}} data={data}/>
              </Col>
            )
    }
  }

  class MyTextAreaField {
    title: string
    placeholder: string
    name: string

    constructor(title: string, placeholder: string, name: string) {
      this.title = title
      this.placeholder = placeholder
      this.name = name
  }

  createTextArea(data: string, setData: any): React.ReactNode {

    return (
            <Col md={12}>
              <MyTextArea title={this.title} name={this.name} placeholder={this.placeholder} value={data} onChange={(e: any) => {setData(e.target.value)}} />
            </Col>
            )
  }

}


// 


const page: FC = () => {

  useEffect(() => {

    const data = sessionStorage.getItem('department')

    if (!data) return

    setDepartment(data)
  }, [])


  const [department, setDepartment] = useState<string>('')
  const [activeOther, setActiveOther] = useState(false)



  const currentDepartment = directions.data.find((item: MenuType): Boolean=> {
    return item.value === department
  })


  console.log(currentDepartment)



  // 

  const [typeProject, setTypeProject] = useState<string>('')
  const [designTask, setDesignTask] = useState<DesignFormType>({
    fio: '',
    subdivision: '',
    tgId: '',
    branch: '',
    leader: '',
    department: currentDepartment?.label,
    type: typeProject,
    title: '',
    description: '',
    date: '',
    target: '',
    audience: '',
    build: '',
    size: '',
    orientation: '',
    future: '',
    place: '',
    file: null,
    change: '',
    deadline: '',
    other: ''
  })





  // 


  useEffect(() => {
    if (typeProject) {
      setDesignTask((prev: any) => ({
        ...prev,
        type: typeProject
      }))
    }
  }, [typeProject])

  // base field

  const fioField = new MyField('ФИО', 'Введите ФИО', 'text', 'fio')
  const subdivisionField = new MyField('Подразделение', 'Введите подразделение', 'text', 'subdivision')
  const tgIdField = new MyField('Телеграм ID', 'Введите телеграм ID', 'text', 'tgId')
  const branchSelector = new MySelector('Филиал', 'branch', branchSelectorsArr)
  const leaderField = new MyField('Лидер мероприятия', 'Введите лидера мероприятия', 'text', 'leader')


  // field


  const typeSelector = new MySelector('Тип проекта', 'type', typeSelectorsArr)

  // 

  const titleField = new MyField('Название проекта / мероприятия/ услуги', 'Введите название проекта', 'text', 'title')
  const descriptionField = new MyField('Описание проекта/ мероприятия/ услуги', 'Введите описание проекта', 'text', 'description')
  const dateField = new MyField('Дата мероприятия', 'Введите дату начала проекта', 'date', 'date')
  const targetField = new MyField('Цель проекта', 'Введите цель проекта', 'text', 'target')
  const audienceField = new MyField('Целевая аудитория макета', 'Аудиторию проекта', 'text', 'audience')
  const buildField = new MyField('Что необходимо сделать?', 'Введите что необходимо сделать', 'text', 'build')
  const sizeField = new MyField('Размер макета', 'А4, А5 и тд Если размер нестандартный - укажите в формате ШИРИНА*ДЛИНА ', 'text', 'size')

  // selector

  const orientationSelector = new MySelector('Ориентация макета', 'orientation', orientationSelectorsArr)

  //
  
  const futureField = new MyField('Каким ты видишь будущий макет?', 'Где будет размещаться макет?', 'text', 'future')
  const placeField = new MyField('Место размещения макета', 'Введите место размещения макета', 'text', 'place')
  const fileField = new MyFileField('Прикрепите фотографию места размещения макета', 'Выбрать фото', 'file')
  const changeField = new MyField('Что нужно исправить?', 'Введите изменения', 'text', 'change')
  const deadlineField = new MyField('Сроки выполнения', 'Введите сроки выполнения', 'date', 'deadline')
  const otherField = new MyTextAreaField('Другое', 'Введите другие данные', 'other')


  // 


  const newProject = () => {
    return (
      <Col md={12}>
        {titleField.createFiled(designTask.title, (e: any) => {setDesignTask({...designTask, title: e})})}
        {descriptionField.createFiled(designTask.description, (e: any) => {setDesignTask({...designTask, description: e})})}
        {dateField.createFiled(designTask.date, (e: any) => {setDesignTask({...designTask, date: e})})}
        {targetField.createFiled(designTask.target, (e: any) => {setDesignTask({...designTask, target: e})})}
        {audienceField.createFiled(designTask.audience, (e: any) => {setDesignTask({...designTask, audience: e})})}
        {buildField.createFiled(designTask.build, (e: any) => {setDesignTask({...designTask, build: e})})}
        {sizeField.createFiled(designTask.size, (e: any) => {setDesignTask({...designTask, size: e})})}
        {orientationSelector.createSelector(designTask.orientation, (e: any) => {setDesignTask({...designTask, orientation: e})})}
        {futureField.createFiled(designTask.future, (e: any) => {setDesignTask({...designTask, future: e})})}
        {placeField.createFiled(designTask.place, (e: any) => {setDesignTask({...designTask, place: e})})}
        {fileField.uploadFile(designTask.file, (e: any) => {setDesignTask({...designTask, file: e})})}
        {deadlineField.createFiled(designTask.deadline, (e: any) => {setDesignTask({...designTask, deadline: e})})}

        <Col md={12} className='mt-3 mb-3'>

          <MyButton text={'Добавить что то еще....'} onClick={() => {setActiveOther(prev => !prev)}} type={'button'}/>

        </Col>

        {
          (activeOther) && otherField.createTextArea(designTask.other, (e: any) => {setDesignTask({...designTask, other: e})})
        }

      </Col>
    )
  }

  const adaptationProject = () => {
    return (
      <Col md={12}>
        {titleField.createFiled(designTask.title, (e: any) => {setDesignTask({...designTask, title: e})})}
        {fileField.uploadFile(designTask.file, (e: any) => {setDesignTask({...designTask, file: e})})}
        {changeField.createFiled(designTask.change, (e: any) => {setDesignTask({...designTask, change: e})})}
        {deadlineField.createFiled(designTask.deadline, (e: any) => {setDesignTask({...designTask, deadline: e})})}

        <Col md={12} className='mt-3 mb-3'>

          <MyButton text={'Добавить что то еще....'} onClick={() => {setActiveOther(prev => !prev)}} type={'button'}/>

        </Col>

        {
          (activeOther) && otherField.createTextArea(designTask.other, (e: any) => {setDesignTask({...designTask, other: e})})
        }
      </Col>
    )
  }

  const otherProject = () => {
    return (
      <Col md={12}>
        {titleField.createFiled(designTask.title, (e: any) => {setDesignTask({...designTask, title: e})})}
        {sizeField.createFiled(designTask.size, (e: any) => {setDesignTask({...designTask, size: e})})}
        {orientationSelector.createSelector(designTask.orientation, (e: any) => {setDesignTask({...designTask, orientation: e})})}
        {futureField.createFiled(designTask.future, (e: any) => {setDesignTask({...designTask, future: e})})}
        {placeField.createFiled(designTask.place, (e: any) => {setDesignTask({...designTask, place: e})})}
        {fileField.uploadFile(designTask.file, (e: any) => {setDesignTask({...designTask, file: e})})}
        {deadlineField.createFiled(designTask.deadline, (e: any) => {setDesignTask({...designTask, deadline: e})})}
      </Col>
    )
  }

  // end


  const currentSelectorProject = (data: string) => {
    switch (data) {
      case 'Разработка с нуля':
        return newProject()
      case 'Адаптация и внесение изменений в макет':
        return adaptationProject()
      case 'Другое':
        return otherProject()
    }
  }



  return (

    <Container>
      <Row>
        <div>
          <div>
                <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-4'>

                  <Col md={12}>

                    <div className={styles.title}>
                      Вы находитесь на вкладке для создания заявки в
                      <div className={styles.subtitle}>{currentDepartment?.label}</div>
                    </div>

                  </Col>
                </Row>



                <form action={postTask}>

                  {/*  */}

                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col md={12}>

                      {fioField.createFiled(designTask.fio, (e: any) => {setDesignTask({...designTask, fio: e})})}
                      {subdivisionField.createFiled(designTask.subdivision, (e: any) => {setDesignTask({...designTask, subdivision: e})})}
                      {tgIdField.createFiled(designTask.tgId, (e: any) => {setDesignTask({...designTask, tgId: e})})}
                      {branchSelector.createSelector(designTask.branch, (e: any) => {setDesignTask({...designTask, branch: e})})}
                      {leaderField.createFiled(designTask.leader, (e: any) => {setDesignTask({...designTask, leader: e})})}
                    
                    </Col>
                  </Row>

                  {/*  */}

                  <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>
                    <Col md={12}>

                      {typeSelector.createSelector(typeProject, (e: any) => {setTypeProject(e)})}

                    </Col>
                  </Row>

                  {/*  */}


                    <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>
                      <Col md={12}>
                        {currentSelectorProject(typeProject)}
                      </Col>
                    </Row>


                  {/*  */}



                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                      <Col className='mb-3' md={6}>
                        <MyButton
                          text={'Создать заявку'}
                          onClick={() => {console.log('succees')
                          }}
                          type={'submit'}
                        />
                      </Col>

                      <Col className='mb-3' md={6}>
                        <MyButton
                          text={'На главную'}
                          onClick={() => {window.location.href = '/'}}
                          type={'button'}
                        />
                      </Col>
                  </Row>

                </form>

          </div>
        </div>
      </Row>
      
    </Container>

  )
}

export default page
