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
}

const SearchElement: FC<SearchElementProps> = ({ status, title, date, department, author }) => {


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


  return (
    <Col className={styles.search_container}>

      <div className={styles.search_status_line} style={{backgroundColor: statusColor}}></div> 
  
      <Col className='d-flex flex-md-row flex-column justify-md-center justify-between' style={{marginLeft: '10px', marginRight: '10px'}}>

        <Col md={3} className='d-flex flex-row justify-center justify-md-between align-items-center mt-3 mb-3'>
            <div className={styles.search_status_circle} style={{backgroundColor: statusColor}}></div>
            <div className={styles.search_status_text}>Статус:</div>
            <div className={styles.search_status_subtext} style={{borderColor: statusColor, color: statusColor, borderWidth: '2px'}}>{statusText}</div>
        </Col>

        <Col md={8} className='d-flex flex-md-row flex-column mt-3 mb-3'>
          <Col className={styles.search_status_author}>Автор: {author}</Col>
          <Col className={styles.search_status_title}>Задача: {title}</Col>
          <Col className={styles.search_status_project}>Направление: {department}</Col>
          <Col className={styles.search_status_date}>Дата создания: {newDate}</Col>
        </Col>

      </Col>
    
    </Col>
  )
}

export default SearchElement
