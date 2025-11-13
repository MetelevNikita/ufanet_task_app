import { FC, useState, useEffect, useMemo } from 'react'

// styles

import styles from './MarketingForm.module.css'

//

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import MyInput from '@/components/UI/MyInput/MyInput'
import MySelect from '@/components/UI/MySelect/MySelect'
import MyTextArea from '@/components/UI/MyTextArea/MyTextArea'
import MyFile from '@/components/UI/MyFile/MyFile'

// db

import directions from '@/database/direction.json'

// types

import { departmentType, MenuType } from '@/types/types'

// lib

import { postTask } from '@/lib/postTask'

// data

import { typeSelectorArr } from '@/data/marketingData'
import MySelectMulti from '@/components/UI/MySelectMulti/MySelectMulti'

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

      return  <Col md={12} className='mt-2 mb-2'>
                  <MyInput name={this.name} placeholder={this.placeholder} type={this.type} title={this.title} onChange={setData} value={data}/>
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
            <Col md={12} className='mt-2 mb-2'>
              <MySelect title={this.title} name={this.name} options={this.options} value={data} onChange={setData} />
            </Col>
            )
    }
    
  }

  class MySelectorMulti {
    title: string
    name: string
    options: {id: string | number, label: string, value: string, icon: string }[]

    constructor(title: string, name: string, options: {id: string | number, label: string, value: string, icon: string }[]) {
      this.title = title
      this.name = name
      this.options = options
    }

    createMultiSelector(data: any[], setData: any, remove: any): any {

        return(
          <Col md={12} className='mt-2 mb-2'>
            <MySelectMulti title={this.title} name={this.name} options={this.options} onChange={setData} data={data} remove={remove}/>
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
              <Col md={12} className='mt-2 mb-2'>
                <MyFile title={this.title} name={this.name} placeholder={this.placeholder} value={data} onChange={setData} data={data}/>
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
            <Col md={12} className='mt-2 mb-2'>
              <MyTextArea title={this.title} name={this.name} placeholder={this.placeholder} value={data} onChange={setData} />
            </Col>
            )
  }

}


// selector arr

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

// 


interface MarketingFormsProps {
  departmentData: {
    department: string,
    setDepartment: (department: string) => void
  },
  modalSuccess: {
    modalSubmitSuccess: boolean,
    setModalSubmitSuccess: (e: boolean) => void
  }
  modalError: {
    modalSubmitError: boolean,
    setModalSubmitError: (e: boolean) => void
  }
  modalInfo:  {
    modalBackInfo: boolean,
    setModalBackInfo: (e: boolean) => void
  },
  modalDownload: {
    modalInfoDownload: boolean,
    setModalInfoDownload: (e: boolean) => void
  }
}

