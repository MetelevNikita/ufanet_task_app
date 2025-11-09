import { FC } from 'react'

// bootstrap

import {Row, Col} from 'react-bootstrap'

// styles

import styles from './SearchElement.module.css'

// interfaces

interface SearchElementProps {
  status: string,
  title: string,
  department: string
  date: string
  author: string
  stage: string
}

const SearchElement: FC<SearchElementProps> = ({ status, title, date, department, author, stage }) => {


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
    } else if (status === 'Комментарий' || status === 'comment') {
      statusText = 'Замечания'
      statusColor = '#D7A54A'
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
      stageText = '#e3db46'
      stageColor = '#e3db46'
    } else if (stage === 'Отмененео') {
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


  return (
    <Col className={styles.search_container}>

      <div className={styles.search_status_line} style={{backgroundColor: statusColor}}></div> 
  
      <Col className='d-flex flex-md-row flex-column justify-md-center' style={{marginLeft: '10px', marginRight: '10px'}}>

        <Col md={2} className='d-flex flex-row justify-center justify-md-between align-items-center mt-3 mb-3'>
            <div className={styles.search_status_circle} style={{backgroundColor: statusColor}}></div>
            <div className={styles.search_status_subtext} style={{borderColor: statusColor, color: statusColor, borderWidth: '2px'}}>{statusText}</div>
        </Col>

        <Col md={10} className='d-flex align-items-center flex-md-row flex-column mt-3 mb-3'>
          <Col className={styles.search_status_author}>Автор: {author}</Col>
          <Col className={styles.search_status_title}>Задача: {title}</Col>

          <Col className={styles.search_status_stage} style={{backgroundColor: stageText}}>Cостояние: {(stage === '') ? 'Не определено' : stage}</Col>

          <Col className={styles.search_status_date}>Дата: {newDate}</Col>
        </Col>

      </Col>
    
    </Col>
  )
}

export default SearchElement
