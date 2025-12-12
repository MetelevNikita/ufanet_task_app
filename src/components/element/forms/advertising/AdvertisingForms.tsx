import { FC, useState, useMemo } from 'react'
import Link from 'next/link'

// styles

import styles from './AdvertisingForms.module.css'

//

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import MyInput from '@/components/UI/MyInput/MyInput'
import MySelect from '@/components/UI/MySelect/MySelect'
import MySelectMulti from '@/components/UI/MySelectMulti/MySelectMulti'
import MyTextArea from '@/components/UI/MyTextArea/MyTextArea'
import MyFile from '@/components/UI/MyFile/MyFile'

// db

import directions from '@/database/direction.json'

// types

import { departmentType, MenuType } from '@/types/types'

// lib

import { postTask } from '@/lib/postTask'

// data

import { typeSelectorArr } from '@/data/advertisingData'

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


interface AdvertisingFormsProps {
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

const AdvertisingForms: FC<AdvertisingFormsProps> = ({ departmentData, modalSuccess, modalError, modalInfo, modalDownload }) => {


  // modals

  const { modalSubmitSuccess, setModalSubmitSuccess } = modalSuccess
  const { modalSubmitError, setModalSubmitError } = modalError
  const { modalBackInfo, setModalBackInfo } = modalInfo
  const { modalInfoDownload, setModalInfoDownload } = modalDownload

  // 


  const [advertising, setAdvertising] = useState<any>({
  })


  const { department, setDepartment } = departmentData

  // 

  const currentDepartment = useMemo(() => {
    if (department) {
      return directions.data.find((item: departmentType) : boolean => item.label === department)
    }
  }, [department])

  if (!currentDepartment) return

  console.log(currentDepartment.value)


  // type field

  const typeSelector = new MySelector('Тип заявки', 'type', typeSelectorArr)

  // primary


  const data = typeSelectorArr.find((type: any) => type.label === advertising.type)
  const currentField = (!data) ? [] : data.field


  // POST FN


  const currentType = typeSelectorArr.find((type: any) => type.label === advertising.type)
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
            name: currentType.reconciliator.name,
            id: currentType.reconciliator.id,
          },
        }


        const data = await postTask(newData, department)
        console.log(data)

        setModalInfoDownload(false)
  
        if (data) {
          if (data.status === 'success') {
            setModalInfoDownload(false)
            setModalSubmitSuccess(true)
            return 
          }
          if (data.status === 'abort') {
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

                      {new MyField('ФИО', 'Введите ФИО', 'text', 'fio').createFiled(advertising.fio, (e: any) => {setAdvertising({...advertising, fio: e.target.value})})}
                      {new MyField('Служба/отдел', 'Ваша служба/отдел', 'text', 'subdivision').createFiled(advertising.subdivision, (e: any) => {setAdvertising({...advertising, subdivision: e.target.value})})}
                      {new MyField('Телеграм ID', 'Введите телеграм ID', 'text', 'tgId').createFiled(advertising.tgId, (e: any) => {setAdvertising({...advertising, tgId: e.target.value})})}

                      <div className={styles.tg_id_info}>Ваш telegram id вы можете посмотреть на корпоративном сайте или с помощью бота - <Link href={'https://t.me/getmyid_bot'}>@getmyid_bot</Link></div>

                      {new MySelector('Филиал', 'branch', branchSelectorsArr).createSelector(advertising.branch, (e: any) => {setAdvertising({...advertising, branch: e.target.value})})}
                      {new MyField('Лидер проекта/мероприятия', 'Введите лидера проекта/мероприятия', 'text', 'leader').createFiled(advertising.leader, (e: any) => {setAdvertising({...advertising, leader: e.target.value})})}
                    
                    </Col>
                  </Row>


                  {
                    typeSelector.createSelector(advertising.type, (e: any) => {setAdvertising({...advertising, type: e.target.value})})
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
                                      advertising[field.name],
                                      (e: any) => { setAdvertising({ ...advertising, [field.name]: e.target.value }) }
                                    );
                                  case 'selector_multi':
                                    return new MySelectorMulti(field.title, field.name, field.options).createMultiSelector(
                                        advertising[field.name],
                                        (e: any) => {
                                          setAdvertising((prev: any) => (
                                            {...prev, [field.name]: Array.from(new Set([...(prev[field.name] || []), e.target.value]))}
                                          ))
                                        },
                                        (title: any) => {
                                          setAdvertising((prev: any) => (
                                            {...prev, [field.name]: prev[field.name].filter((item: any) => item !== title)}
                                          ))
                                        })
                                  case 'file':
                                    return new MyFileField(field.title, field.placeholder, field.name).uploadFile(
                                      advertising[field.name],
                                      (e: any) => { setAdvertising({ ...advertising, [field.name]: e.target.files })}
                                    );
                                  case 'area':
                                    return new MyTextAreaField(field.title, field.placeholder, field.name).createTextArea(
                                      advertising[field.name],
                                      (e: any) => { setAdvertising({ ...advertising, [field.name]: e.target.value }) }
                                    );
                                  case 'text':
                                    return new MyField(field.title, field.placeholder, field.type, field.name).createFiled(
                                      advertising[field.name],
                                      (e: any) => { setAdvertising({ ...advertising, [field.name]: e.target.value }) }
                                    );
                                  case 'date':
                                    return new MyField(field.title, field.placeholder, field.type, field.name).createFiled(
                                      advertising[field.name],
                                      (e: any) => { setAdvertising({ ...advertising, [field.name]: e.target.value }) }
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


                  {/* <Row className='d-flex flex-row justify-content-center align-items-center mt-3'>
                        <Col className='mb-3' md={6}>
                          <MyButton
                            text={'Создать заявку'}
                            onClick={() => {
                              submitMessage(advertising)
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
                    </Row> */}



                    <Row className='d-flex flex-row justify-content-center align-items-center mt-3'>
                        <Col className='mb-3' md={12}>
                          <MyButton
                            text={'Создать заявку'}
                            onClick={() => {
                              submitMessage(advertising)
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

export default AdvertisingForms
