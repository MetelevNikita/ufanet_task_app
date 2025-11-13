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

}

const MyInput:FC<MyInputProps> = ({ type, title, placeholder, onChange, value, name }) => {
  return (

    <div className={styles.input_container}>
      <span className={styles.input_title}>{title}</span>
      <input name={name} className={styles.input_text} type={type} placeholder={placeholder} value={value ?? ''} onChange={onChange} required={true}/>
    </div>

  )
}

export default MyInput
