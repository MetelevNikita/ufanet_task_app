'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import MyButton from '@/components/UI/MyButton/MyButton'
import MyInput from '@/components/UI/MyInput/MyInput'
import MySelect from '@/components/UI/MySelectMulti/MySelect'
import SearchElement from '@/components/UI/SearchElement/SearchElement'

// lib

import { getTask } from '@/lib/getTask'

// types

import { TaskType } from '@/types/types'
import { SelectType } from '@/types/types'

// context

import { Context } from '@/utils/RootContext'



const page: FC = () => {

  const [name, setName] = useState<string>('')
  const [tasks, setTasks] = useState<TaskType[]>([])
  const [currentTasks, setCurrentTasks] = useState<TaskType[]>([])
  const {path, setPath} = useContext(Context)

  // filter state

  const [statusData, setStatusData] = useState<string>('')
  const [departmentData, setDepartmentData] = useState<string>('')

  // 

  const optionStatus: SelectType[] = [
    {
      value: 'agree',
      label: 'Согласовано'
    },

    {
      value: 'reject',
      label: 'Отклонено'
    },

    {
      value: 'comment',
      label: 'Замечания'
    },

    {
      value: 'work',
      label: 'В работе'
    },

    {
      value: 'all',
      label: 'Все'
    }
    
  ]

  const optionDepartment: SelectType[] = [
    {
      value: 'all',
      label: 'Все'
    },
    {
      value: 'commersial',
      label: 'Отдел рекламы'
    },
    {
      value: 'pr',
      label: 'PR отдел'
    },
    {
      value: 'marketing',
      label: 'Интернет маркетинг'
    },
    {
      value: 'design',
      label: 'Отдел дизайна'
    }
  ]

  // 

  const pathname = usePathname()

  useEffect(() => {
    setPath(pathname)
  }, [])

  useEffect(() => {

    const getAllTasks = async () => {
      const dataPr = await getTask('pr')
      console.log(dataPr)

      let filter = dataPr

      if (statusData !== "" && statusData !== "Все") {
        filter = filter.filter((task: TaskType) => task.status === statusData)
      }

      if (departmentData !== "" && departmentData !== "Все") {
        filter = filter.filter((task: TaskType) => task.department === departmentData)
      }

      setTasks(filter)
    }

    getAllTasks()

  }, [statusData, departmentData])







  const getCurrentTasks = (name: string): void => {

    const current = tasks.filter((task: TaskType) => {
      return task.name.toLowerCase() === name.toLowerCase()
    })
    setCurrentTasks(current)
  }




  return (

    <Container>

      <Row className='d-flex align-items-center'>

          <Col md={4} className='d-flex flex-row justify-content-between align-items-center'>
            <div>Введите ваше имя</div>
          </Col>

          <Col md={8} className='d-flex flex-md-row flex-column justify-content-between align-items-center'>
              <Col md={8} xs={12} className='d-flex flex-row justify-content-between align-items-center mb-3'>
                <MyInput type={''} title={''} placeholder={''} onChange={(e) => { setName(e.target.value) } } value={name} name={''} />
              </Col>

              <Col md={3} xs={12} className='d-flex flex-row justify-content-between align-items-center mb-3'>
                <MyButton text={'Найти'} onClick={() => {getCurrentTasks(name)}} type={'button'} />
              </Col>
          </Col>

      </Row>
      
      <Row>
        <Col>
          <MySelect title={'Выберите статус задачи'} name={'status_data'} options={optionStatus} value={statusData} onChange={(e: any) => {setStatusData(e.target.value)}} />
        </Col>

        <Col>
          <MySelect title={'Выберите отдел задачи'} name={'department_data'} options={optionDepartment} value={departmentData} onChange={(e: any) => {setDepartmentData(e.target.value)}} />
        </Col>
      </Row>

      {/*  */}

      <Row className='d-flex flex-column'>


        {
          (tasks && currentTasks.length < 1) ? (

              tasks.map((task: any, index: number): React.ReactNode => {
                return (
                  <Col className='mb-2 mt-3' key={index+1}>
                    <SearchElement status={task.status} title={task.title} date={task.date} department={task.department} author={task.name}/>
                  </Col>
                )
              }
            )

          ) : (
            (currentTasks.length >= 1) && (
              currentTasks.map((task: TaskType, index: number): React.ReactNode => {
                return (
                  <Col className='mb-2 mt-3' key={index+1}>
                    <SearchElement status={task.status} title={task.title} date={task.createdAt.toString()} department={task.department} author={task.name}/>
                  </Col>
                )
              }
            )
          )
          )
        }

      </Row>

    </Container>

  )
}

export default page
