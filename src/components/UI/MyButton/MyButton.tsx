'use client'

import { CSSProperties, FC } from 'react'
import { motion } from "motion/react"


// icon

import { CgArrowLongRight } from "react-icons/cg";


// img

import icon from '@/../public/inputs_icon/Arrow_right_long_light.svg'

// styles

import styles from './MyButton.module.css'

interface MyButtonProps {
  text: string,
  onClick: () => void,
  type: "submit" | "button" | "reset",
  link?: string
  style?: CSSProperties
}

const MyButton: FC<MyButtonProps> = ({ text, onClick, type, link, style }) => {

    return (
      <motion.button
      style={style}
      className={styles.btn_container}
      type={type}
      onClick={onClick}
      whileHover={{background: 'linear-gradient(90deg,rgba(252, 155, 50, 1) 0%, rgba(255, 102, 0, 1) 99%)', border: '1px solid #4f01ae00', color: 'white'}}
      whileTap={{scale: 1.1}}>

        <span className={styles.btn_text}>{text}</span>
        <CgArrowLongRight className={styles.btn_icon}/>

      </motion.button>
    )
  }

export default MyButton
