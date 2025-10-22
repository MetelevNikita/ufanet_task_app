import { FC } from 'react'

// styles

import styles from './MyTextArea.module.css'

// 

interface MyTextAreaProps {
  title: string,
  placeholder: string,
  name: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const MyTextArea: FC<MyTextAreaProps> = ({ title, placeholder, name, value, onChange }) => {
  return (
    <div className={styles.textarea_container}>
      <span className={styles.textarea_title}>{title}</span>
      <textarea name={name} className={styles.textarea_input} placeholder={placeholder} rows={6} value={value} onChange={onChange}></textarea>
    </div>
  )
}

export default MyTextArea
