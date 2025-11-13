'use client'

import { FC, useContext, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

// styles

import styles from './page.module.css'

// bootstrap

import { Container, Row, Col } from 'react-bootstrap'

// components

import SearchElement from '@/components/UI/SearchElement/SearchElement'

// 

import LeftSideMenu from '@/components/element/LeftSideMenu/LeftSideMenu'

// lib

import { getTask } from '@/lib/getTask'

// types

import { TaskType } from '@/types/types'
import { SelectType } from '@/types/types'

// context

import { Context } from '@/utils/RootContext'

// directions

import directions from '@/database/direction.json'



const page: FC = () => {


  const [tasks, setTasks] = useState<any[]>([])
  const [allTasks, setAllTasks] = useState<any[]>([])
  const [currentTasks, setCurrentTasks] = useState<any[]>([])
  const {path, setPath} = useContext(Context)


  // filter state
  
  const [status, setStatus] = useState<string>('')
  const [department, setDepartment] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)



  // 

  const pathname = usePathname()

  useEffect(() => {
    setPath(pathname)
  }, [])

  


  useEffect(() => {

    const currentDepartment = directions.data.find((item: SelectType): Boolean => item.label === department)

    if (!currentDepartment) {
      setTasks(allTasks)
      setCurrentTasks([])
      return
    }


    const getFilterTasks = async () => {

      const data = await getTask()

      console.log(data)
      
      let filter = data

      if (department) {
        filter = data.filter((item: {department: string}) => {
          return item.department === department
        })
      }

      if (status) {
        filter = filter.filter((item: {status: string}) => {

          if (status === 'У исполнителя') {
            return item.status !== 'Входящие' && item.status !== 'Согласовано' && item.status !== 'Отклонено' && item.status !== 'Замечания' && item.status !== 'Готово'
          }

          return item.status === status
        })
      }

      if (name) {
        filter = filter.filter((item: {fio: string}) => {
          return item.fio.toLowerCase().includes(name.toLowerCase())
        })
      }

      setTasks(filter)
 
    }

    getFilterTasks()

  }, [status, department, name])



  const getCurrentTasks = (name: string): void => {

    const current = tasks.filter((task: any) => {
      return task.name.toLowerCase() == name.toLowerCase()
    })

    console.log(current)
    setTasks(current)
  }






  return (


    <Container>

    <Row className='flex-row'>

    <Col md={3} className='mb-2'>

      <LeftSideMenu statusData={{status, setStatus}} departmentData={{department, setDepartment}} nameData={{name, setName}}/>
      
    </Col>


 


    {/*  */}


    <Col md={9} xs={12} className='mb-2 mt-2'>
    
      <div className={styles.right_side_container}>
        <div className={styles.right_side_wrapper}>


          {
            (!department) ? (
                <div className={styles.right_side_title}>
                Выберите отдел для поиска
                </div>
            ) : (
                <div className={styles.right_side_title}>
                  Выбран
                  <div className={styles.right_side_subtitle}>
                    {department}
                  </div>
                </div>
            )
          }


          {
              tasks.map((task: any, index: number): React.ReactNode => {
                return (
                  <Col className='mb-2 mt-3' key={index+1}>
                    <SearchElement status={task.status} title={task.title} date={task.deadline} department={task.department} author={task.fio} stage={(task.stage === '') ? '' : task.stage}/>
                  </Col>
                  )
                }
              )
          } 


        </div>
      </div>
    
    </Col>

    </Row>


    </Container>



  )
}

export default page
