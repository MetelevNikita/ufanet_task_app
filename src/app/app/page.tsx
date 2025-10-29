'use client'

import { FC, useState, useEffect } from 'react'

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

const page = () => {

  const [department, setDepartment] = useState<string>('')

  useEffect(() => {
    const data = sessionStorage.getItem('department')

    const currentDepartment = directions.data.find((item) => item.value == data)
    console.log(currentDepartment)

    if (!currentDepartment) return

    setDepartment(currentDepartment.label)
  }, [])


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
      case 'PR отдел':
        return <PrForm departmentData={{department, setDepartment}}/>
      case 'Отдел дизайна':
        console.log('design')
        return <DesignForm departmentData={{department, setDepartment}}/>
    }
  }


  return (
 <Container>
      <Row className='d-flex flex-row'>

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