const MarketingForms: FC<MarketingFormsProps> = ({ departmentData, modalSuccess, modalError, modalInfo, modalDownload }) => {


  // modals

  const { modalSubmitSuccess, setModalSubmitSuccess } = modalSuccess
  const { modalSubmitError, setModalSubmitError } = modalError
  const { modalBackInfo, setModalBackInfo } = modalInfo
  const { modalInfoDownload, setModalInfoDownload } = modalDownload

  // 

  const [activeOther, setActiveOther] = useState(false)
  const [marketing, setMarketing] = useState<any>({
  })


  const { department, setDepartment } = departmentData

  // 

  const currentDepartment = useMemo(() => {
    if (department) {
      return directions.data.find((item: departmentType) : boolean => item.label === department)
    }
  }, [department])


  // type field

  const typeSelector = new MySelector('Тип заявки', 'type', typeSelectorArr)

  // primary


  const data = typeSelectorArr.find((type: any) => type.label === marketing.type)
  const currentField = (!data) ? [] : data.field


  // POST FN


    const currentType = typeSelectorArr.find((type: any) => type.label === marketing.type)
    console.log(currentType)
  
  
   const submitMessage = async (message: any) => {
      try {


        if (Object.entries(message).length < 1) {
          alert('Все поля должны быть заполнены')
          return
        }

        if (!message.fio || !message.title || !message.subdivision || !message.tgId || !message.branch || !message.leader) {
          alert('Все поля должны быть заполнены')
          return
        }
  
        setModalInfoDownload(true)

        if (!currentType) {
          alert('Ошибка получение данных формы для определения согласователя, попробуйте позже...')
          return
        }


        const newData = {
          ...message,
          reconciliator: {
            name: currentType?.reconciliator?.name,
            id: currentType?.reconciliator?.id,
          },
        }

        console.log(newData)
  

        const data = await postTask(newData)
        console.log(data)

        if (data) {
          if (data.status === 'success') {
            setModalInfoDownload(false)
            setModalSubmitSuccess(true)
            return 
          }
          if (data.status === 'abort' || !data) {
            setModalInfoDownload(false)
            setModalSubmitError(true)
            return
          }
        }
  
  
        
      } catch (error: Error | unknown) {
        if (error instanceof Error) {
          console.error(error.message)
          throw new Error(error.message);
        }
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


                {/*  */}



                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col md={12}>

                      {new MyField('ФИО', 'Введите ФИО', 'text', 'fio').createFiled(marketing.fio, (e: any) => {setMarketing({...marketing, fio: e.target.value})})}
                      {new MyField('Подразделение', 'Введите подразделение', 'text', 'subdivision').createFiled(marketing.subdivision, (e: any) => {setMarketing({...marketing, subdivision: e.target.value})})}
                      {new MyField('Телеграм ID', 'Введите телеграм ID', 'text', 'tgId').createFiled(marketing.tgId, (e: any) => {setMarketing({...marketing, tgId: e.target.value})})}
                      {new MySelector('Филиал', 'branch', branchSelectorsArr).createSelector(marketing.branch, (e: any) => {setMarketing({...marketing, branch: e.target.value})})}
                      {new MyField('Лидер мероприятия', 'Введите лидера мероприятия', 'text', 'leader').createFiled(marketing.leader, (e: any) => {setMarketing({...marketing, leader: e.target.value})})}
                    
                    </Col>
                  </Row>


                  {
                    typeSelector.createSelector(marketing.type, (e: any) => {setMarketing({...marketing, type: e.target.value})})
                  }

                  {
                    currentField.map((field: any, index: number) => {
                      return (
                        <Row className='d-flex flex-row justify-content-center align-items-center' key={index}>
                          <Col md={12}>

                            {(() => {
                              switch (field.typeField) {
                                case 'selector':
                                  return new MySelector(field.title, field.name, field.options).createSelector(
                                    marketing[field.name],
                                    (e: any) => { setMarketing({ ...marketing, [field.name]: e.target.value }) }
                                  );
                                case 'selector_multi':
                                  return new MySelectorMulti(field.title, field.name, field.options).createMultiSelector(
                                      marketing[field.name],
                                      (e: any) => {
                                        setMarketing((prev: any) => (
                                          {...prev, [field.name]: Array.from(new Set([...(prev[field.name] || []), e.target.value]))}
                                        ))
                                      },
                                      (title: any) => {
                                        setMarketing((prev: any) => (
                                          {...prev, [field.name]: prev[field.name].filter((item: any) => item !== title)}
                                        ))
                                      })
                                case 'file':
                                  return new MyFileField(field.title, field.placeholder, field.name).uploadFile(
                                    marketing[field.name],
                                    (e: any) => { setMarketing({ ...marketing, [field.name]: e.target.files })}
                                  );
                                case 'area':
                                  return new MyTextAreaField(field.title, field.placeholder, field.name).createTextArea(
                                    marketing[field.name],
                                    (e: any) => { setMarketing({ ...marketing, [field.name]: e.target.value }) }
                                  );
                                case 'text':
                                  return new MyField(field.title, field.placeholder, field.type, field.name).createFiled(
                                    marketing[field.name],
                                    (e: any) => { setMarketing({ ...marketing, [field.name]: e.target.value }) }
                                  );
                                case 'date':
                                  return new MyField(field.title, field.placeholder, field.type, field.name).createFiled(
                                    marketing[field.name],
                                    (e: any) => { setMarketing({ ...marketing, [field.name]: e.target.value }) }
                                  );
                                default:
                                  return (
                                    <div>
                                      <div></div>
                                    </div>
                                  );
                              }
                            })()}
                          
                          </Col>
                        </Row>
                      )
                    })
                  }


                  {/*  */}





                  <Row className='d-flex flex-row justify-content-center align-items-center mt-3'>
                        <Col className='mb-3' md={6}>
                          <MyButton
                            text={'Создать заявку'}
                            onClick={() => {
                              console.log('SEND MESSAG#')
                              submitMessage(marketing)
                            }}
                            type={'button'}
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



                    <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>
                      <Col className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3'>
                            <div className={styles.info_title}>ТЗ, в которых будет указано желаемое время «Сегодня», приниматься не будут!<br/>Минимальный срок создания посадочной страницы / сайта — 5–7 рабочих дней<br/>(в зависимости от объёма ТЗ, срочности и нагрузки).</div>

                            <hr />

                            <div className={styles.info_title}>Если вы устанавливаете срок реализации ТЗ менее 5 дней, необходимо обоснование срочности (потеря дохода, угроза репутации и т.д.).<br/><br/>(Срочность указывается для компании, не для вас лично.)</div>

                            <hr />

                            <div className={styles.info_title}>ТЗ принимается и передаётся в работу в течение суток. Ответственным за приём ТЗ является Мельников Алексей<br/><br/>Далее ТЗ попадает в очередь к сотруднику. Вы можете увидеть статус выполнения вашей задачи во вкладке по ссылке.<br/><br/>Мы готовы к вашей обратной связи. Если что — пишите мне: @alexey_prosmm <br/> Хорошего дня!</div>
                      </Col>
                    </Row>



          </div>
        </div>

      </Row>
    </Container>

  )
}

export default MarketingForms
