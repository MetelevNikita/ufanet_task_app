import { FC } from 'react'

// styles

import styles from './MyDate.module.css'

// 

interface MyDateProps {
  type: string
  title: string,
  onChange: (e: any) => any
  value: string | number
  name: string
  error?: boolean
  min?: any

}

const MyDate: FC<MyDateProps> = ({ type, title, onChange, value, name, error = false, min }) => {

    let isAString = ''

    if (typeof value === 'string') {
        isAString = value
    }

    let errorField;

    if (error && isAString.length < 1) {

        console.log('ПОЛЯ ПУСТОЕ ', name)
        errorField = {border: '2px solid red'}
    } else {
        errorField = {}
    }

  return (

    <div className={styles.date_container}>
      <span className={styles.date_title}>{title}</span>

      <input min={min} style={errorField} name={name} className={styles.date_text} type={type} onChange={onChange} defaultValue={value ?? ''} required={true}/>
    </div>

  )
}

export default MyDate
