import { FC } from 'react'

// styles

import styles from './MyTextArea.module.css'

// 

interface MyTextAreaProps {
  title: string,
  placeholder: string,
  name: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  error?: boolean
}

const MyTextArea: FC<MyTextAreaProps> = ({ title, placeholder, name, value, onChange, error = false }) => {


  let isAString = ''

  if (typeof value === 'string') {
    isAString = value
  }

  let errorField;

  if (error && isAString.length < 1) {

    console.log('ПОЛЯ ПУСТОЕ')
    errorField = {border: '2px solid red'}
  } else {
    console.log('ПОЛЯ НЕ ПУСТОЕ')
    errorField = {}
  }



  return (
    <div className={styles.textarea_container}>
      <span className={styles.textarea_title}>{title}</span>
      <textarea style={errorField} name={name} className={styles.textarea_input} placeholder={placeholder} rows={6} value={value} onChange={onChange}></textarea>
    </div>
  )
}

export default MyTextArea
