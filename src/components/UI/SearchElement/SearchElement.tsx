import { FC, useState } from 'react'
import { motion } from 'motion/react'

// bootstrap

import {Container, Row, Col} from 'react-bootstrap'

// styles

import styles from './SearchElement.module.css'

// icons

import { BsChatDots } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";




// interfaces

interface SearchElementProps {
  id: string,
  status: string,
  title: string,
  department: string
  date: string
  author: string
  stage: string
  comment: string | null
  task: any
}

const SearchElement: FC<SearchElementProps> = ({ id, status, title, date, department, author, stage, comment, task }) => {

  const [currentTask, setCurrentTask] = useState<any | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  const newDate = new Date(date).toLocaleDateString()
  let statusText = ``
  let statusColor = ''

  const statusConvert = () => {
    if (status === 'inbox') {
      statusText = 'Входящие'
      statusColor = '#4BB0CC'
    } else if (status === 'Согласовано' || status === 'approve') {
      statusText = 'Согласовано'
      statusColor = '#3A9A33'
    } else if (status === 'Отклонено' || status === 'reject') {
      statusText = 'Отклонено'
      statusColor = '#C24444'
    } else {
      statusText = status
      statusColor = '#3D8F8F'
    }
  }

  statusConvert()

  let stageText = ''
  let stageColor = ''


  const stageConvert = () => {
    if (stage === 'Не принято') {
      stageText = '#469fe3'
      stageColor = '#469fe3'
    } else if (stage === 'В очереди') {
      stageText = '#8546e3'
      stageColor = '#8546e3'
    } else if (stage === 'в работе') {
      stageText = '#e34663'
      stageColor = '#e34663'
    } else if (stage === 'Готово') {
      stageText = '#46e365'
      stageColor = '#46e365'
    } else if (stage === 'На согласовании') {
      stageText = '#3892b3'
      stageColor = '#3892b3'
    } else if (stage === 'Отменено') {
      stageText = '#e34646'
      stageColor = '#e34646'
    } else if (stage === 'Заморожено') {
      stageText = '#4670e3'
      stageColor = '#4670e3'
    } else if (stage === '') {
      stageText = '#46e3e0'
      stageColor = '#46e3e0'
    }
  }

  stageConvert()

  // 


  function taskOpen(task: {open: boolean, message: string}) {

    if (!task.hasOwnProperty('open')) return 'error'
    task.open = !task.open

    const filteredTask = Object.entries(JSON.parse(task.message)).filter((item) => item[0] !== 'reconciliator')

    console.log(filteredTask)

    const formattedTask = filteredTask.map((item: any) => {
      if (typeof item[1] === 'object') {
        return item[1].join(',')
      }
      return item[1]
    })

    console.log(formattedTask)
    setCurrentTask(formattedTask)
    return formattedTask

  }



  // 

  return (
    <Container>
      <Row className={`d-flex flex-md-row flex-column justify-content-md-start ${styles.search_container}`}>
        <Row>
          <Col md={2} className='d-flex align-items-center flex-row mt-3 mb-3'>
              <div className={styles.search_status_circle} style={{backgroundColor: statusColor}}></div>
              <div className={styles.search_status_subtext} style={{borderColor: statusColor, color: statusColor, borderWidth: '2px'}}>{statusText}</div>
          </Col>

          <Col md={10} className='d-flex align-items-md-center align-items-start flex-md-row flex-column mt-3 mb-3'>
            <Col md={6} className='mt-1 mb-1'>
              <div className={styles.search_status_author}>Автор: {author}</div>
              <div className={styles.search_status_title}>Задача: {title}</div>


              {
                (comment) && (
                  <>
                    <hr />
                    <div className={styles.search_status_comment_container}>
                      <BsChatDots className={styles.search_status_comment_icon}/>
                      <div className={styles.search_status_comment}>Комментарий {comment}</div>
                    </div>
                  </>
                )
              }

            </Col>

            <Col className='d-flex justify-content-center  mt-1 mb-1'>
              <div style={{backgroundColor: stageText}} className={styles.search_status_stage}>{(stage === '') ? 'Не принято' : stage}</div>
            </Col>

            <Col md={2} className='d-flex justify-content-center mt-1 mb-1'>
              <div className={styles.search_status_date}>Дата: {newDate}</div>
            </Col>

            <Col md={1} className='d-flex justify-content-center'>
              <motion.div
                whileHover={{scale: 1.1}}
                initial={{rotate: 0}}
                animate={{rotate: !open ? -90 : -90}}
                onClick={(e) => {

                  const openedTask = taskOpen(task) as any
                  
                  
                  
                }}>
                  <BsArrowLeftCircle
                    className={styles.search_status_arrow}/>
              </motion.div>
            </Col>
          </Col>
        </Row>



        {
          (!open) && (
                      <Row>


          {

            (task.open) && currentTask.map((item: any, index: number): React.ReactNode => {

              if (item.startsWith('https://') || item.startsWith('http://')) {

                console.log('link')

                return (

                  <Col key={index} md={9} className='d-flex justify-content-start'>
                    <a href={item} target='_blank' className={styles.search_status_task_info_text}>{item}</a>
                  </Col>

                )
    
            } else {
                  console.log('text')
                  return (

                    <Col key={index} md={9} className='d-flex justify-content-start'>
                      <div className={styles.search_status_task_info_text}>{item}</div>
                    </Col>
                  
                )
            }


          })
          
          }

                      </Row>
                      )
        }



 

 
      </Row>
    </Container>

  )
}

export default SearchElement
