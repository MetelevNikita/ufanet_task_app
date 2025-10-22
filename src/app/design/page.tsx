'use client'

import { FC, useState, useEffect } from 'react'
import Image from 'next/image'

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

// selectors

const typeSelectorsArr = [
  {
    label: 'Выберите тип проекта',
    value: '',
  },
  {
    label: 'Разработка с нуля',
    value: 'new project',
  },
  {
    label: 'Адаптация и внесение изменений в макет',
    value: 'adaptation project',
  },
  {
    label: 'Другое',
    value: 'other',
  }
]

const orientationSelectorsArr = [
  {
    label: 'Выберите ориентацию макета',
    value: '',
  },
  {
    label: 'Вертикальный',
    value: 'vertical',
  },
  {
    label: 'Горизонтальный',
    value: 'horizontal',
  },
  {
    label: 'Круг',
    value: 'circle',
  },
  {
    label: 'Квадрат',
    value: 'box',
  }
  
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

  class MyFileField {
    title: string
    placeholder: string
    name: string

    constructor(title: string, placeholder: string, name: string) {
      this.title = title
      this.placeholder = placeholder
      this.name = name
    }

    uploadFile(data: File, setData: any) {
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

  createTextArea(data: string, setData: any) {

    return (
            <Col md={12}>
              <MyTextArea title={this.title} name={this.name} placeholder={this.placeholder} value={data} onChange={(e: any) => {setData(e.target.value)}} />
            </Col>
            )
  }

}


// 


const page: FC = () => {

  const [activeOther, setActiveOther] = useState(false)

  // 

  const [typeProject, setTypeProject] = useState<string>('')
  const [designTask, setDesignTask] = useState<any>({
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
    file: '',
    change: '',
    deadline: ''
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

      <Row className='d-flex flex-row justify-content-center align-items-center'>
        <Col md={4}>
          <Image src={logo} alt={'logo'}  width={200}/>
        </Col>

        <Col md={4}>

          <div>Вы находитесь на вкладке для создания заявки в отдел дизайна</div>

        </Col>
      </Row>



      <form action={postTask}>


        <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>
          <Col md={8}>

            {typeSelector.createSelector(typeProject, (e: any) => {setTypeProject(e)})}
          
          </Col>
        </Row>

        {/*  */}


          <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>
            <Col md={8}>
              {currentSelectorProject(typeProject)}
            </Col>
          </Row>


        {/*  */}



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
