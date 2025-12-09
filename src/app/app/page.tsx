"use client"

import { FC, useState, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// directions

import directions from '@/database/direction.json'

// components

import LeftSideApplication from '@/components/element/LeftSifeApplication/LeftSideApplication'
import TopSideHorizontalMenu from '@/components/element/TopSideHorizontalMenu/TopSideHorizontalMenu'

// FORMS

import PrForm from '@/components/element/forms/pr/PrForm'
import DesignForm from '@/components/element/forms/design/DesignForm'
import AdvertisingForms from '@/components/element/forms/advertising/AdvertisingForms'
import MarketingForms from '@/components/element/forms/marketing/MarketingForm'

// MODALS

import ModalSubmit from '@/components/modals/ModalSubmit/modalSubmit'
import ModalInfo from '@/components/modals/ModalInfo/modalInfo'


// MODALS ICON

import { BsCheckCircle } from "react-icons/bs";
import { BsInfoCircle } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import { BsAlarm } from "react-icons/bs";








const page: FC = () => {

  const searchParams = useSearchParams()
  const params = searchParams.get('department')
  console.log(params)

  useEffect(() => {

    if (params) {
      setDepartment(params)
    }

  }, [params])





 

  // modal state

  const [modalSubmitSuccess, setModalSubmitSuccess] = useState<boolean>(false)
  const [modalSubmitError, setModalSubmitError] = useState<boolean>(false)
  const [modalBackInfo, setModalBackInfo] = useState<boolean>(false)
  const [modalInfoDownload, setModalInfoDownload] = useState<boolean>(false)

  //

  const [department, setDepartment] = useState<any>()


  if (!department) {
    return (
      <Row className='d-flex flex-row justify-content-center align-items-center mt-3 mb-4'>
        <Col md={12}>
          <div className='d-flex flex-row justify-content-center align-items-center'>Загрузка...</div>
        </Col>
      </Row>
    )
  }

  const currentForm = (department: string) => {
    switch (department) {
      case 'PR':
        return <PrForm
            departmentData={{department, setDepartment}}
            modalSuccess={{modalSubmitSuccess, setModalSubmitSuccess}}
            modalError={{modalSubmitError, setModalSubmitError}}
            modalInfo={{modalBackInfo, setModalBackInfo}}
            modalDownload={{modalInfoDownload, setModalInfoDownload}}
        />
      case 'Отдел дизайна':
        console.log('design')
        return <DesignForm
            departmentData={{department, setDepartment}}
            modalSuccess={{modalSubmitSuccess, setModalSubmitSuccess}}
            modalError={{modalSubmitError, setModalSubmitError}}
            modalInfo={{modalBackInfo, setModalBackInfo}}
            modalDownload={{modalInfoDownload, setModalInfoDownload}}
        />

      case 'Отдел рекламы':
        return <AdvertisingForms
            departmentData={{department, setDepartment}}
            modalSuccess={{modalSubmitSuccess, setModalSubmitSuccess}}
            modalError={{modalSubmitError, setModalSubmitError}}
            modalInfo={{modalBackInfo, setModalBackInfo}}
            modalDownload={{modalInfoDownload, setModalInfoDownload}}
        />
      case 'Отдел интернет-маркетинга':
        return <MarketingForms
            departmentData={{department, setDepartment}}
            modalSuccess={{modalSubmitSuccess, setModalSubmitSuccess}}
            modalError={{modalSubmitError, setModalSubmitError}}
            modalInfo={{modalBackInfo, setModalBackInfo}}
            modalDownload={{modalInfoDownload, setModalInfoDownload}}
            />
    }
  }




  return (
      <Container>
            <Row className='d-flex flex-row'>


              {/* Modal */}

              <Row className='d-flex flex-row'>
                <Col md={12} className='d-flex justify-content-center align-items-center'>

                {
                  (modalBackInfo) && (
                    <ModalInfo
                      title={'Все данные будут потеряны... Продолжить?'}
                      btnTitleOne={'Продолжить'}
                      btnTitleTwo='Назад'
                      image={<BsInfoCircle style={{width: '60px', color: '#FC9B32'}}/>}
                      onClickOne={() => {
                        setModalBackInfo(false),
                        window.location.href = '/'
                      }}
                      onClickTwo={
                        () => {
                          setModalBackInfo(false)
                        }}
                      />
                  )
                }

                {
                  (modalSubmitSuccess) && (
                    <ModalSubmit
                      image={<BsCheckCircle
                      style={{width: '60px', color: '#51c947'}}/>}
                      title={`Заявка ${department} успешно отправлена`}
                      type={'success'}
                      modalSuccess={{modalSubmitSuccess, setModalSubmitSuccess}}
                      modalError={{modalSubmitError, setModalSubmitError}}
                    />
                  )
                }


                {
                  (modalSubmitError) && (
                    <ModalSubmit
                      image={<BsXCircle
                      style={{width: '60px', color: '#a85632'}}/>}
                      title={`Ошибка отправки заявки`}
                      type='error'
                      modalSuccess={{modalSubmitSuccess, setModalSubmitSuccess}}
                      modalError={{modalSubmitError, setModalSubmitError}}
                    />
                  )
                }


                {
                  (modalInfoDownload) && (
                    <ModalInfo title={'Данные загружаются. Ожидайте...'} image={<BsAlarm style={{width: '60px', color: '#FC9B32'}}/>} />
                  )
                }




                </Col>
              </Row>


              {/*  */}


              <Col md={3} sm={1} xs={1} className='d-none d-sm-block'>
                <LeftSideApplication departmentData={{department, setDepartment}}/>
              </Col>


              {/* XS MENU */}

              <Col md={9} sm={11} xs={12} className='d-block d-sm-none mt-1 mb-4'>
                <TopSideHorizontalMenu departmentData={{department, setDepartment}}/>
              </Col>

              {/*  */}

              <Col md={9} sm={11} xs={12}>
                  <div className='app_container'>
                    <div className='app_wrapper'>
                      
                      {currentForm(department)}

                    </div>
                  </div>
              </Col>

            </Row>
        </Container>
  )
}

export default page
