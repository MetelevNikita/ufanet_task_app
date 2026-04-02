import { FC } from 'react'

// styles

import styles from './MyCheckBox.module.css'

// 

interface MyCheckBoxProps {
  title: string,
  fio: string
  placeholder: string,
  onChange: (e: any) => any
  value: boolean
  name: string
  error?: boolean

}

const MyCheckBox:FC<MyCheckBoxProps> = ({ title, fio, placeholder, onChange, value, name }) => {

  return (

    <div className={styles.input_container}>
      <div className={styles.input_text_container}>
        <span className={styles.input_title}>{title}</span>
        <span className={styles.input_fio}>{fio}</span>
      </div>

      <input name={name} className={styles.input_text} type={'checkbox'} placeholder={placeholder} checked={value} onChange={onChange}/>
    </div>

  )
}

export default MyCheckBox
