import { FC, useState, useMemo, useEffect } from 'react'
import Link from 'next/link'

// styles

import styles from './baseForm.module.css'

//

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import MyInput from '@/components/UI/MyInput/MyInput'
import MySelect from '@/components/UI/MySelect/MySelect'
import MySelectMulti from '@/components/UI/MySelectMulti/MySelectMulti'
import MyTextArea from '@/components/UI/MyTextArea/MyTextArea'
import MyFile from '@/components/UI/MyFile/MyFile'
import MyDate from '@/components/UI/MyDate/MyDate'

// db

import directions from '@/database/direction.json'

// types

import { departmentType, MenuType } from '@/types/types'

// lib

import { postTask } from '@/lib/postTask'
import { getUsers } from '@/lib/getUsers'

// data

import { typeSelectorArrAds } from '@/data/advertisingData'
import { typeSelectorArrDes } from '@/data/designData'
import { typeSelectorArrMark } from '@/data/marketingData'
import { typeSelectorArrPr } from '@/data/prData'


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


    createFiled(data: string, setData: any, error?: boolean): React.ReactNode {

      return  <Col md={12} className='mt-2 mb-2'>
                  <MyInput name={this.name} placeholder={this.placeholder} type={this.type} title={this.title} onChange={setData} value={data} error={error}/>
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

  createTextArea(data: string, setData: any, error?: boolean): React.ReactNode {

    return (
            <Col md={12} className='mt-2 mb-2'>
              <MyTextArea title={this.title} name={this.name} placeholder={this.placeholder} value={data} onChange={setData} error={error}/>
            </Col>
            )
  }

  }

   class MyDateField {

    title: string
    type: string
    name: string
    min: any = new Date()


    constructor( title: string, type: string, name: string, min: any  ) {
      this.title = title
      this.type = type
      this.name = name
      this.min = min

    }


    createFiled(data: string, setData: any, error?: boolean): React.ReactNode {

       let date = new Date()

      if (
        this.name === 'deadline_making' ||
        this.name === 'deadline_event' ||
        this.name === 'deadline_merch'
      ) {
        date.setDate(date.getDate() + 2)
      }

      const resultDate = date.toISOString().split('T')[0]


      return  <Col md={12} className='mt-2 mb-2'>
                  <MyDate
                    type={this.type}
                    title={this.title}
                    onChange={setData}
                    value={data}
                    name={this.name}
                    min={resultDate}
                  />
              </Col>
    }
  }


// selector arr

const branchSelectorsArr: MenuType[] = [
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

const designApprovalSelector: any[] = [
  {
    id: 1,
    label: 'Продвижение услуг компании',
    value: 'Служба развития коммерческих продуктов',
    idTg: process.env.NEXT_PUBLIC_TG_SUB_GROUP_DES
  },
  {
    id: 2,
    label: 'Мероприятия, офис, мерч, брендирование итд.',
    value: 'Мероприятия, офис, мерч, брендирование итд.',
    idTg: process.env.NEXT_PUBLIC_TG_GROUP_DES
  },
  {
    id: 3,
    label: 'Прочее (тех. наклейки)',
    value: 'Прочее (тех. наклейки)',
    idTg: process.env.NEXT_PUBLIC_TG_GROUP_DES 
  }
]

// 


interface FormProps {
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
  },
  modalTgError: {
    modalTGError: boolean,
    setModalTGError: (e: boolean) => void
  },
  modalTGBotError: {
    modalTgBotError: boolean,
    setModalTgBotError: (e: boolean) => void
  }


}

