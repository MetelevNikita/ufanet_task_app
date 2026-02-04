import { FC } from 'react'

// styles

import styles from './MyInput.module.css'

// 

interface MyInputProps {
  type: string
  title: string,
  placeholder: string,
  onChange: (e: any) => any
  value: string | number
  name: string
  error?: boolean

}

const MyInput:FC<MyInputProps> = ({ type, title, placeholder, onChange, value, name, error = false }) => {

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

    <div className={styles.input_container}>
      <span className={styles.input_title}>{title}</span>
      <input style={errorField} name={name} className={styles.input_text} type={type} placeholder={placeholder} value={value ?? ''} onChange={onChange} required={true}/>
    </div>

  )
}

export default MyInput
