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
import { getUsers } from '@/lib/getUsers'

// types

import { SelectType } from '@/types/types'

// context

import { Context } from '@/utils/RootContext'

// directions

import directions from '@/database/direction.json'



const page: FC = () => {


  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<any[]>([])
  const [allTasks, setAllTasks] = useState<any[]>([])
  const [currentTasks, setCurrentTasks] = useState<any[]>([])
  const {path, setPath} = useContext(Context)


  // filter state

  const [status, setStatus] = useState<any>(null)
  const [department, setDepartment] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)




  // 

  const pathname = usePathname()

  useEffect(() => {
    setPath(pathname)
  }, [])




  useEffect(() => {


    const getAllData = async () => {

      try {

        const dataStorage = localStorage.getItem('data')?.split('|')

        console.log(dataStorage)

        if (!dataStorage) {
          return []
        }

        let filter: any[] = []

        const id = dataStorage[1]

        const tasks = await getTask()
        const users = await getUsers()
        
        // 

        const currentUser = users.data.find((item: {id: number}) => item.id.toString() === id)

        // 

        filter = tasks.filter((item: any) => item.fio == currentUser.name)
        console.log('USER TASK ', filter)
        console.log('FILTER ', filter)


        if (department) {
            filter = filter.filter((item: {department: string}) => item.department == department)
            console.log(filter)
        }

        if (status) {
            filter = filter.filter((item: {status: string}) => item.status === status)
        }

        if (name) {
          filter = filter.filter((item: {title: string}) => {
            return item.title.includes(name)
          })
        }


        setTasks(filter)

        

        
        
      } catch (error) {
        console.error(error)
        return []
      }


    }


    getAllData()



  }, [department, status, name])





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
                      <SearchElement id={task.id} status={task.status} title={task.title} date={task.createAt} department={task.department} author={task.fio} stage={(task.stage === '') ? '' : task.stage} comment={(task.comment) ? task.comment : null} task={{
                        ...task,
                        open: false,
                      }}/>
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