const Form: FC<FormProps> = ({ departmentData, modalSuccess, modalError, modalInfo, modalDownload, modalTgError, modalTGBotError }) => {

  const [isEmpty, setIsImpty] = useState<Boolean>(false)

  // modals

  const { modalSubmitSuccess, setModalSubmitSuccess } = modalSuccess
  const { modalSubmitError, setModalSubmitError } = modalError
  const { modalBackInfo, setModalBackInfo } = modalInfo
  const { modalInfoDownload, setModalInfoDownload } = modalDownload
  const { modalTGError, setModalTGError } = modalTgError
  const { modalTgBotError, setModalTgBotError } = modalTGBotError
  // 

  const [user, setUser] = useState<any>(null)
  const [activeOther, setActiveOther] = useState<boolean>(false)
  const [formData, setFormData] = useState<any>({
  })



  useEffect(() => {


      const userStorage = localStorage.getItem('data')?.split('|')

      if (!userStorage) {
        return
      }


      const getCurrentUser = async () => {
        try {
          const users = await getUsers()

          const currentUser = users.data.find((item: {id: number}) => item.id.toString() === userStorage[1])
          setFormData({
            fio: currentUser.name,
            subdivision: currentUser.department,
            tgId: currentUser.telegramId
          })
          
        } catch (error) {
          console.log(error)
          return {}
        }
      }

      getCurrentUser()


  
  }, [])



  const { department, setDepartment } = departmentData


  useEffect(() => {
    if (!activeOther && formData.hasOwnProperty('extra')) {
      delete formData.extra
    }
  }, [activeOther])

  // 

  const currentDepartment = useMemo(() => {
    if (department) {
      return directions.data.find((item: departmentType) : boolean => item.label === department)
    }
  }, [department])

  if (!currentDepartment) return


  function currentTypeSelectors (currentDepartment: any) {

    switch (currentDepartment.value) {
      case 'advertising':
        return typeSelectorArrAds
      case 'pr':
        return typeSelectorArrPr
      case 'marketing':
        return typeSelectorArrMark
      case 'design':
        return typeSelectorArrDes
      default:
        return []
    }

  }

  // type field

  const typeSelector = new MySelector('Тип заявки', 'type', currentTypeSelectors(currentDepartment))
  const typeApproval = new MySelector('Ваше ТЗ связано с', 'approval_type', designApprovalSelector)

  // primary


  const data = currentTypeSelectors(currentDepartment).find((type: any) => type.label === formData.type) as any
  const currentField = (!data) ? [] : data?.field

  const submitMessage = async (message: any) => {
    try {

        if (Object.entries(message).length < 1) {
        alert('Все поля должны быть заполнены')
        setIsImpty(true)
        return
      }


      if (!message.fio || !message.title || !message.subdivision || !message.tgId || !message.branch || !message.leader) {
        alert('Все поля должны быть заполнены')
        setIsImpty(true)
        return
      }



      for (let field of currentField) {
        if (field.type === 'text' || field.type === 'area') {
          if (!message[field.name]) {
            console.log('поле не найдено ', field.name)
            alert('Все поля должны быть заполнены')
            setIsImpty(true)
            return
          }
        }
      }

      setModalInfoDownload(true)

    
      const newData = {
        ...message,
        department: department,
        reconciliator: {
          name: data?.reconciliator?.name,
          id: data?.reconciliator?.id,
        },
      }

      const result = await postTask(newData, department)

      setModalInfoDownload(false)

      if (result) {
        if (result.success === true) {
          setModalInfoDownload(false)
          setModalSubmitSuccess(true)
          return 
        }
        
        if (result.success === false || result.message === 'Telegram ID должен состоять из цифр (его можно посмотреть в боте)') {
          setModalInfoDownload(false)
          setModalTgBotError(true)
          return
        }

        if (result.success === false || result.message === 'Ошибка проверки Telegram (возможно вы ввели неправильный Telegram id или не подписались на бота)') {
          setModalInfoDownload(false)
          setModalTgBotError(true)
          return
        }

        if (data.success === false) {
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
                      Вы находитесь на вкладке для создания технического задания в
                      <div className={styles.subtitle}>{currentDepartment?.label}</div>
                    </div>

                  </Col>
                </Row>


                {/*  */}



                  <Row className='d-flex flex-row justify-content-center align-items-center'>
                    <Col md={12}>

                      {new MyField('ФИО', 'ФИО', 'text', 'fio')
                        .createFiled(formData.fio, (e: any) => {setFormData({...formData, fio: e.target.value})}, isEmpty as boolean)}
                      {new MyField('Служба/отдел', 'Ваша служба/отдел', 'text', 'subdivision')
                        .createFiled(formData.subdivision, (e: any) => {setFormData({...formData, subdivision: e.target.value})}, isEmpty as boolean)}
                      {new MyField('Телеграм ID', 'Введите телеграм ID', 'text', 'tgId')
                        .createFiled(formData.tgId, (e: any) => {setFormData({...formData, tgId: e.target.value})}, isEmpty as boolean)}

                      <div className={styles.tg_id_info}>Ваш telegram id вы можете посмотреть на корпоративном сайте или с помощью бота - <Link href={'https://t.me/getmyid_bot'}>@getmyid_bot</Link></div>

                      {new MySelector('Филиал', 'branch', branchSelectorsArr)
                        .createSelector(formData.branch, (e: any) => {setFormData({...formData, branch: e.target.value})})}

                      {new MyField('Лидер проекта/мероприятия', 'Введите лидера проекта/мероприятия', 'text', 'leader').createFiled(formData.leader, (e: any) => {setFormData({...formData, leader: e.target.value})}, isEmpty as boolean)}
                    
                    </Col>
                  </Row>


                  {/*  */}

                  
                  {
                    (department == 'Отдел дизайна') && (
                      typeApproval.createSelector(formData.typeApproval?.value || '', (e: any) => {
                        const current = designApprovalSelector.find((item: {label: string}) => item.label == e.target.value)
                        setFormData((prev: any) => ({
                        ...prev,
                        typeApproval: current,
                      }))
                      })
                    )
                  }

                  {
                    typeSelector.createSelector(formData.type, (e: any) => {setFormData({...formData, type: e.target.value})})
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
                                    formData[field.name],
                                    (e: any) => { setFormData({ ...formData, [field.name]: e.target.value }) }
                                  );
                                case 'selector_multi':
                                  return new MySelectorMulti(field.title, field.name, field.options).createMultiSelector(
                                      formData[field.name],
                                      (e: any) => {
                                        setFormData((prev: any) => (
                                          {...prev, [field.name]: Array.from(new Set([...(prev[field.name] || []), e.target.value]))}
                                        ))
                                      },
                                      (title: any) => {
                                        setFormData((prev: any) => (
                                          {...prev, [field.name]: prev[field.name].filter((item: any) => item !== title)}
                                        ))
                                      })
                                case 'file':
                                  return new MyFileField(field.title, field.placeholder, field.name).uploadFile(
                                    formData[field.name],
                                    (e: any) => { setFormData({ ...formData, [field.name]: e.target.files })}
                                  );
                                case 'area':
                                  return new MyTextAreaField(field.title, field.placeholder, field.name).createTextArea(
                                    formData[field.name],
                                    (e: any) => { setFormData({ ...formData, [field.name]: e.target.value }) }, isEmpty as boolean
                                  );
                                case 'text':
                                  return new MyField(field.title, field.placeholder, field.typeField, field.name).createFiled(
                                    formData[field.name],
                                    (e: any) => { setFormData({ ...formData, [field.name]: e.target.value }) }, isEmpty as boolean
                                  );
                                case 'date':
                                  return new MyDateField(field.title, field.typeField, field.name, field.min).createFiled(
                                    formData[field.name],
                                    (e: any) => { setFormData({ ...formData, [field.name]: e.target.value }) }
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

                  <Row className='mt-3'>
                    <Col>

                              {
                                (data?.general) && <div>
                                  {
                                    (data?.general?.title) && <div className={styles.general_title}>*{data?.general?.title}</div>
                                  }

                                  {
                                    (data?.general?.link) && <Link className={styles.general_link} target='_blank' href={data?.general?.link}>{data?.general?.link}</Link>
                                  }
                                </div>
                              }
                    
                    </Col>
                  </Row>

                  {/* extra field */}


                  <Col md={12} className='mt-3 mb-3'>

                    <MyButton text={'Добавить что то еще....'} onClick={() => {setActiveOther(prev => !prev)}} type={'button'}/>

                  </Col>


                  {
                    (activeOther) && new MyTextAreaField('Дополнительно', 'Что ещё важно учесть?', 'extra').createTextArea(formData.extra, (e: any) => {setFormData({...formData, extra: e.target.value})})
                  }

                  {/*  */}

                    <Row className='d-flex flex-row justify-content-center align-items-center mt-3'>
                        <Col className='mb-3' md={12}>
                          <MyButton
                            text={'Создать заявку'}
                            onClick={() => {
                              submitMessage(formData)
                            }}
                            type={'button'}
                          />
                        </Col>
                    </Row>

                    <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-3'>
                        <Col className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3'>
                              <div className={styles.info_title}>В случае успешной отправки заявка отправляется на согласование Эделевой О.Н. , после чего будет передано в работу в отдел рекламы</div>
                        </Col>
                    </Row>
          </div>
        </div>

      </Row>
    </Container>

  )
}

export default Form
